import * as THREE from 'three';
import { gsap } from 'gsap';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { WifiDeviceId } from '../../data/wifiDevices';

function labelTexture(text: string, color = '#ee741e', background = 'transparent') {
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  if (background !== 'transparent') { ctx.fillStyle = background; ctx.fillRect(0, 0, 512, 256); }
  ctx.fillStyle = color; ctx.font = 'italic 900 135px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (color !== 'brand' && ctx.measureText(text).width > 440) ctx.font = `italic 900 ${Math.floor(135 * 440 / ctx.measureText(text).width)}px Arial`;
  if (color === 'brand') { ['F', 'P', 'T'].forEach((letter, index) => { ctx.fillStyle = ['#0560b8', '#f37021', '#139247'][index]; ctx.fillText(letter, 155 + index * 96, 137); }); }
  else ctx.fillText(text, 256, 137);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function buildDevice(id: WifiDeviceId) {
  const group = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: '#fbfbf7', roughness: .3, metalness: .05 });
  const trim = new THREE.MeshStandardMaterial({ color: '#d5d6d3', roughness: .5 });
  const black = new THREE.MeshStandardMaterial({ color: '#111820', roughness: .3, metalness: .15 });
  const lens = new THREE.MeshStandardMaterial({ color: '#153547', roughness: .1, metalness: .75 });
  const orange = new THREE.MeshStandardMaterial({ color: '#fa7520', roughness: .4 });
  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0, parent: THREE.Group = group) => {
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const box = (w: number, h: number, d: number, radius: number, material: THREE.Material, x = 0, y = 0, z = 0) => add(new RoundedBoxGeometry(w, h, d, 3, radius), material, x, y, z);
  const label = (text: string, w: number, h: number, x: number, y: number, z: number, color?: string) => add(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: labelTexture(text, color), transparent: true, depthWrite: false }), x, y, z);

  if (id === 'router') {
    box(3.25, .25, 2.0, .12, white);
    box(3.05, .045, 1.80, .10, white, 0, .145, 0);
    box(3.10, .045, 1.86, .08, trim, 0, -.135, 0);
    const logo = label('FPT', .85, .42, 0, .18, .15, 'brand'); logo.rotation.x = -Math.PI / 2;
    for (const side of [-1, 1]) {
      const antenna = new THREE.Group(); antenna.position.set(side * 1.24, .13, -.7); antenna.rotation.z = side * -.12; group.add(antenna);
      add(new THREE.CylinderGeometry(.055, .075, 1.65, 20), white, 0, .8, 0, antenna);
      add(new THREE.SphereGeometry(.056, 16, 12), white, 0, 1.625, 0, antenna);
      box(.15, .12, .15, .04, trim, side * 1.24, .07, -.7);
    }
    for (let i = 0; i < 15; i++) box(.034, .009, .35, .003, trim, -.57 + i * .081, .177, -.47);
    for (let i = 0; i < 5; i++) {
      const port = box(.27, .095, .06, .015, i ? black : orange, -.75 + i * .35, -.02, -1.015);
      port.castShadow = false;
      for (let pin = 0; pin < 4; pin++) box(.017, .038, .008, .002, trim, -.84 + i * .35 + pin * .055, -.01, -1.05);
    }
    const power = add(new THREE.CylinderGeometry(.045, .045, .025, 16), black, 1.16, -.02, -1.035); power.rotation.x = Math.PI / 2;
    for (const x of [-1.16, 1.16]) for (const z of [-.63, .63]) box(.3, .04, .23, .025, black, x, -.178, z);
    for (let i = 0; i < 12; i++) box(.045, .008, .44, .003, trim, -.62 + i * .11, -.163, -.45);
    const bottomLabel = label('FPT Telecom', 1.02, .28, 0, -.164, .27, '#78818a'); bottomLabel.rotation.x = Math.PI / 2;
    for (let i = 0; i < 4; i++) add(new THREE.SphereGeometry(.021, 10, 8), new THREE.MeshStandardMaterial({ color: '#52b68c', emissive: '#52b68c', emissiveIntensity: .7 }), -.45 + i * .15, -.01, 1.01);
  } else if (id === 'camera-indoor') {
    const points = [[.52, 0], [.59, .05], [.6, .22], [.50, .46], [.34, .64]].map(([x, y]) => new THREE.Vector2(x, y));
    add(new THREE.LatheGeometry(points, 48), white, 0, -.45);
    add(new THREE.CylinderGeometry(.5, .53, .05, 40), trim, 0, -.45);
    add(new THREE.SphereGeometry(.69, 48, 32), white, 0, .73);
    const face = add(new THREE.SphereGeometry(.706, 40, 24, 0, Math.PI * 2, 0, .78), black, 0, .73); face.rotation.x = Math.PI / 2;
    add(new THREE.TorusGeometry(.19, .031, 12, 40), trim, 0, .74, .716);
    const glass = add(new THREE.CylinderGeometry(.165, .165, .025, 40), lens, 0, .74, .738); glass.rotation.x = Math.PI / 2;
    const reflection = add(new THREE.SphereGeometry(.03, 16, 12), new THREE.MeshBasicMaterial({ color: '#91bdd6' }), -.05, .80, .756); reflection.scale.z = .1;
    label('FPT', .38, .19, 0, -.10, .578);
    add(new THREE.TorusGeometry(.036, .009, 10, 24), trim, 0, -.29, .575);
    for (let row = -2; row <= 2; row++) for (let col = -2; col <= 2; col++) {
      if (row * row + col * col > 6) continue;
      add(new THREE.SphereGeometry(.015, 8, 6), black, col * .07, .78 + row * .07, -.67 + Math.abs(col) * .008);
    }
  } else if (id === 'camera-outdoor') {
    const shell = add(new THREE.CylinderGeometry(.51, .48, 1.5, 48), white, 0, .15, 0); shell.rotation.x = Math.PI / 2;
    const rim = add(new THREE.CylinderGeometry(.515, .515, .09, 48), trim, 0, .15, .76); rim.rotation.x = Math.PI / 2;
    const face = add(new THREE.CylinderGeometry(.46, .46, .06, 48), black, 0, .15, .81); face.rotation.x = Math.PI / 2;
    add(new THREE.TorusGeometry(.16, .025, 12, 32), trim, 0, .12, .853);
    const glass = add(new THREE.CylinderGeometry(.14, .14, .02, 36), lens, 0, .12, .867); glass.rotation.x = Math.PI / 2;
    for (const side of [-1, 1]) { const led = add(new THREE.SphereGeometry(.085, 20, 16), new THREE.MeshStandardMaterial({ color: '#f8e8b2', roughness: .2 }), side * .135, .40, .846); led.scale.z = .2; }
    add(new THREE.CylinderGeometry(.10, .13, .83, 24), white, 0, .98, -.5);
    add(new THREE.CylinderGeometry(.54, .54, .12, 48), white, 0, 1.43, -.5);
    const logo = label('FPT', .40, .22, .517, .22, -.05); logo.rotation.y = Math.PI / 2;
  } else {
    box(2.7, 1.65, .12, .04, black, 0, .65, -.48);
    const display = document.createElement('canvas'); display.width = 768; display.height = 448;
    const ctx = display.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 768, 448); gradient.addColorStop(0, '#ff852f'); gradient.addColorStop(1, '#3b2028'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, 768, 448);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 72px Arial'; ctx.fillText('FPT Play', 48, 138);
    for (let i = 0; i < 3; i++) {
      const x = 48 + i * 232; ctx.fillStyle = ['#e58a44', '#1a685d', '#8261ad'][i]; ctx.fillRect(x, 214, 212, 173);
      ctx.fillStyle = '#ffffff25'; ctx.beginPath(); ctx.arc(x + 126, 260, 75, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 25px Arial'; ctx.fillText(['PHIM', 'THỂ THAO', 'THIẾU NHI'][i], x + 15, 362);
    }
    const map = new THREE.CanvasTexture(display); map.colorSpace = THREE.SRGBColorSpace;
    add(new THREE.PlaneGeometry(2.57, 1.50), new THREE.MeshBasicMaterial({ map }), 0, .65, -.409);
    box(.12, .36, .10, .025, black, 0, -.35, -.48); box(.78, .055, .40, .02, black, 0, -.55, -.48);
    box(1.28, .21, .96, .08, black, 0, -.48, .45);
    const logo = label('FPT Play', .74, .22, 0, -.366, .45, '#eeeeeb'); logo.rotation.x = -Math.PI / 2;
    const remote = new THREE.Group(); remote.position.set(1.01, -.50, .47); remote.rotation.y = -.22; group.add(remote);
    add(new RoundedBoxGeometry(.30, .11, 1.08, 3, .07), black, 0, 0, 0, remote);
    for (let i = 0; i < 10; i++) { const b = add(new THREE.SphereGeometry(i ? .025 : .036, 12, 8), i ? trim : orange, (i % 2 ? -.07 : .07), .06, -.36 + Math.floor(i / 2) * .14, remote); b.scale.y = .25; }
  }
  const bounds = new THREE.Box3().setFromObject(group); const center = bounds.getCenter(new THREE.Vector3());
  group.children.forEach(child => child.position.sub(center));
  const size = bounds.getSize(new THREE.Vector3()); group.scale.setScalar(3.4 / Math.max(size.x, size.y, size.z));
  return group;
}

