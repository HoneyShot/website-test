import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ThreeScene() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // === SCENE SETUP ===
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 0, -5);  // Set the camera to view the object from the opposite side
        camera.lookAt(0, 0, 0);  // Make sure the camera looks at the center of the scene

        // === RENDERER ===
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        containerRef.current.appendChild(renderer.domElement);

        // === LIGHTING ===
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
        scene.add(ambientLight);

        // Add a point light for better reflections
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // === LOAD GLTF MODEL ===
        const loader = new GLTFLoader();
        let model: THREE.Object3D | null = null;

        loader.load('/logo.glb', (gltf) => {
            model = gltf.scene;
        
            // Center model geometry
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
        
            // Enhance material with MeshStandardMaterial (metallic and rough)
            model.traverse((child) => {
                if (child instanceof THREE.Mesh) {  // Check if the child is a Mesh
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0x8c8c8c, // Silver-gray color
                        metalness: 1,    // Fully metallic
                        roughness: 0.2,  // Slightly rough for reflections
                    });
                    child.material.color.set(0x0000ff); // Set to blue
                }
            });
        
            // model.scale.set(10, 10, 10);
            scene.add(model);
        });

        // === ANIMATION LOOP ===
        const animate = () => {
            requestAnimationFrame(animate);
            if(model){
                model.rotation.y += 0.01;
            }
            renderer.render(scene, camera);  // Render the scene from the camera's perspective
        };
        animate();

        // === HANDLE RESIZE ===
        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener("resize", handleResize);

        // === CLEANUP ===
        return () => {
            window.removeEventListener("resize", handleResize);
            if (containerRef.current?.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ background: "transparent" }}
        />
    );
}
