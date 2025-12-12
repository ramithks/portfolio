import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import profileImg from '../../assets/profile_alt.jpg';

// Custom Shader for the Particle Image
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  
  attribute vec3 color;
  attribute float size;
  
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    
    vec3 pos = position;
    
    // Mouse Interaction
    // Map mouse to local space (approximate for this demo)
    vec2 mouseLocal = uMouse * 6.0; // Scale to match plane size
    
    float dist = distance(pos.xy, mouseLocal);
    float influence = 1.0 - smoothstep(0.0, 1.5, dist);
    
    // Disperse effect
    vec3 direction = normalize(pos - vec3(mouseLocal, 0.0));
    pos += direction * influence * 2.0 * uHover;
    
    // Gentle breathing
    pos.z += sin(uTime * 2.0 + pos.x * 2.0) * 0.05;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

export const ParticleImage = () => {
    const texture = useTexture(profileImg);
    // @ts-ignore
    const { viewport, mouse } = useThree();
    const pointsRef = useRef<THREE.Points>(null);
    const shaderRef = useRef<THREE.ShaderMaterial>(null);

    // Generate particles and geometry
    const geometry = useMemo(() => {
        const width = 200; // Resolution
        const height = 200;
        
        const count = width * height;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        
        // created a temporary canvas to read image data
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        
        // Draw image to canvas
        const img = texture.image as CanvasImageSource;
        ctx.drawImage(img, 0, 0, width, height);
        const data = ctx.getImageData(0, 0, width, height).data;
        
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const index = (i + j * width);
                const i4 = index * 4;
                
                // Position (centered)
                const x = (i / width - 0.5) * 6;
                const y = (j / height - 0.5) * 6;
                const z = 0;
                
                positions[index * 3] = x;
                positions[index * 3 + 1] = -y; // Flip Y
                positions[index * 3 + 2] = z;
                
                // Color from texture
                colors[index * 3] = data[i4] / 255;
                colors[index * 3 + 1] = data[i4 + 1] / 255;
                colors[index * 3 + 2] = data[i4 + 2] / 255;
                
                // Size variation based on brightness
                const brightness = (data[i4] + data[i4 + 1] + data[i4 + 2]) / (255 * 3);
                sizes[index] = Math.max(0.02, brightness * 0.05);
            }
        }
        
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        return geo;
    }, [texture]);
    
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHover: { value: 0 }
    }), []);

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // Smooth mouse interpolation 
            shaderRef.current.uniforms.uMouse.value.lerp(state.mouse, 0.1);
            
            // Interaction intensity (always active if standard mouse use)
            shaderRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
                shaderRef.current.uniforms.uHover.value,
                1.0, // Always active for "Connected" feel
                0.1
            );
        }
    });

    if (!geometry) return null;

    return (
        <points ref={pointsRef} geometry={geometry}>
            {/* @ts-ignore */}
            <shaderMaterial
                ref={shaderRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
            />
        </points>
    );
};
