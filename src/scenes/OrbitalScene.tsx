import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RINGS = 5
const PARTICLES = 24
const RADIUS = 8

export default function OrbitalScene() {
  const group = useRef<THREE.Group>(null)
  const ringRefs = useRef<THREE.Mesh[]>([])
  const particleRefs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = t * 0.15
    }
    ringRefs.current.forEach((ring, i) => {
      if (ring) ring.rotation.z = t * (0.05 + i * 0.02)
    })
    particleRefs.current.forEach((p, i) => {
      if (p) {
        p.position.x = Math.cos(t * 0.5 + i * 0.8) * (RADIUS + 2 + (i % 3))
        p.position.z = Math.sin(t * 0.5 + i * 0.8) * (RADIUS + 2 + (i % 3))
      }
    })
  })

  return (
    <group ref={group}>
      {/* Central glowing circle */}
      <mesh>
        <ringGeometry args={[RADIUS - 0.5, RADIUS + 0.5, 64]} />
        <meshBasicMaterial color="#a7ed2a" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
      <mesh>
        <ringGeometry args={[RADIUS - 1.2, RADIUS - 0.5, 64]} />
        <meshBasicMaterial color="#252a33" side={THREE.DoubleSide} />
      </mesh>
      {/* Diamond - rotated quad outline */}
      <group rotation={[0, 0, Math.PI / 4]}>
        <lineLoop>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([-2, 0, 0, 0, -2, 0, 2, 0, 0, 0, 2, 0]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#a0a8b4" />
        </lineLoop>
      </group>
      {/* Dashed rings */}
      {Array.from({ length: RINGS }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringRefs.current[i] = el }}
          rotation={[Math.PI / 2, 0, (i / RINGS) * Math.PI]}
        >
          <ringGeometry args={[RADIUS + 3 + i * 2, RADIUS + 3.2 + i * 2, 48]} />
          <meshBasicMaterial color="#3a4050" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      ))}
      {/* Orbiting particles */}
      {Array.from({ length: PARTICLES }).map((_, i) => {
        const angle = (i / PARTICLES) * Math.PI * 2
        const r = RADIUS + 4 + (i % 4) * 2
        const colors = ['#38a3f8', '#a7ed2a', '#dfc900', '#8b5cf6']
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) particleRefs.current[i] = el }}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
          >
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshBasicMaterial color={colors[i % colors.length]} />
          </mesh>
        )
      })}
    </group>
  )
}
