import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { voiceService } from '../services/voiceService';

// 外层粒子球体
function OuterParticleSphere({ audioData }) {
  const meshRef = useRef();
  const particlesRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const { viewport } = useThree();

  const particles = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const originalPositions = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x4ECDC4);
    const color2 = new THREE.Color(0x44A08D);
    const color3 = new THREE.Color(0x96E6A1);
    const color4 = new THREE.Color(0x5DADE2);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() - 0.5) * 2);
      const radius = 2 + Math.random() * 0.8;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.25) {
        color = color1;
      } else if (colorChoice < 0.5) {
        color = color2;
      } else if (colorChoice < 0.75) {
        color = color3;
      } else {
        color = color4;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.04 + 0.02;
    }

    return { positions, colors, sizes, originalPositions };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;

      targetRotationRef.current.x += (mouseRef.current.y * 0.5 - targetRotationRef.current.x) * 0.05;
      targetRotationRef.current.y += (mouseRef.current.x * 0.5 - targetRotationRef.current.y) * 0.05;

      particlesRef.current.rotation.x += targetRotationRef.current.x * 0.01;
      particlesRef.current.rotation.y += targetRotationRef.current.y * 0.01;
    }

    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;

      const volume = audioData?.volume || 0;
      const bass = audioData?.bass || 0;
      const mid = audioData?.mid || 0;

      for (let i = 0; i < positions.length / 3; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const origX = particles.originalPositions[ix];
        const origY = particles.originalPositions[iy];
        const origZ = particles.originalPositions[iz];

        const wave = Math.sin(time * 2 + origX * 0.5) * 0.02;
        const wave2 = Math.cos(time * 1.5 + origY * 0.5) * 0.02;

        const audioWave = bass * 0.3 * Math.sin(time * 8 + origX * 2);
        const audioWave2 = mid * 0.2 * Math.cos(time * 6 + origY * 2);

        const expansionFactor = hovered ? 1.15 : 1.0 + volume * 0.1;

        positions[ix] = origX * expansionFactor + wave + audioWave;
        positions[iy] = origY * expansionFactor + wave2 + audioWave2;
        positions[iz] = origZ * expansionFactor;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const handlePointerMove = (e) => {
    mouseRef.current.x = (e.point.x / viewport.width) * 2;
    mouseRef.current.y = (e.point.y / viewport.height) * 2;
  };

  return (
    <group ref={particlesRef}>
      <points
        ref={meshRef}
        onPointerMove={handlePointerMove}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particles.sizes.length}
            array={particles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={hovered ? 0.06 : 0.04}
          vertexColors
          transparent
          opacity={hovered ? 1.0 : 0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// 内层粒子球体 - 更小的球体，响应高频声音
function InnerParticleSphere({ audioData }) {
  const meshRef = useRef();
  const particlesRef = useRef();

  const particles = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const originalPositions = new Float32Array(count * 3);

    const color1 = new THREE.Color(0xFF6B6B);
    const color2 = new THREE.Color(0xFFE66D);
    const color3 = new THREE.Color(0xFF8E53);
    const color4 = new THREE.Color(0xC44569);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() - 0.5) * 2);
      const radius = 0.8 + Math.random() * 0.4;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.25) {
        color = color1;
      } else if (colorChoice < 0.5) {
        color = color2;
      } else if (colorChoice < 0.75) {
        color = color3;
      } else {
        color = color4;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.03 + 0.015;
    }

    return { positions, colors, sizes, originalPositions };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.002;
      particlesRef.current.rotation.x -= 0.001;
    }

    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;

      const volume = audioData?.volume || 0;
      const treble = audioData?.treble || 0;
      const mid = audioData?.mid || 0;

      for (let i = 0; i < positions.length / 3; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const origX = particles.originalPositions[ix];
        const origY = particles.originalPositions[iy];
        const origZ = particles.originalPositions[iz];

        const wave = Math.sin(time * 3 + origX * 0.8) * 0.015;
        const wave2 = Math.cos(time * 2.5 + origY * 0.8) * 0.015;

        const audioWave = treble * 0.4 * Math.sin(time * 12 + origX * 3);
        const audioWave2 = mid * 0.3 * Math.cos(time * 10 + origY * 3);

        const expansionFactor = 1.0 + volume * 0.15 + treble * 0.1;

        positions[ix] = origX * expansionFactor + wave + audioWave;
        positions[iy] = origY * expansionFactor + wave2 + audioWave2;
        positions[iz] = origZ * expansionFactor;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={particlesRef}>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particles.sizes.length}
            array={particles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// 声音波动光环效果
function AudioWaveRing({ audioData }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.elapsedTime;
      const volume = audioData?.volume || 0;

      ringRef.current.children.forEach((child, index) => {
        const baseScale = 1 + index * 0.3;
        const audioScale = volume * 0.5;
        const pulse = Math.sin(time * 3 + index * 1.5) * 0.05;

        child.scale.setScalar(baseScale + audioScale + pulse);
        child.material.opacity = (0.1 + volume * 0.3) * (1 - index * 0.25);
      });
    }
  });

  if (!audioData?.isSpeaking) return null;

  return (
    <group ref={ringRef}>
      {[0, 1, 2].map((index) => (
        <mesh key={index}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial
            color={0x4ECDC4}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// 外层光晕效果
function GlowEffect({ audioData }) {
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current) {
      const time = state.clock.elapsedTime;
      const volume = audioData?.volume || 0;

      glowRef.current.rotation.y -= 0.0005;

      const baseScale = 1.0;
      const audioScale = volume * 0.2;
      glowRef.current.scale.setScalar(baseScale + audioScale);

      glowRef.current.material.opacity = 0.05 + volume * 0.15;
    }
  });

  return (
    <mesh ref={glowRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial
        color={0x4ECDC4}
        transparent
        opacity={0.05}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// 主场景组件
function Scene() {
  const [audioData, setAudioData] = useState({
    volume: 0,
    bass: 0,
    mid: 0,
    treble: 0,
    isSpeaking: false
  });

  useEffect(() => {
    voiceService.onVolumeChange((data) => {
      setAudioData(data);
    });

    return () => {
      voiceService.offVolumeChange();
    };
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#4ECDC4" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#44A08D" />
      <pointLight position={[0, 0, 5]} intensity={0.2} color="#FF6B6B" />

      <OuterParticleSphere audioData={audioData} />
      <InnerParticleSphere audioData={audioData} />
      <AudioWaveRing audioData={audioData} />
      <GlowEffect audioData={audioData} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export default function ParticleSphereCanvas() {
  return (
    <div style={{ width: '80%', height: '80%', margin: '0 auto' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
