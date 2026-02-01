import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RINGS = 6
const PARTICLES_PER_RING = 32
const RADIUS = 8

export default function OrbitalScene() {
  const group = useRef<THREE.Group>(null)
  const ringRefs = useRef<THREE.Mesh[]>([])
  const particleGroups = useRef<THREE.Group[]>([])
  const centerGlow = useRef<THREE.Mesh>(null)

  const particlesData = useMemo(() => {
    const data: Array<{color: string; size: number; ring: number; speed: number}> = []
    const colors = ['#3b82f6', '#22c55e', '#e5ff00', '#8b5cf6']
    
    for (let ring = 0; ring < RINGS; ring++) {
      for (let i = 0; i < PARTICLES_PER_RING; i++) {
        data.push({
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 0.12 + Math.random() * 0.08,
          ring,
          speed: 0.3 + Math.random() * 0.4
        })
      }
    }
    return data
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    // Вращение всей группы
    if (group.current) {
      group.current.rotation.y = t * 0.1
      group.current.rotation.x = Math.sin(t * 0.2) * 0.1
    }
    
    // Вращение и пульсация колец
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = t * (0.05 + i * 0.03)
        const scale = 1 + Math.sin(t * 0.8 + i * 0.5) * 0.05
        ring.scale.setScalar(scale)
        
        // Изменение прозрачности
        const material = ring.material as THREE.MeshBasicMaterial
        material.opacity = 0.3 + Math.sin(t + i) * 0.15
      }
    })
    
    // Орбитальное движение частиц с разными скоростями
    particleGroups.current.forEach((group, idx) => {
      if (group) {
        const data = particlesData[idx]
        const ringRadius = RADIUS + 3 + data.ring * 2.5
        const angle = t * data.speed + (idx / PARTICLES_PER_RING) * Math.PI * 2
        
        group.position.x = Math.cos(angle) * ringRadius
        group.position.z = Math.sin(angle) * ringRadius
        group.position.y = Math.sin(t * 0.6 + idx * 0.2) * 1.5
        
        // Вращение самих частиц
        group.rotation.y = t * 2
        
        // Пульсация размера
        const scale = 1 + Math.sin(t * 3 + idx * 0.5) * 0.3
        group.scale.setScalar(scale)
      }
    })
    
    // Пульсация центрального свечения
    if (centerGlow.current) {
      const scale = 1 + Math.sin(t * 1.2) * 0.15
      centerGlow.current.scale.setScalar(scale)
      const material = centerGlow.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.6 + Math.sin(t * 1.5) * 0.2
    }
  })

  return (
    <group ref={group}>
      {/* Центральное свечение - пульсирующий круг */}
      <mesh ref={centerGlow}>
        <ringGeometry args={[RADIUS - 1, RADIUS + 1, 64]} />
        <meshBasicMaterial 
          color="#22c55e" 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Внутренний темный круг */}
      <mesh>
        <ringGeometry args={[RADIUS - 2, RADIUS - 1, 64]} />
        <meshBasicMaterial color="#0a111f" side={THREE.DoubleSide} />
      </mesh>
      
      {/* Центральная светящаяся точка */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial 
          color="#22c55e" 
          transparent 
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight color="#22c55e" intensity={4} distance={15} />
      
      {/* Алмаз в центре - вращающийся */}
      <group rotation={[0, 0, Math.PI / 4]}>
        <lineLoop>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                -1.5, 0, 0, 
                0, -1.5, 0, 
                1.5, 0, 0, 
                0, 1.5, 0
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#e5ff00" linewidth={2} />
        </lineLoop>
      </group>
      
      {/* Вращающиеся кольца разных размеров */}
      {Array.from({ length: RINGS }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringRefs.current[i] = el }}
          rotation={[Math.PI / 2, 0, (i / RINGS) * Math.PI * 0.5]}
        >
          <ringGeometry args={[RADIUS + 3 + i * 2.5, RADIUS + 3.3 + i * 2.5, 64]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"} 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
      
      {/* Орбитальные частицы с trail эффектом */}
      {particlesData.map((data, i) => {
        const angle = (i / PARTICLES_PER_RING) * Math.PI * 2
        const r = RADIUS + 3 + data.ring * 2.5
        
        return (
          <group
            key={i}
            ref={(el) => { if (el) particleGroups.current[i] = el }}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
          >
            {/* Свечение вокруг частицы */}
            <mesh>
              <sphereGeometry args={[data.size * 2, 8, 8]} />
              <meshBasicMaterial 
                color={data.color} 
                transparent 
                opacity={0.3}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* Основная частица */}
            <mesh>
              <sphereGeometry args={[data.size, 12, 12]} />
              <meshBasicMaterial 
                color={data.color}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Маленький свет от каждой частицы */}
            <pointLight color={data.color} intensity={0.5} distance={3} />
          </group>
        )
      })}
      
      {/* Дополнительные декоративные элементы - линии */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const length = RADIUS + 15
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([
                  0, 0, 0,
                  Math.cos(angle) * length, 0, Math.sin(angle) * length
                ]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color="#3b82f6" 
              transparent 
              opacity={0.1}
              blending={THREE.AdditiveBlending}
            />
          </line>
        )
      })}
      
      {/* Ambient и направленное освещение */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 10]} intensity={1} color="#3b82f6" />
    </group>
  )
}