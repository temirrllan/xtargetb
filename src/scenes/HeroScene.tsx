import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 2000
const SPREAD = 100

export default function HeroScene() {
  const points = useRef<THREE.Points>(null)
  const circles = useRef<THREE.Group>(null)
  const floatingParticles = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      // Создаем более естественное распределение частиц
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * SPREAD * 0.5
      const height = (Math.random() - 0.5) * SPREAD * 0.8
      
      pos[i] = Math.cos(angle) * radius + (Math.random() - 0.5) * 20
      pos[i + 1] = height
      pos[i + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  // Большие плавающие частицы
  const largeParticlePositions = useMemo(() => {
    const pos = new Float32Array(150 * 3)
    for (let i = 0; i < 150 * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * SPREAD * 0.7
      pos[i + 1] = (Math.random() - 0.5) * SPREAD * 0.6
      pos[i + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    // Медленное вращение основных частиц
    if (points.current) {
      points.current.rotation.y = t * 0.012
      points.current.rotation.x = Math.sin(t * 0.05) * 0.1
    }

    // Плавное движение больших частиц
    if (floatingParticles.current) {
      floatingParticles.current.rotation.y = -t * 0.008
      floatingParticles.current.rotation.z = Math.sin(t * 0.03) * 0.05
    }

    // Анимация кругов - волны
    if (circles.current) {
      circles.current.children.forEach((circle, i) => {
        const scale = 1 + Math.sin(t * 0.25 + i * 0.8) * 0.06 + Math.cos(t * 0.15 + i) * 0.04
        circle.scale.setScalar(scale)
        
        // Изменение прозрачности
        const material = circle.material as THREE.MeshBasicMaterial
        material.opacity = 0.06 + Math.sin(t * 0.3 + i * 0.5) * 0.03
      })
    }
  })

  const circlePositions = useMemo(
    () => [
      [-18, 8, -10],
      [22, -10, -14],
      [-8, -18, -6],
      [20, 15, -12],
      [-25, -8, -8],
      [5, 20, -15],
      [-15, -25, -10],
    ],
    []
  )

  return (
    <>
      {/* Основное облако мелких частиц */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Большие плавающие частицы с свечением */}
      <points ref={floatingParticles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[largeParticlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#3b82f6"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Волнообразные круги на заднем плане */}
      <group ref={circles}>
        {circlePositions.map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <circleGeometry args={[10 + i * 2.5, 64]} />
            <meshBasicMaterial
              color="#3b82f6"
              transparent
              opacity={0.06}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* Дополнительные светящиеся кольца */}
      {[0, 1, 2].map((i) => (
        <mesh key={`ring-${i}`} position={[0, 0, -5 - i * 5]} rotation={[0, 0, (i * Math.PI) / 6]}>
          <torusGeometry args={[15 + i * 8, 0.05, 16, 100]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.08 - i * 0.02}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Тонкие линии для глубины */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const distance = 40
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array([
                    0, 0, 0,
                    Math.cos(angle) * distance,
                    Math.sin(angle) * distance * 0.5,
                    -15,
                  ]),
                  3,
                ]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#3b82f6"
              transparent
              opacity={0.05}
              blending={THREE.AdditiveBlending}
            />
          </line>
        )
      })}
    </>
  )
}