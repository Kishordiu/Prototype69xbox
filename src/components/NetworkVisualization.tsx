import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NetworkVisualization() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / 400,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(mountRef.current.clientWidth, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const trustedNodes: THREE.Mesh[] = [];
    const blockedNodes: THREE.Mesh[] = [];
    const lines: THREE.Line[] = [];

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1;

      const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        emissive: 0x00ff88,
        emissiveIntensity: 0.5,
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      scene.add(node);
      trustedNodes.push(node);

      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.5,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
      lines.push(line);
    }

    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2 + Math.PI / 3;
      const radius = 3.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1.5;

      const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.5,
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      scene.add(node);
      blockedNodes.push(node);
    }

    const centerGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      emissive: 0x00aaff,
      emissiveIntensity: 0.8,
    });
    const centerNode = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(centerNode);

    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      trustedNodes.forEach((node, index) => {
        node.material.emissiveIntensity = 0.5 + Math.sin(time * 2 + index) * 0.3;
      });

      blockedNodes.forEach((node, index) => {
        node.material.emissiveIntensity = 0.5 + Math.sin(time * 3 + index) * 0.3;
      });

      centerNode.material.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.2;

      scene.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, 400);
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
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Global Network Protection
        </h2>
        <p className="text-xl text-center text-gray-400 mb-12">
          Real-time monitoring of secure and blocked devices worldwide
        </p>

        <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl border border-gray-700 p-8">
          <div ref={mountRef} className="w-full" />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-6 bg-green-500/10 rounded-xl border border-green-500/30">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="text-green-400 font-bold text-lg">Trusted Devices</p>
                <p className="text-gray-400">Verified and actively monitored connections</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-red-500/10 rounded-xl border border-red-500/30">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              <div>
                <p className="text-red-400 font-bold text-lg">Blocked Threats</p>
                <p className="text-gray-400">Malicious devices isolated from network</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
