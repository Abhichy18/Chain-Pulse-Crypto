import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NetworkParticles({ count = 800 }) {
  const pointsRef = useRef();
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return [pos];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.03;
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;
      
      // Simple mouse reactive tilt based on pointer position (state.pointer)
      const targetX = (state.pointer.y * Math.PI) / 8;
      const targetY = (state.pointer.x * Math.PI) / 8;
      
      pointsRef.current.rotation.x += (targetX - pointsRef.current.rotation.x) * 0.02;
      pointsRef.current.rotation.y += (targetY - pointsRef.current.rotation.y) * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00FF87"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
