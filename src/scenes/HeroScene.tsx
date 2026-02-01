import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 2000
const SPREAD = 120

export default function HeroScene() {
  const points = useRef<THREE.Points>(null)
  const circles = useRef<THREE.Group>(null)
  const floatingOrbs = useRef<THREE.Group>(null)
  const connectingLines = useRef<THREE.LineSegments>(null)

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)
    
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * SPREAD
      pos[i + 1] = (Math.random() - 0.5) * SPREAD
      pos[i + 2] = (Math.random() - 0.5) * SPREAD * 0.4
      
      vel[i] = (Math.random() - 0.5) * 0.02
      vel[i + 1] = (Math.random() - 0.5) * 0.02
      vel[i + 2] = (Math.random() - 0.5) * 0.01
      
      // Цветовые вариации - голубой и зеленый
      const isGreen = Math.random() > 0.7
      col[i] = isGreen ? 0.13 : 0.23
      col[i + 1] = isGreen ? 0.77 : 0.51
      col[i + 2] = isGreen ? 0.37 : 0.96
    }
    return { positions: pos, velocities: vel, colors: col }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    // Медленное вращение частиц с волнообразным движением
    if (points.current) {
      points.current.rotation.y = t * 0.02
      points.current.rotation.x = Math.sin(t * 0.1) * 0.1
      
      // Анимация движения частиц
      const pos = points.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < pos.length; i += 3) {
        pos[i] += velocities[i]
        pos[i + 1] += velocities[i + 1] + Math.sin(t * 0.5 + i * 0.01) * 0.01
        pos[i + 2] += velocities[i + 2]
        
        // Возвращаем частицы обратно если они выходят за границы
        if (Math.abs(pos[i]) > SPREAD / 2) velocities[i] *= -1
        if (Math.abs(pos[i + 1]) > SPREAD / 2) velocities[i + 1] *= -1
        if (Math.abs(pos[i + 2]) > SPREAD / 4) velocities[i + 2] *= -1
      }
      points.current.geometry.attributes.position.needsUpdate = true
    }
    
    // Пульсация кругов с разными скоростями
    if (circles.current) {
      circles.current.children.forEach((circle, i) => {
        const scale = 1 + Math.sin(t * 0.4 + i * 1.2) * 0.12
        circle.scale.setScalar(scale)
        circle.rotation.z = t * (0.05 + i * 0.02)
        
        // Изменение прозрачности
        const material = (circle as THREE.Mesh).material as THREE.MeshBasicMaterial
        material.opacity = 0.08 + Math.sin(t * 0.6 + i) * 0.04
      })
    }
    
    // Плавающие орбы по орбитам
    if (floatingOrbs.current) {
      floatingOrbs.current.children.forEach((orb, i) => {
        const offset = i * Math.PI * 0.5
        const radius = 25 + i * 5
        orb.position.x = Math.cos(t * 0.3 + offset) * radius
        orb.position.y = Math.sin(t * 0.5 + offset) * 5
        orb.position.z = Math.sin(t * 0.3 + offset) * 10 - 10
        
        // Пульсация орбов
        const scale = 1 + Math.sin(t * 2 + i) * 0.3
        orb.scale.setScalar(scale)
      })
    }
  })

  const circlePositions = useMemo(
    () => [
      [-18, 6, -10],
      [22, -10, -14],
      [-8, -18, -8],
      [20, 14, -12],
      [-25, -8, -9],
      [5, 20, -15],
      [0, -12, -16],
    ],
    []
  )
  
  const orbData = useMemo(
    () => [
      { pos: [-30, 10, -5], color: "#3b82f6", size: 0.6 },
      { pos: [30, -5, -8], color: "#22c55e", size: 0.5 },
      { pos: [15, 15, -6], color: "#3b82f6", size: 0.7 },
      { pos: [-20, -15, -4], color: "#e5ff00", size: 0.4 },
    ],
    []
  )

  return (
    <>
      {/* Частицы с движением и цветом - менее яркие */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Пульсирующие круги с градиентом - очень тонкие */}
      <group ref={circles}>
        {circlePositions.map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <ringGeometry args={[10 + i * 2.5, 11 + i * 2.5, 64]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#22c55e" : "#8b5cf6"}
              transparent
              opacity={0.03}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
      
      {/* Плавающие светящиеся орбы по орбитам - менее яркие */}
      <group ref={floatingOrbs}>
        {orbData.map((orb, i) => (
          <group key={i} position={orb.pos as [number, number, number]}>
            {/* Внутреннее свечение */}
            <mesh>
              <sphereGeometry args={[orb.size * 1.5, 16, 16]} />
              <meshBasicMaterial
                color={orb.color}
                transparent
                opacity={0.1}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            {/* Основная сфера */}
            <mesh>
              <sphereGeometry args={[orb.size, 16, 16]} />
              <meshBasicMaterial
                color={orb.color}
                transparent
                opacity={0.4}
              />
            </mesh>
            {/* Свет - менее интенсивный */}
            <pointLight
              color={orb.color}
              intensity={1}
              distance={15}
            />
          </group>
        ))}
      </group>

      {/* Ambient освещение для общей атмосферы - очень тонкое */}
      <ambientLight intensity={0.05} />
      <hemisphereLight args={["#3b82f6", "#22c55e", 0.1]} />
    </>
  )
}