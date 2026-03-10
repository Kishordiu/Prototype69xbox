import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlobeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a4a7a,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const iotNodes: THREE.Mesh[] = [];
    const nodePositions = [
      [1.5, 0.8, 1.2],
      [-1.3, 0.9, 1.5],
      [1.0, -1.2, 1.3],
      [-0.8, -1.5, 0.9],
      [1.8, 0.2, -0.5],
      [-1.6, 0.5, -0.8],
    ];

    nodePositions.forEach((pos) => {
      const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        emissive: 0x00ff88,
        emissiveIntensity: 0.5,
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(pos[0], pos[1], pos[2]);
      scene.add(node);
      iotNodes.push(node);
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.4,
    });

    iotNodes.forEach((node) => {
      const points = [new THREE.Vector3(0, 0, 0), node.position.clone()];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    });

    camera.position.z = 5;

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      globe.rotation.y += 0.001;
      globe.rotation.x += 0.0005;

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      iotNodes.forEach((node, index) => {
        const time = Date.now() * 0.001;
        node.material.emissiveIntensity = 0.5 + Math.sin(time + index) * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(circle at center, #0a0e27 0%, #000000 100%)' }}
    />
  );
}
