import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw, Sparkles } from 'lucide-react';

interface VercelCubeProps {
  className?: string;
}

export const VercelCube: React.FC<VercelCubeProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'neon' | 'monochrome' | 'cyber'>('neon');
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(true);

  // References to communicate with the Three.js loop
  const modeRef = useRef<'neon' | 'monochrome' | 'cyber'>('neon');
  modeRef.current = activeMode;

  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  const isAutoSpinRef = useRef(true);
  isAutoSpinRef.current = isAutoSpin;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x0070f3, 4, 20);
    mainLight.position.set(4, 5, 5);
    scene.add(mainLight);

    const secondaryLight = new THREE.PointLight(0x7928ca, 4, 20);
    secondaryLight.position.set(-4, -4, -4);
    scene.add(secondaryLight);

    const cyanLight = new THREE.PointLight(0x50e3c2, 3, 20);
    cyanLight.position.set(0, -4, 4);
    scene.add(cyanLight);

    // --- Main Geometry Group ---
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Outer Wireframe & Glass Cube
    const cubeSize = 2.4;
    const boxGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    
    // Glassy body
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.6,
      transparent: true,
      opacity: 0.45,
      reflectivity: 0.9,
    });
    const mainBoxMesh = new THREE.Mesh(boxGeometry, glassMaterial);
    masterGroup.add(mainBoxMesh);

    // Outer Edges Wireframe with glowing line material
    const edgesGeom = new THREE.EdgesGeometry(boxGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0070f3,
      linewidth: 2,
      transparent: true,
      opacity: 0.95,
    });
    const edgeLines = new THREE.LineSegments(edgesGeom, lineMaterial);
    masterGroup.add(edgeLines);

    // 2. Corner Vertex Glow Points
    const cornerVertices = [
      [-1.2, -1.2, -1.2], [1.2, -1.2, -1.2], [1.2, 1.2, -1.2], [-1.2, 1.2, -1.2],
      [-1.2, -1.2, 1.2], [1.2, -1.2, 1.2], [1.2, 1.2, 1.2], [-1.2, 1.2, 1.2]
    ];
    const cornerGroup = new THREE.Group();
    const cornerGeom = new THREE.SphereGeometry(0.06, 16, 16);
    const cornerMat = new THREE.MeshBasicMaterial({ color: 0x50e3c2 });

    cornerVertices.forEach(([x, y, z]) => {
      const cornerMesh = new THREE.Mesh(cornerGeom, cornerMat);
      cornerMesh.position.set(x, y, z);
      cornerGroup.add(cornerMesh);
    });
    masterGroup.add(cornerGroup);

    // 3. Inner Rotating Octahedron / Vercel Core
    const innerGeom = new THREE.OctahedronGeometry(1.0, 0);
    const innerEdgesGeom = new THREE.EdgesGeometry(innerGeom);
    
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    masterGroup.add(innerMesh);

    const innerLineMat = new THREE.LineBasicMaterial({
      color: 0xff0080,
      linewidth: 2,
    });
    const innerLines = new THREE.LineSegments(innerEdgesGeom, innerLineMat);
    masterGroup.add(innerLines);

    // 4. Iconic Floating Vercel Triangle Core
    const triangleShape = new THREE.Shape();
    const tSize = 0.5;
    triangleShape.moveTo(0, tSize);
    triangleShape.lineTo(-tSize * 0.866, -tSize * 0.5);
    triangleShape.lineTo(tSize * 0.866, -tSize * 0.5);
    triangleShape.closePath();

    const extrudeSettings = { depth: 0.12, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const triangleGeom = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);
    triangleGeom.center();
    const triangleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0x222222,
    });
    const vercelLogo = new THREE.Mesh(triangleGeom, triangleMat);
    masterGroup.add(vercelLogo);

    // 5. Floating Dust / Star Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 14;
      particlePos[i + 1] = (Math.random() - 0.5) * 14;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
      particleSpeeds[i / 3] = 0.005 + Math.random() * 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x88aaff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse Parallax & Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y,
        };

        masterGroup.rotation.y += deltaMove.x * 0.01;
        masterGroup.rotation.x += deltaMove.y * 0.01;

        previousMousePosition = {
          x: event.clientX,
          y: event.clientY,
        };
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth target interpolation
      targetX += (mouseX * 0.8 - targetX) * 0.05;
      targetY += (mouseY * 0.8 - targetY) * 0.05;

      // Color Mode adjustments
      const currentMode = modeRef.current;
      if (currentMode === 'neon') {
        lineMaterial.color.setHex(0x0070f3); // Vercel Blue
        innerLineMat.color.setHex(0xff0080); // Neon Pink
        cornerMat.color.setHex(0x50e3c2); // Cyan
        mainLight.color.setHex(0x0070f3);
        secondaryLight.color.setHex(0x7928ca);
      } else if (currentMode === 'cyber') {
        lineMaterial.color.setHex(0x50e3c2); // Cyan
        innerLineMat.color.setHex(0xf5a623); // Amber
        cornerMat.color.setHex(0xff0080);
        mainLight.color.setHex(0x50e3c2);
        secondaryLight.color.setHex(0xff0080);
      } else {
        // Monochrome Vercel White/Black
        lineMaterial.color.setHex(0xffffff);
        innerLineMat.color.setHex(0x888888);
        cornerMat.color.setHex(0xffffff);
        mainLight.color.setHex(0xffffff);
        secondaryLight.color.setHex(0x444444);
      }

      // Base Rotations
      if (!isDragging) {
        const speedMultiplier = isHoveredRef.current ? 1.8 : 1.0;
        if (isAutoSpinRef.current) {
          masterGroup.rotation.y += 0.008 * speedMultiplier;
          masterGroup.rotation.x += 0.004 * speedMultiplier;
        }

        // Apply mouse tilt damping
        masterGroup.position.x = THREE.MathUtils.lerp(masterGroup.position.x, targetX * 0.6, 0.05);
        masterGroup.position.y = THREE.MathUtils.lerp(masterGroup.position.y, targetY * 0.6, 0.05);
      }

      // Inner Core Counter-Rotation
      innerMesh.rotation.x = -elapsedTime * 0.8;
      innerMesh.rotation.y = elapsedTime * 0.9;
      innerLines.rotation.x = -elapsedTime * 0.8;
      innerLines.rotation.y = elapsedTime * 0.9;

      // Triangle pulse & spin
      vercelLogo.rotation.z = Math.sin(elapsedTime * 1.2) * 0.4;
      vercelLogo.rotation.y = elapsedTime * 1.5;
      const pulseScale = 1.0 + Math.sin(elapsedTime * 3) * 0.06;
      vercelLogo.scale.set(pulseScale, pulseScale, pulseScale);

      // Gentle floating levitation
      masterGroup.position.y += Math.sin(elapsedTime * 2) * 0.002;

      // Animate particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3 + 1;
        positions[idx] -= particleSpeeds[i];
        if (positions[idx] < -7) {
          positions[idx] = 7;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      boxGeometry.dispose();
      edgesGeom.dispose();
      innerGeom.dispose();
      triangleGeom.dispose();
      particleGeo.dispose();
      glassMaterial.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow aura behind the 3D Canvas */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/15 to-teal-400/20 blur-3xl -z-10 rounded-full opacity-70 pointer-events-none transform scale-90 animate-pulse-slow" />

      {/* Interactive 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-[380px] sm:h-[460px] md:h-[500px] cursor-grab active:cursor-grabbing rounded-2xl relative z-10"
        title="Click & Drag to rotate 3D Vercel Cube"
      />

      {/* Floating Control Badges for user interaction */}
      <div className="absolute bottom-2 flex items-center gap-2 bg-black/60 dark:bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs text-zinc-400 shadow-xl z-20 transition-all hover:border-white/25">
        <span className="flex items-center gap-1 text-zinc-300 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          3D Interactive
        </span>
        <span className="text-zinc-600">•</span>
        
        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveMode('neon')}
            className={`px-2 py-0.5 rounded-md text-[11px] transition-colors ${
              activeMode === 'neon' ? 'bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/40' : 'hover:text-zinc-200'
            }`}
          >
            Neon
          </button>
          <button
            onClick={() => setActiveMode('cyber')}
            className={`px-2 py-0.5 rounded-md text-[11px] transition-colors ${
              activeMode === 'cyber' ? 'bg-teal-500/20 text-teal-400 font-semibold border border-teal-500/40' : 'hover:text-zinc-200'
            }`}
          >
            Cyber
          </button>
          <button
            onClick={() => setActiveMode('monochrome')}
            className={`px-2 py-0.5 rounded-md text-[11px] transition-colors ${
              activeMode === 'monochrome' ? 'bg-white/20 text-white font-semibold border border-white/30' : 'hover:text-zinc-200'
            }`}
          >
            Mono
          </button>
        </div>

        <span className="text-zinc-600">•</span>

        {/* Spin Toggle */}
        <button
          onClick={() => setIsAutoSpin(!isAutoSpin)}
          className={`p-1 rounded-md transition-colors ${isAutoSpin ? 'text-blue-400' : 'text-zinc-500'}`}
          title={isAutoSpin ? 'Pause auto-rotation' : 'Resume auto-rotation'}
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isAutoSpin ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>
      </div>

      {/* Tip text */}
      <div className="text-[11px] text-zinc-500 mt-2 font-mono flex items-center gap-1">
        <span>↔ Drag to spin</span>
        <span>•</span>
        <span>Hover to boost</span>
      </div>
    </div>
  );
};
