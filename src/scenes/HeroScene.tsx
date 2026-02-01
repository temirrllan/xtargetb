import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 1500
const SPREAD = 100

export default function HeroScene() {
  const points = useRef<THREE.Points>(null)
  const circles = useRef<THREE.Group>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * SPREAD
      pos[i + 1] = (Math.random() - 0.5) * SPREAD
      pos[i + 2] = (Math.random() - 0.5) * SPREAD * 0.3
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (points.current) {
      points.current.rotation.y = t * 0.015
    }
    if (circles.current) {
      circles.current.children.forEach((circle, i) => {
        const scale = 1 + Math.sin(t * 0.3 + i * 1.5) * 0.08
        circle.scale.setScalar(scale)
      })
    }
  })

  const circlePositions = useMemo(
    () => [
      [-15, 5, -8],
      [20, -8, -12],
      [-5, -15, -5],
      [18, 12, -10],
      [-22, -5, -6],
    ],
    []
  )

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#ffffff"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <group ref={circles}>
        {circlePositions.map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <circleGeometry args={[12 + i * 2, 64]} />
            <meshBasicMaterial
              color="#3b82f6"
              transparent
              opacity={0.06 + i * 0.02}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}
