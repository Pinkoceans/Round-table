import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 过渡动画粒子 - 从双层粒子放大过渡到人物粒子
function TransitionParticles({ isTransitioning, onComplete }) {
  const groupRef = useRef();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle, zooming, fading

  useEffect(() => {
    if (isTransitioning && phase === 'idle') {
      setPhase('zooming');
      setProgress(0);
    }
  }, [isTransitioning, phase]);

  useFrame((state, delta) => {
    if (phase === 'zooming') {
      setProgress(prev => {
        const newProgress = prev + delta * 0.8; // 放大速度
        if (newProgress >= 1) {
          setPhase('fading');
          return 1;
        }
        return newProgress;
      });
    } else if (phase === 'fading') {
      setProgress(prev => {
        const newProgress = prev + delta * 0.5; // 淡出速度
        if (newProgress >= 2) {
          setPhase('idle');
          if (onComplete) onComplete();
          return 0;
        }
        return newProgress;
      });
    }
  });

  if (phase === 'idle') return null;

  // 计算动画参数
  const zoomProgress = Math.min(progress, 1);
  const fadeProgress = Math.max(0, progress - 1);
  const opacity = 1 - fadeProgress;
  const scale = 1 + zoomProgress * 2; // 放大到3倍

  return (
    <group ref={groupRef} scale={scale}>
      {/* 外层粒子效果 */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#4ECDC4"
          transparent
          opacity={opacity * 0.1}
          wireframe
        />
      </mesh>
      
      {/* 内层粒子效果 */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#FF6B6B"
          transparent
          opacity={opacity * 0.15}
          wireframe
        />
      </mesh>

      {/* 光晕效果 */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#4ECDC4"
          transparent
          opacity={opacity * 0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// 主组件
export default function TransitionAnimation({ isActive, onComplete }) {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        zIndex: 100
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <TransitionParticles 
          isTransitioning={isActive} 
          onComplete={onComplete}
        />
      </Canvas>
    </div>
  );
}
