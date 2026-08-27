import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Project3DCanvasProps {
  type: 'neural' | 'swarm' | 'audio' | 'torus' | 'prism' | 'hologram';
  primaryColor?: string;
  secondaryColor?: string;
  isHovered?: boolean;
}

export const Project3DCanvas: React.FC<Project3DCanvasProps> = ({
  type,
  primaryColor = '#0070f3',
  secondaryColor = '#50e3c2',
  isHovered = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(isHovered);
  hoverRef.current = isHovered;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const pColor = new THREE.Color(primaryColor);
    const sColor = new THREE.Color(secondaryColor);

    // Dynamic Geometry based on type
    if (type === 'neural' || type === 'swarm') {
      // 3D Swarm / Neural Particle Network
      const count = 45;
      const geom = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 3;
        pos[i + 1] = (Math.random() - 0.5) * 3;
        pos[i + 2] = (Math.random() - 0.5) * 3;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: pColor,
        size: 0.1,
        transparent: true,
        opacity: 0.9,
      });
      const points = new THREE.Points(geom, mat);
      group.add(points);

      // Connecting lines
      const lineMat = new THREE.LineBasicMaterial({
        color: sColor,
        transparent: true,
        opacity: 0.35,
      });
      const wireframeSphere = new THREE.IcosahedronGeometry(1.6, 1);
      const edges = new THREE.EdgesGeometry(wireframeSphere);
      const lineMesh = new THREE.LineSegments(edges, lineMat);
      group.add(lineMesh);

    } else if (type === 'torus') {
      // 3D Torus Knot with Wireframe Glass
      const torusGeo = new THREE.TorusKnotGeometry(1.0, 0.32, 64, 16, 2, 3);
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.8,
        roughness: 0.2,
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      group.add(torusMesh);

      const edges = new THREE.EdgesGeometry(torusGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: pColor,
        linewidth: 1.5,
        transparent: true,
        opacity: 0.8,
      });
      const lines = new THREE.LineSegments(edges, lineMat);
      group.add(lines);

    } else if (type === 'audio' || type === 'hologram') {
      // Concentric 3D Holographic Wave Rings
      for (let i = 0; i < 4; i++) {
        const ringGeo = new THREE.RingGeometry(0.5 + i * 0.4, 0.52 + i * 0.4, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? pColor : sColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6 + i * 0.1,
          wireframe: true,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 3;
        ringMesh.position.z = (i - 1.5) * 0.3;
        group.add(ringMesh);
      }
      
      const centerSphere = new THREE.OctahedronGeometry(0.5, 0);
      const centerEdges = new THREE.EdgesGeometry(centerSphere);
      const centerLines = new THREE.LineSegments(
        centerEdges,
        new THREE.LineBasicMaterial({ color: 0xffffff })
      );
      group.add(centerLines);

    } else {
      // 3D Prismatic Diamond / Octahedron
      const octGeo = new THREE.OctahedronGeometry(1.5, 0);
      const octMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0a,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.6,
      });
      const octMesh = new THREE.Mesh(octGeo, octMat);
      group.add(octMesh);

      const edges = new THREE.EdgesGeometry(octGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: pColor,
        linewidth: 2,
        transparent: true,
        opacity: 0.9,
      });
      const lines = new THREE.LineSegments(edges, lineMat);
      group.add(lines);

      // Inner Core
      const innerCore = new THREE.DodecahedronGeometry(0.7, 0);
      const innerEdges = new THREE.EdgesGeometry(innerCore);
      const innerLines = new THREE.LineSegments(
        innerEdges,
        new THREE.LineBasicMaterial({ color: sColor })
      );
      group.add(innerLines);
    }

    // Lights
    const light1 = new THREE.PointLight(pColor, 3, 10);
    light1.position.set(2, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(sColor, 2, 10);
    light2.position.set(-2, -3, 3);
    scene.add(light2);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambLight);

    // Animation Loop
    let clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speed = hoverRef.current ? 2.5 : 1.0;

      group.rotation.x = elapsedTime * 0.3 * speed;
      group.rotation.y = elapsedTime * 0.5 * speed;
      group.position.y = Math.sin(elapsedTime * 2) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [type, primaryColor, secondaryColor]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[160px] relative pointer-events-none"
    />
  );
};
