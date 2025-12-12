import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const SYMBOLS = [
  '{', '}', '</>', '&&', '||', '=>', '[]', '()', 'if', 'for', 
  'void', 'return', 'class', 'import', 'const', 'let', 'var', 
  'async', 'await', 'npm', 'git', '0x1', 'true', 'false', '!'
];

const CodeSymbol = ({ position, rotation, symbol, color, scale }: any) => {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Text
                position={position}
                rotation={rotation}
                fontSize={0.5 * scale}
                color={color}
                anchorX="center"
                anchorY="middle"
            >
                {symbol}
            </Text>
        </Float>
    );
};

export const CodeStorm = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    // Generate chaotic orbit positions
    const items = useMemo(() => {
        return new Array(150).fill(0).map((_, i) => {
            const radius = 4 + Math.random() * 8; // Orbit radius
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            return {
                id: i,
                position: [x, y, z] as [number, number, number],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
                symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                color: Math.random() > 0.8 ? '#2997FF' : '#ffffff', // 20% accent color
                scale: 0.5 + Math.random() * 1.5,
                speed: (Math.random() - 0.5) * 0.02
            };
        });
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            // Rotate the entire storm
            groupRef.current.rotation.y += 0.002;
            groupRef.current.rotation.z += 0.001;
        }
    });

    return (
        <group ref={groupRef}>
            {items.map((item) => (
                <CodeSymbol 
                    key={item.id}
                    {...item}
                />
            ))}
            {/* Ambient "Data Dust" */}
            <points>
                <bufferGeometry>
                     {/* @ts-ignore */}
                     <bufferAttribute
                        attach="attributes-position"
                        count={1000}
                        array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 25)}
                        itemSize={3}
                     />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#444" transparent opacity={0.5} />
            </points>
        </group>
    );
};
