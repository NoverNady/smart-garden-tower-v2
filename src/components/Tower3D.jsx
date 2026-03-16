import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── A single pocket cup that protrudes from the column ─── */
function PocketCup({ angle, y, hasPlant = true }) {
    const leafGroupRef = useRef()
    const rad = angle * (Math.PI / 180)

    // Cup sticks out from the column surface
    const cupRadius = 0.32 // distance from center
    const cx = Math.cos(rad) * cupRadius
    const cz = Math.sin(rad) * cupRadius

    useFrame(({ clock }) => {
        if (leafGroupRef.current) {
            leafGroupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.2 + y * 3) * 0.05
        }
    })

    return (
        <group position={[cx, y, cz]} rotation={[0, -rad, 0]}>
            {/* Pocket / cup shape — a small cone pointing outward */}
            <mesh castShadow rotation={[0.35, 0, 0]} position={[0.06, 0, 0]}>
                <coneGeometry args={[0.06, 0.1, 4]} />
                <meshStandardMaterial color="#f1f5f9" roughness={0.35} metalness={0.05} />
            </mesh>

            {/* Plants growing from the cup */}
            {hasPlant && (
                <group ref={leafGroupRef} position={[0.08, 0.04, 0]}>
                    {/* Main leaves */}
                    {[0, 60, 120, 200, 280, 340].map((leafAngle, i) => {
                        const lr = leafAngle * (Math.PI / 180)
                        const leafLen = 0.06 + Math.random() * 0.05
                        const leafHeight = 0.03 + Math.random() * 0.06
                        return (
                            <mesh
                                key={i}
                                position={[
                                    Math.cos(lr) * 0.03,
                                    leafHeight,
                                    Math.sin(lr) * 0.03,
                                ]}
                                rotation={[0.3 + Math.random() * 0.3, lr, 0.4]}
                            >
                                <planeGeometry args={[leafLen, leafLen * 1.5]} />
                                <meshStandardMaterial
                                    color={i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#16a34a' : '#4ade80'}
                                    side={THREE.DoubleSide}
                                    roughness={0.6}
                                />
                            </mesh>
                        )
                    })}
                    {/* Secondary smaller leaves */}
                    {[30, 100, 170, 240, 310].map((leafAngle, i) => {
                        const lr = leafAngle * (Math.PI / 180)
                        return (
                            <mesh
                                key={`s${i}`}
                                position={[
                                    Math.cos(lr) * 0.02,
                                    0.06 + Math.random() * 0.04,
                                    Math.sin(lr) * 0.02,
                                ]}
                                rotation={[0.2, lr, 0.6]}
                            >
                                <planeGeometry args={[0.04, 0.06]} />
                                <meshStandardMaterial
                                    color={i % 2 === 0 ? '#86efac' : '#15803d'}
                                    side={THREE.DoubleSide}
                                    roughness={0.6}
                                />
                            </mesh>
                        )
                    })}
                </group>
            )}
        </group>
    )
}

/* ─── Main Tower Column with spiral pockets ─── */
function Tower({ hovered }) {
    const groupRef = useRef()
    const towerHeight = 3.2
    const levels = 12
    const cupsPerLevel = 3

    useFrame(() => {
        if (groupRef.current) {
            const speed = hovered ? 0.6 : 0.2
            groupRef.current.rotation.y += speed * 0.01
        }
    })

    // Generate spiral pocket positions
    const pockets = useMemo(() => {
        const arr = []
        for (let lvl = 0; lvl < levels; lvl++) {
            for (let cup = 0; cup < cupsPerLevel; cup++) {
                const y = -towerHeight / 2 + 0.3 + (lvl / levels) * (towerHeight - 0.4)
                const baseAngle = (lvl * 40) + (cup * (360 / cupsPerLevel))
                arr.push({ angle: baseAngle % 360, y })
            }
        }
        return arr
    }, [])

    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group ref={groupRef}>
                {/* ═══ Main white cylindrical column ═══ */}
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[0.18, 0.18, towerHeight, 24]} />
                    <meshStandardMaterial
                        color="#f8fafc"
                        roughness={0.3}
                        metalness={0.05}
                    />
                </mesh>

                {/* Column top cap */}
                <mesh position={[0, towerHeight / 2, 0]} castShadow>
                    <sphereGeometry args={[0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.05} />
                </mesh>

                {/* ═══ Bowl / Basin at the base ═══ */}
                <group position={[0, -towerHeight / 2 - 0.05, 0]}>
                    {/* Bowl outer */}
                    <mesh castShadow receiveShadow>
                        <cylinderGeometry args={[0.6, 0.4, 0.28, 32]} />
                        <meshStandardMaterial color="#78866b" roughness={0.5} metalness={0.1} />
                    </mesh>
                    {/* Bowl inner hollow */}
                    <mesh position={[0, 0.06, 0]}>
                        <cylinderGeometry args={[0.55, 0.38, 0.2, 32]} />
                        <meshStandardMaterial color="#5a6b4f" roughness={0.6} metalness={0.05} />
                    </mesh>
                    {/* Water surface inside bowl */}
                    <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[0.5, 32]} />
                        <meshStandardMaterial
                            color="#67e8f9"
                            transparent
                            opacity={0.5}
                            roughness={0.1}
                            metalness={0.3}
                        />
                    </mesh>
                    {/* Bowl rim */}
                    <mesh position={[0, 0.14, 0]}>
                        <torusGeometry args={[0.58, 0.03, 8, 32]} />
                        <meshStandardMaterial color="#6b7e5d" roughness={0.4} metalness={0.15} />
                    </mesh>
                </group>

                {/* ═══ All pocket cups with plants spiraling around column ═══ */}
                {pockets.map((p, i) => (
                    <PocketCup key={i} angle={p.angle} y={p.y} hasPlant={true} />
                ))}
            </group>
        </Float>
    )
}

/* ─── Ground glow ring ─── */
function GlowRing({ hovered }) {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.material.opacity = hovered
                ? 0.2 + Math.sin(clock.getElapsedTime() * 3) * 0.1
                : 0.08 + Math.sin(clock.getElapsedTime() * 1.5) * 0.04
        }
    })
    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.0, 0]}>
            <ringGeometry args={[0.4, 1.4, 48]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
    )
}

/* ─── Exported Component ─── */
export default function Tower3DScene() {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className="w-full h-[420px] md:h-[500px] cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Canvas
                camera={{ position: [2.2, 0.6, 2.2], fov: 38 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow color="#ffffff" />
                <directionalLight position={[-3, 4, -3]} intensity={0.3} color="#10b981" />
                <pointLight position={[0, 2, 3]} intensity={0.4} color="#06b6d4" />

                <Tower hovered={hovered} />
                <GlowRing hovered={hovered} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2.2}
                />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
