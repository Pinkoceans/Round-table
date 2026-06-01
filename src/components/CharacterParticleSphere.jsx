import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useForumStore } from '../store';

// 分类颜色映射 - 与home界面风格一致
const categoryColors = {
  business: '#4ECDC4',
  philosophy: '#9B59B6',
  science: '#3498DB',
  literature: '#E74C3C',
  politics: '#F39C12',
  tech: '#2ECC71',
};

const categoryLabels = {
  business: 'Business',
  philosophy: 'Philosophy',
  science: 'Science',
  literature: 'Literature',
  politics: 'Politics',
  tech: 'Technology',
};

// 为每个人物生成固定位置
function getCharacterPosition(id, total, radius) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const index = parseInt(id) % total;
  const y = 1 - (index / (total - 1)) * 2;
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = goldenAngle * index;

  const x = Math.cos(theta) * radiusAtY;
  const z = Math.sin(theta) * radiusAtY;

  return [x * radius, y * radius, z * radius];
}

// 外层粒子效果 - 与home界面风格一致
function OuterParticles() {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x4ECDC4);
    const color2 = new THREE.Color(0x44A08D);
    const color3 = new THREE.Color(0x96E6A1);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() - 0.5) * 2);
      const radius = 2.5 + Math.random() * 0.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const colorChoice = Math.random();
      const color = colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.x += 0.0005;
    }
  });

  return (
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
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 单个人物粒子
function CharacterParticle({ character, position, isActive, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const colorHex = categoryColors[character.category] || '#FFFFFF';

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const breathe = 1 + Math.sin(time * 2 + parseInt(character.id) * 0.5) * 0.15;
      const targetScale = isActive ? 2.0 * breathe : (hovered ? 1.5 : 1.0);
      meshRef.current.scale.setScalar(targetScale);
    }
  });

  return (
    <group position={position}>
      {/* 光晕 */}
      <mesh scale={1.5}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color={colorHex}
          transparent
          opacity={hovered ? 0.3 : 0.15}
        />
      </mesh>

      {/* 粒子核心 */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(character);
        }}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color={isActive ? '#FFFFFF' : colorHex}
          emissive={isActive ? '#FFFFFF' : colorHex}
          emissiveIntensity={isActive ? 0.8 : (hovered ? 0.5 : 0.2)}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* 选中状态的光环 */}
      {isActive && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 0.25, 32]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 悬停时显示详细信息 */}
      {hovered && (
        <Html
          position={[0, 0.18, 0]}
          center
          distanceFactor={30}
          zIndexRange={[100, 0]}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1000,
          }}
        >
          <div 
            className="bg-black/60 border border-white/5 rounded-sm px-1 py-0.5 whitespace-nowrap"
            style={{ minWidth: '70px', fontSize: '9px', lineHeight: '1.2' }}
          >
            <div className="text-white/90 font-medium" style={{ fontSize: '9px' }}>{character.name}</div>
            <div className="text-white/40" style={{ fontSize: '8px' }}>{character.identity}</div>
            <div className="flex items-center gap-0.5 mt-0.5">
              <span
                className="w-0.5 h-0.5 rounded-full inline-block"
                style={{ backgroundColor: colorHex }}
              />
              <span className="text-white/30" style={{ fontSize: '8px' }}>
                {categoryLabels[character.category] || character.category}
              </span>
              {isActive && (
                <span className="text-emerald-400/80" style={{ fontSize: '8px' }}>Selected</span>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// 中心核心
function CenterCore() {
  const coreRef = useRef();

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.005;
      coreRef.current.rotation.x += 0.003;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshBasicMaterial
        color="#4ECDC4"
        transparent
        opacity={0.2}
        wireframe
      />
    </mesh>
  );
}

// 场景组件
function Scene({ onCharacterClick, searchQuery }) {
  const { characters, activeCharacters } = useForumStore();

  const characterPositions = useMemo(() => {
    return characters.map(char => {
      return getCharacterPosition(char.id, characters.length, 2.5);
    });
  }, [characters]);

  const dimmedSet = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') return new Set();

    const query = searchQuery.toLowerCase().trim();
    const dimmed = new Set();

    characters.forEach(char => {
      const match =
        char.name.toLowerCase().includes(query) ||
        char.identity.toLowerCase().includes(query) ||
        char.category.toLowerCase().includes(query);

      if (!match) {
        dimmed.add(char.id);
      }
    });

    return dimmed;
  }, [characters, searchQuery]);

  const handleCharacterClick = (character) => {
    const store = useForumStore.getState();
    if (store.toggleActiveCharacter) {
      store.toggleActiveCharacter(character.id);
    }
    if (onCharacterClick) {
      onCharacterClick(character);
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#4ECDC4" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#44A08D" />

      {/* 外层粒子 - 与home界面风格一致 */}
      <OuterParticles />

      {/* 中心核心 */}
      <CenterCore />

      {/* 人物粒子 */}
      {characters.map((character, index) => (
        <CharacterParticle
          key={character.id}
          character={character}
          position={characterPositions[index]}
          isActive={activeCharacters.includes(character.id)}
          onClick={handleCharacterClick}
        />
      ))}

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.15}
        minDistance={4}
        maxDistance={12}
      />
    </>
  );
}

export default function CharacterParticleSphere({ onCharacterClick, searchQuery = '' }) {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene onCharacterClick={onCharacterClick} searchQuery={searchQuery} />
      </Canvas>
    </div>
  );
}
