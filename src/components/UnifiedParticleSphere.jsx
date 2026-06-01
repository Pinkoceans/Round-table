import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { voiceService } from '../services/voiceService';
import { useForumStore } from '../store';

// 统一的颜色系统 - 外层冷色，内层暖色
const COLORS = {
  outer: [0x4ECDC4, 0x44A08D, 0x5DADE2],
  inner: [0xFF6B6B, 0xFF8E53, 0xFFE66D],
};

// 统一的粒子系统 - 同时用于Home和Characters
function ParticleSystem({ audioData, visible, mode, opacity = 1 }) {
  if (!visible) return null;

  const groupRef = useRef();
  const particlesData = useMemo(() => {
    const count = mode === 'home' ? 2000 : 800;
    const radius = mode === 'home' ? 2.5 : 1.5;
    const data = [];
    const colorObjs = mode === 'home' 
      ? COLORS.outer.map(c => new THREE.Color(c))
      : COLORS.inner.map(c => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() - 0.5) * 2);
      const r = mode === 'home' 
        ? radius + Math.random() * 0.8
        : radius + Math.random() * 0.4;

      data.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ],
        color: colorObjs[Math.floor(Math.random() * colorObjs.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, [mode]);

  useFrame((state) => {
    if (groupRef.current) {
      // 外层粒子顺时针旋转，内层粒子逆时针旋转
      if (mode === 'home') {
        groupRef.current.rotation.y += 0.001;
        groupRef.current.rotation.x += 0.0005;
      } else {
        groupRef.current.rotation.y -= 0.002;
        groupRef.current.rotation.x -= 0.001;
      }

      const time = state.clock.elapsedTime;
      const volume = audioData?.volume || 0;

      groupRef.current.children.forEach((child, i) => {
        const data = particlesData[i];
        const wave = Math.sin(time * 2 + data.phase) * 0.02;
        const audioWave = volume * 0.1 * Math.sin(time * 8 + data.phase);
        const scale = 1 + wave + audioWave;

        child.position.set(
          data.position[0] * scale,
          data.position[1] * scale,
          data.position[2] * scale
        );
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particlesData.map((data, i) => (
        <mesh key={i} position={data.position}>
          <sphereGeometry args={[mode === 'home' ? 0.02 : 0.015, 8, 8]} />
          <meshBasicMaterial
            color={data.color}
            transparent
            opacity={(mode === 'home' ? 0.6 : 0.5) * opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

// 为人物生成位置
function getCharacterPosition(index, total, radius) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (total - 1)) * 2;
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = goldenAngle * index;

  return [
    Math.cos(theta) * radiusAtY * radius,
    y * radius,
    Math.sin(theta) * radiusAtY * radius
  ];
}

// 人物粒子组 - 包含旋转和交互
function CharacterParticles({ characters, characterPositions, activeCharacters, onCharacterClick }) {
  const groupRef = useRef();
  const [hoveredId, setHoveredId] = useState(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {characters.map((character, index) => {
        const isActive = activeCharacters.includes(character.id);
        const isHovered = hoveredId === character.id;
        const position = characterPositions[index];

        return (
          <group key={character.id} position={position}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onCharacterClick(character);
                console.log('Character clicked:', character.name);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredId(character.id);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredId(null);
                document.body.style.cursor = 'auto';
              }}
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color={isActive ? '#FFFFFF' : '#FF8E53'}
                emissive={isActive ? '#FFFFFF' : '#FF8E53'}
                emissiveIntensity={isActive ? 0.6 : (isHovered ? 0.4 : 0.15)}
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>

            {isActive && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.1, 0.12, 32]} />
                <meshBasicMaterial
                  color="#FFFFFF"
                  transparent
                  opacity={0.6}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

// 主场景
function Scene({ mode, onSelectCharacter }) {
  const { characters, activeCharacters, toggleActiveCharacter } = useForumStore();
  const { camera } = useThree();
  const [audioData, setAudioData] = useState({
    volume: 0,
    bass: 0,
    mid: 0,
    treble: 0,
    isSpeaking: false
  });
  const [outerOpacity, setOuterOpacity] = useState(1);

  useEffect(() => {
    voiceService.onVolumeChange((data) => {
      setAudioData(data);
    });
    return () => voiceService.offVolumeChange();
  }, []);

  // 相机动画 + 外层粒子淡出
  useFrame(() => {
    if (mode === 'characters') {
      camera.position.lerp(new THREE.Vector3(0, 0, 3.5), 0.02);
      setOuterOpacity(prev => Math.max(0, prev - 0.02));
    } else {
      camera.position.lerp(new THREE.Vector3(0, 0, 7), 0.02);
      setOuterOpacity(prev => Math.min(1, prev + 0.02));
    }
  });

  const characterPositions = useMemo(() => {
    return characters.map((_, index) => getCharacterPosition(index, characters.length, 1.5));
  }, [characters]);

  const handleCharacterClick = (character) => {
    if (toggleActiveCharacter) {
      toggleActiveCharacter(character.id);
    }
    onSelectCharacter(character);
    console.log('Character clicked:', character.name);
  };

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#4ECDC4" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#44A08D" />

      {/* 外层粒子 - 始终渲染，通过opacity控制显示/隐藏 */}
      <ParticleSystem audioData={audioData} visible={true} mode="home" opacity={outerOpacity} />

      {/* 内层粒子 - 始终渲染 */}
      <ParticleSystem audioData={audioData} visible={true} mode="characters" />

      {/* 人物粒子 - 只在characters模式显示 */}
      {mode === 'characters' && (
        <CharacterParticles
          characters={characters}
          characterPositions={characterPositions}
          activeCharacters={activeCharacters}
          onCharacterClick={handleCharacterClick}
        />
      )}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        autoRotate={mode !== 'characters'}
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export default function UnifiedParticleSphere({ mode = 'home', onSelectCharacter }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene mode={mode} onSelectCharacter={onSelectCharacter} />
      </Canvas>
    </div>
  );
}
