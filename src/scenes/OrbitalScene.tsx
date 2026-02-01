import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ORBIT_RINGS = 5
const PARTICLES_PER_ORBIT = 6
const SMALL_PARTICLES = 40

export default function OrbitalScene() {
  const group = useRef<THREE.Group>(null)
  const centralSphere = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Mesh[]>([])
  const particlesRef = useRef<THREE.Mesh[]>([])
  const smallParticlesRef = useRef<THREE.Points>(null)
  const trailsRef = useRef<THREE.Line[]>([])

  const orbitRadii = useMemo(() => [8, 11, 14, 17, 20], [])
  const colors = useMemo(() => ['#e5ff00', '#38a3f8', '#22c55e', '#8b5cf6', '#ec4899'], [])

  // Позиции для маленьких фоновых частиц
  const smallParticlePositions = useMemo(() => {
    const positions = new Float32Array(SMALL_PARTICLES * 3)
    for (let i = 0; i < SMALL_PARTICLES * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2
      const radius = 25 + Math.random() * 15
      const height = (Math.random() - 0.5) * 20
      positions[i] = Math.cos(angle) * radius
      positions[i + 1] = height
      positions[i + 2] = Math.sin(angle) * radius
    }
    return positions
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Медленное вращение всей группы
    if (group.current) {
      group.current.rotation.y = t * 0.08
      group.current.rotation.x = Math.sin(t * 0.2) * 0.05
    }

    // Плавная пульсация центральной сферы
    if (centralSphere.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.06 + Math.sin(t * 3) * 0.03
      centralSphere.current.scale.setScalar(scale)
    }

    // Пульсация свечения
    if (glowRef.current) {
      const glowScale = 1 + Math.sin(t * 1.2) * 0.15
      glowRef.current.scale.setScalar(glowScale)
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.2 + Math.sin(t * 1.5) * 0.08
    }

    // Вращение колец в разных направлениях
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        const direction = i % 2 === 0 ? 1 : -1
        ring.rotation.z = t * (0.2 + i * 0.05) * direction
      }
    })

    // Реалистичное движение частиц по орбитам с легким покачиванием
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        const orbitIndex = Math.floor(i / PARTICLES_PER_ORBIT)
        const particleIndex = i % PARTICLES_PER_ORBIT
        const radius = orbitRadii[orbitIndex]
        const speed = 0.3 - orbitIndex * 0.04
        const offset = (particleIndex / PARTICLES_PER_ORBIT) * Math.PI * 2
        
        const angle = t * speed + offset
        particle.position.x = Math.cos(angle) * radius
        particle.position.z = Math.sin(angle) * radius
        particle.position.y = Math.sin(t * 0.4 + i * 0.5) * 1.5 + Math.cos(t * 0.3 + i) * 0.5
        
        // Небольшое вращение самих частиц
        particle.rotation.x = t * 2 + i
        particle.rotation.y = t * 1.5 + i
        
        // Пульсация размера
        const scale = 1 + Math.sin(t * 2 + i) * 0.15
        particle.scale.setScalar(scale)
      }
    })

    // Медленное вращение маленьких фоновых частиц
    if (smallParticlesRef.current) {
      smallParticlesRef.current.rotation.y = t * 0.03
      smallParticlesRef.current.rotation.x = Math.sin(t * 0.1) * 0.2
    }
  })

  return (
    <group ref={group}>
      {/* Дальнее свечение - самое большое */}
      <mesh position={[0, 0, -2]}>
        <circleGeometry args={[25, 64]} />
        <meshBasicMaterial 
          color="#e5ff00" 
          transparent 
          opacity={0.03}
        />
      </mesh>

      {/* Среднее свечение */}
      <mesh ref={glowRef} position={[0, 0, -1]}>
        <circleGeometry args={[12, 64]} />
        <meshBasicMaterial 
          color="#e5ff00" 
          transparent 
          opacity={0.2}
        />
      </mesh>

      {/* Центральная большая сфера с градиентом */}
      <mesh ref={centralSphere}>
        <sphereGeometry args={[5.5, 64, 64]} />
        <meshBasicMaterial color="#e5ff00" />
      </mesh>
      
      {/* Тонкое внешнее кольцо вокруг центральной сферы */}
      <mesh>
        <torusGeometry args={[5.8, 0.08, 16, 100]} />
        <meshBasicMaterial color="#b8c900" />
      </mesh>

      {/* Внутренний темный круг */}
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[4.2, 64]} />
        <meshBasicMaterial color="#0a0e16" />
      </mesh>

      {/* Ромб в центре - повернутый квадрат с толстыми линиями */}
      <group rotation={[0, 0, Math.PI / 4]} position={[0, 0, 0.2]}>
        <mesh>
          <torusGeometry args={[2.2, 0.08, 8, 4]} />
          <meshBasicMaterial color="#3a4556" />
        </mesh>
      </group>

      {/* Орбитальные кольца (полупрозрачные с эффектом глубины) */}
      {orbitRadii.map((radius, i) => (
        <group key={`ring-group-${i}`}>
          {/* Основное кольцо */}
          <mesh
            ref={(el) => { if (el) ringsRef.current[i] = el }}
            rotation={[Math.PI / 2 + (i * 0.1), 0, (i / orbitRadii.length) * Math.PI * 0.3]}
          >
            <torusGeometry args={[radius, 0.06, 8, 100]} />
            <meshBasicMaterial 
              color="#2a3342" 
              transparent 
              opacity={0.25 - i * 0.03}
            />
          </mesh>
          {/* Светящееся кольцо поверх */}
          <mesh
            rotation={[Math.PI / 2 + (i * 0.1), 0, (i / orbitRadii.length) * Math.PI * 0.3]}
          >
            <torusGeometry args={[radius, 0.03, 8, 100]} />
            <meshBasicMaterial 
              color={colors[i % colors.length]} 
              transparent 
              opacity={0.15}
            />
          </mesh>
        </group>
      ))}

      {/* Частицы на орбитах с улучшенным дизайном */}
      {orbitRadii.map((radius, orbitIndex) => 
        Array.from({ length: PARTICLES_PER_ORBIT }).map((_, particleIndex) => {
          const i = orbitIndex * PARTICLES_PER_ORBIT + particleIndex
          const angle = (particleIndex / PARTICLES_PER_ORBIT) * Math.PI * 2
          const color = colors[i % colors.length]
          
          return (
            <group
              key={`particle-${i}`}
              ref={(el) => { if (el) particlesRef.current[i] = el as any }}
              position={[
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
              ]}
            >
              {/* Основная частица */}
              <mesh>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshBasicMaterial color={color} />
              </mesh>
              {/* Свечение вокруг частицы */}
              <mesh scale={2}>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshBasicMaterial 
                  color={color} 
                  transparent 
                  opacity={0.2}
                />
              </mesh>
            </group>
          )
        })
      )}

      {/* Маленькие фоновые частицы для глубины */}
      <points ref={smallParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[smallParticlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#4a5568"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>

      {/* Дополнительные светящиеся точки ближе к центру */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(
              Array.from({ length: 20 * 3 }, (_, i) => {
                const angle = (i / 3) * Math.PI * 0.3
                const radius = 6 + Math.random() * 2
                if (i % 3 === 0) return Math.cos(angle) * radius
                if (i % 3 === 1) return (Math.random() - 0.5) * 3
                return Math.sin(angle) * radius
              })
            ), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#e5ff00"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  )
}