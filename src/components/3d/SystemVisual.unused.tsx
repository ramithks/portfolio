import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Icosahedron, MeshTransmissionMaterial } from "@react-three/drei";

export const SystemVisual = () => {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[1, 0]} ref={meshRef}>
            <MeshTransmissionMaterial 
                backside={false}
                samples={4}
                resolution={512}
                thickness={0.5}
                roughness={0}
                anisotropy={1}
                chromaticAberration={0.06}
                color="#2997FF"
            />
        </Icosahedron>
        
        {/* Orbiting Elements */}
        <Text position={[1.5, 0, 0]} fontSize={0.15} color="white">
           MICROSERVICES
        </Text>
        <Text position={[-1.5, 0.5, 0]} fontSize={0.15} color="white">
           DISTRIBUTED
        </Text>
        <Text position={[0, -1.5, 0]} fontSize={0.15} color="white">
           EVENT-DRIVEN
        </Text>
      </Float>
    </group>
  );
};