export function mountDeviceScene(host: HTMLElement, onReady: () => void, reduced: boolean, ids: WifiDeviceId[] = ['router', 'play', 'camera-indoor', 'camera-outdoor']) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-hidden', 'true'); host.appendChild(renderer.domElement);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(34, 1, .1, 40);
  camera.position.set(3.2, 2.1, 7); camera.lookAt(0, 0, 0);
  const room = new RoomEnvironment(), generator = new THREE.PMREMGenerator(renderer), environment = generator.fromScene(room, .04);
  scene.environment = environment.texture; room.dispose(); generator.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8bd98, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.8); key.position.set(3, 6, 5); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -6; key.shadow.camera.right = 6; key.shadow.camera.top = 5; key.shadow.camera.bottom = -5; key.shadow.normalBias = .03; scene.add(key);
  const fill = new THREE.DirectionalLight(0xffd5b0, 1.2); fill.position.set(-4, 2, -3); scene.add(fill);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.ShadowMaterial({ opacity: .10 })); shadow.rotation.x = -Math.PI / 2; shadow.position.y = -2; shadow.receiveShadow = true; scene.add(shadow);
  const pivot = new THREE.Group(); scene.add(pivot);
  const devices = new Map<WifiDeviceId, THREE.Group>();
  ids.forEach(id => { const wrapper = new THREE.Group(); wrapper.add(buildDevice(id)); pivot.add(wrapper); devices.set(id, wrapper); });
  const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
  timeline.to({ value: 0 }, { value: 1, duration: 1, ease: 'none' }, 0);
  devices.forEach((device, id) => { device.position.set(id === 'router' ? 0 : 3.8, 0, 0); device.scale.setScalar(id === 'router' ? 1 : .001); });
  const pose = (id: WifiDeviceId, x: number, y: number, z: number, scale: number, at: number, duration: number) => {
    const object = devices.get(id); if (!object) return;
    timeline.to(object.position, { x, y, z, duration }, at); timeline.to(object.scale, { x: scale, y: scale, z: scale, duration }, at);
  };
  pose('router', -2.15, -.7, -.2, .40, .2, .24); pose('play', .25, .15, .1, .92, .2, .24);
  pose('router', -2.45, -.85, .1, .40, .60, .28); pose('play', -.3, .1, -.6, .66, .60, .28);
  pose('camera-indoor', 1.75, -.85, .7, .38, .60, .28); pose('camera-outdoor', 2.1, .85, -.6, .40, .63, .28);
  timeline.progress(0);
  let storyMode = false, targetStory = 0, currentStory = 0, scroll = 0, pointerX = 0, pointerY = 0, yaw = -.25, pitch = 0, dragYaw = 0, dragPitch = 0, viewOverride = false;
  let active: WifiDeviceId | 'ecosystem' = ids[0], frame = 0, visible = false, disposed = false, lastTime = 0;
  let revealTween: gsap.core.Tween | null = null;
  const render = (time = 0) => {
    frame = 0; if (disposed || !visible || document.hidden) return;
    const dt = Math.min(Math.max((time - lastTime) / 1000, .001), .05); lastTime = time;
    const ease = reduced ? 1 : 1 - Math.exp(-dt * 10);
    if (storyMode) {
      currentStory += (targetStory - currentStory) * ease; timeline.progress(currentStory);
      devices.forEach(object => object.visible = object.scale.x > .005);
    }
    const targetYaw = viewOverride ? yaw + dragYaw : -.25 + (reduced ? 0 : storyMode ? currentStory * .9 : scroll * 2.1) + pointerX * .16 + dragYaw;
    const targetPitch = (viewOverride ? pitch : pointerY * .08) + dragPitch;
    pivot.rotation.y += (targetYaw - pivot.rotation.y) * ease; pivot.rotation.x += (targetPitch - pivot.rotation.x) * ease;
    pivot.position.y = reduced ? 0 : Math.sin(time * .0008) * .035;
    const z = camera.aspect < .85 ? 9 : storyMode ? 7 + currentStory * 1.1 : 7;
    camera.position.z += (z - camera.position.z) * ease; camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    host.dataset.angle = pivot.rotation.y.toFixed(3); host.dataset.pitch = pivot.rotation.x.toFixed(3);
    host.dataset.product = storyMode ? currentStory < .25 ? 'router' : currentStory < .72 ? 'play' : 'ecosystem' : active;
    host.dataset.storyProgress = currentStory.toFixed(3); host.dataset.visibleProducts = [...devices].filter(([, object]) => object.visible).map(([id]) => id).join(',');
    if (!reduced) frame = requestAnimationFrame(render);
  };
  const start = () => { if (!frame && !disposed && visible && !document.hidden) { lastTime = performance.now(); frame = requestAnimationFrame(render); } };
  const resize = new ResizeObserver(() => { const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); start(); }); resize.observe(host);
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; } }, { rootMargin: '100px' }); observer.observe(host);
  const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); }; document.addEventListener('visibilitychange', visibility);
  onReady();
  return {
    select(id: WifiDeviceId | 'ecosystem') {
      revealTween?.kill();
      active = id; storyMode = false; viewOverride = false; dragYaw = dragPitch = 0; pointerX = pointerY = 0;
      if (id === 'ecosystem') { storyMode = true; currentStory = targetStory = 1; timeline.progress(0).progress(1); }
      else devices.forEach((object, key) => { object.visible = key === id; object.position.set(key === id ? 0 : 3.8, 0, 0); object.scale.setScalar(key === id ? 1 : .001); });
      const selected = id === 'ecosystem' ? undefined : devices.get(id);
      if (selected && ids.length < 4 && !reduced) revealTween = gsap.fromTo(selected.scale, { x: .84, y: .84, z: .84 }, { x: 1, y: 1, z: 1, duration: .55, ease: 'power3.out' });
      start();
    },
    setStory(value: number) { if (!storyMode) timeline.progress(1).progress(0); storyMode = true; targetStory = Math.max(0, Math.min(1, value)); start(); },
    setScroll(value: number) { scroll = value; start(); },
    setPointer(x: number, y: number) { pointerX = x; pointerY = y; start(); },
    rotate(dx: number, dy = 0) { dragYaw += dx; dragPitch += dy; start(); },
    setView(nextYaw: number, nextPitch: number) { viewOverride = true; yaw = nextYaw; pitch = nextPitch; dragYaw = dragPitch = pointerX = pointerY = 0; start(); },
    resetView() { viewOverride = false; yaw = -.25; pitch = 0; dragYaw = dragPitch = pointerX = pointerY = 0; start(); },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); timeline.kill(); revealTween?.kill(); resize.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', visibility);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>(), textures = new Set<THREE.Texture>();
      scene.traverse(object => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => { materials.add(material); const map = (material as THREE.MeshStandardMaterial).map; if (map) textures.add(map); }); } });
      geometries.forEach(object => object.dispose()); materials.forEach(object => object.dispose()); textures.forEach(object => object.dispose()); environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
