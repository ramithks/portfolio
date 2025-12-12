// @ts-ignore
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, Line } from '@react-three/drei';
import * as THREE from 'three';

const NODES_COUNT = 150;
const CONNECTION_DISTANCE = 3;

// A "Service Node" in the distributed system
const Node = ({ position, ...props }: any) => {
    const ref = useRef<any>(null);
    // Random gentle floating
    useFrame((state) => {
        if(ref.current) {
            ref.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
        }
    });
    return (
        <Instance ref={ref} position={position} {...props} />
    );
}

const NetworkMesh = () => {
    // Generate random node positions
    const nodes = useMemo(() => {
        return new Array(NODES_COUNT).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
            ] as [number, number, number]
        }))
    }, []);

    // Calculate connections (static for performance, could be dynamic)
    const connections = useMemo(() => {
        const lines: any[] = [];
        nodes.forEach((node, i) => {
            nodes.forEach((other, j) => {
                if (i !== j) {
                    const dist = new THREE.Vector3(...node.position).distanceTo(new THREE.Vector3(...other.position));
                    if (dist < CONNECTION_DISTANCE) {
                        lines.push({ start: node.position, end: other.position });
                    }
                }
            })
        });
        return lines;
    }, [nodes]);

    return (
        <group>
            {/* The Services/Nodes */}
            <Instances range={NODES_COUNT}>
                <dodecahedronGeometry args={[0.15, 0]} />
                <meshStandardMaterial emissive="#2997FF" emissiveIntensity={2} color="#000" toneMapped={false} />
                {nodes.map((node, i) => (
                    <Node key={i} position={node.position} />
                ))}
            </Instances>

            {/* The Network Connections */}
            {connections.map((line, i) => (
                 <Line
                    key={i}
                    points={[line.start, line.end]}
                    color="#2997FF"
                    opacity={0.1}
                    transparent
                    lineWidth={1}
                 />
            ))}
        </group>
    );
};

export const NetworkBackground = () => {
    return (
        <div className="absolute inset-0 z-0 bg-black">
             <div className="absolute inset-0 z-0 opacity-40">
                {/* Canvas is handled in pure R3F if possible, but here wrapping specifically for the section */}
                {/* Note: In a real app we'd share one Canvas, but sticking to module pattern here */}
                {/* We will reuse the canvas from HeroParticles refactor */}
            </div>
        </div>
    )
}

// Re-exporting specifically for the R3F Canvas context
export const NetworkScene = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <NetworkMesh />
        </>
    )
}
