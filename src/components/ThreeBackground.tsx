import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const ThreeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = window.innerWidth < 768 ? 1.4 : 1.0;

    // Detect mobile
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isMobile ? 0x111111 : 0x000000);

    // Camera
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -0.02, 8.4);

    // Lights — brighter on mobile
    const dirLight = new THREE.DirectionalLight(0xffffff, isMobile ? 2.0 : 1.2);
    dirLight.position.set(4.1, 4.16, 4.19);
    scene.add(dirLight);

    const spotLight = new THREE.SpotLight(0xffffff, isMobile ? 3.0 : 2.0, 30, Math.PI / 4, 0.5);
    spotLight.position.set(0.09, -2.55, -4.06);
    spotLight.rotation.x = 1.92;
    scene.add(spotLight);

    scene.add(new THREE.AmbientLight(isMobile ? 0x444444 : 0x222222, isMobile ? 1.0 : 0.5));

    // Background plane — lighter on mobile
    const bgMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(27, 15.5),
      new THREE.MeshStandardMaterial({ color: isMobile ? 0x3a3a3a : 0x2c2c2c, metalness: 0.41, roughness: 0.64 })
    );
    bgMesh.position.z = -10.4;
    scene.add(bgMesh);

    // Metal material
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x797979, metalness: 1, roughness: 0.3, envMapIntensity: 1.5,
    });

    // 3D spiral geometry
    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.8, 0.35, 256, 32, 2, 3),
      metalMat
    );
    torus.scale.setScalar(3.56);
    torus.position.set(0, -0.5, 0);

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.12, 64, 128),
      metalMat.clone()
    );
    torus2.scale.setScalar(3.2);
    torus2.position.set(0, -0.5, 0);
    torus2.rotation.x = Math.PI / 3;

    const group = new THREE.Group();
    group.add(torus);
    group.add(torus2);
    scene.add(group);

    // Environment map
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x333333);
    const pl1 = new THREE.PointLight(0xffffff, 5, 20);
    pl1.position.set(5, 5, 5);
    envScene.add(pl1);
    const pl2 = new THREE.PointLight(0xaaaaaa, 3, 20);
    pl2.position.set(-5, -3, 2);
    envScene.add(pl2);
    scene.environment = pmrem.fromScene(envScene).texture;

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.75, 0.9
    ));

    // Animation (throttled to 30fps)
    let animId: number;
    const frameInterval = 1000 / 30;
    let lastFrameTime = 0;
    function animate(now: number) {
      animId = requestAnimationFrame(animate);
      if (now - lastFrameTime < frameInterval) return;
      lastFrameTime = now;

      const t = now * 0.0003;

      group.rotation.x = t * 0.3 + window.scrollY * 0.0003;
      group.rotation.y = t * 0.5;
      group.rotation.z = t * 0.1;

      camera.position.x = Math.sin(t * 0.5) * 0.15;
      camera.position.y = -0.02 + Math.cos(t * 0.3) * 0.1;

      composer.render();
    }
    animate(0);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pmrem.dispose();
      composer.dispose();
    };
  }, []);

  const isMobileView = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, width: "100vw", height: "100vh" }}
      />
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          backgroundImage: "url('/overlay.webp')",
          backgroundSize: "cover",
          mixBlendMode: "color-dodge",
          opacity: 0.47,
          pointerEvents: "none",
        }}
      />
      {/* Star field overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          backgroundImage: "url('/overlay2.webp')",
          backgroundSize: "cover",
          mixBlendMode: "screen",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />
      {/* Vignette — softer on mobile */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background: isMobileView
            ? "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.4) 100%)"
            : "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,.7) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default ThreeBackground;
