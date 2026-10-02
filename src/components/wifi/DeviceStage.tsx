import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Move, RotateCcw, Hand, X } from 'lucide-react';
import type { WifiDeviceId } from '../../data/wifiDevices';
import type { mountDeviceScene } from './deviceModels';
type Controller = ReturnType<typeof mountDeviceScene>;
type Props = { device: WifiDeviceId | 'ecosystem'; label: string; progress?: MotionValue<number>; cinematic?: boolean; className?: string };
const views = [{ name: 'Góc 3/4', yaw: -.25, pitch: 0 }, { name: 'Mặt trước', yaw: .52, pitch: -.3 }, { name: 'Mặt sau', yaw: Math.PI + .52, pitch: -.3 }, { name: 'Mặt trên', yaw: -.25, pitch: 1.1 }, { name: 'Mặt dưới', yaw: -.25, pitch: -1.65 }];
export function DeviceStage({ device, label, progress, cinematic = false, className = '' }: Props) {
  const host = useRef<HTMLDivElement>(null), frame = useRef<HTMLDivElement>(null), controller = useRef<Controller | null>(null);
  const latest = useRef({ device, cinematic }); latest.current = { device, cinematic };
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false), [touchOrbit, setTouchOrbit] = useState(false), [view, setView] = useState(0);
  const reduced = useReducedMotion();
  const staticProgress = useMotionValue(0), storyProgress = progress ?? staticProgress;
  const { scrollYProgress: localProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] });
  const orbit = useTransform(storyProgress, [0, 1], [0, 180]);
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);
  useMotionValueEvent(storyProgress, 'change', value => { if (cinematic && window.innerWidth > 700 && !reduced) controller.current?.setStory(value); });
  useMotionValueEvent(localProgress, 'change', value => { if (!reduced && (!cinematic || window.innerWidth <= 700)) controller.current?.setScroll(value * .5); });
  useEffect(() => {
    let cancelled = false, mounting = false;
    setReady(false); setFailed(false);
    const mount = () => {
      if (mounting || cancelled || !host.current) return; mounting = true;
      import('./deviceModels').then(module => {
        if (cancelled || !host.current) return;
        const ids: WifiDeviceId[] = cinematic ? ['router', 'play', 'camera-indoor', 'camera-outdoor'] : latest.current.device === 'play' ? ['play'] : ['camera-indoor', 'camera-outdoor'];
        controller.current = module.mountDeviceScene(host.current, () => { if (!cancelled) setReady(true); }, !!reduced, ids);
        controller.current.select(latest.current.device);
        if (cinematic && window.innerWidth > 700 && !reduced) controller.current.setStory(storyProgress.get());
        else if (!reduced) controller.current.setScroll(localProgress.get() * .5);
      }).catch(() => { if (!cancelled) setFailed(true); });
    };
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { mount(); observer.disconnect(); } }, { rootMargin: '250px' });
    if (host.current) observer.observe(host.current);
    return () => { cancelled = true; observer.disconnect(); controller.current?.dispose(); controller.current = null; };
  }, [reduced, cinematic, storyProgress, localProgress]);
  useEffect(() => { setView(0); if (!cinematic || window.innerWidth <= 700 || reduced) controller.current?.select(device); else controller.current?.resetView(); }, [device, cinematic, reduced]);
  useEffect(() => {
    if (!cinematic) return;
    const media = matchMedia('(min-width: 701px)');
    const resizeMode = () => {
      if (media.matches && !reduced) controller.current?.setStory(storyProgress.get());
      else { controller.current?.select(latest.current.device); if (!reduced) controller.current?.setScroll(localProgress.get() * .5); }
    };
    media.addEventListener('change', resizeMode);
    return () => media.removeEventListener('change', resizeMode);
  }, [cinematic, reduced, storyProgress, localProgress]);
  const chooseView = (index: number) => { setView(index); controller.current?.setView(views[index].yaw, views[index].pitch); };
  return <div className={`product-stage ${className}`} ref={frame} data-device={device}>
    <div className="stage-top"><span>HẢI WI-FI / FPT TELECOM</span><span><i/>KHÁM PHÁ 360°</span></div>
    <div className="stage-viewport">
      <span className="stage-word" aria-hidden="true">{device === 'ecosystem' ? '3 IN 1' : device.startsWith('camera') ? 'AN TÂM' : device === 'play' ? 'PLAY' : 'WI-FI'}</span>
      <motion.div className="stage-orbit" style={reduced ? undefined : { rotate: orbit }} aria-hidden="true"><i/><b/></motion.div>
      <div className={`stage-canvas ${touchOrbit ? 'touch-orbit' : ''}`} ref={host} data-ready={ready} data-fallback={failed} role="img" aria-label={label}
        onPointerDown={event => { if (event.pointerType === 'touch' && !touchOrbit) return; drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={event => {
          const rect = event.currentTarget.getBoundingClientRect();
          if (!reduced && event.pointerType === 'mouse' && !drag.current) controller.current?.setPointer((event.clientX - rect.left) / rect.width - .5, (event.clientY - rect.top) / rect.height - .5);
          if (drag.current?.id === event.pointerId) { controller.current?.rotate((event.clientX - drag.current.x) * .012, (event.clientY - drag.current.y) * .01); drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }; setView(-1); }
        }} onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }} onPointerLeave={() => controller.current?.setPointer(0, 0)} />
      {!ready && <div className="stage-fallback"><img src="/images/wifi/combo-vvip-hai.png" alt="Internet, FPT Play và Camera FPT"/><span>{failed ? 'Khám phá combo FPT' : 'Đang chuẩn bị thiết bị…'}</span></div>}
      <span className="stage-caption">{device === 'ecosystem' ? 'Wi-Fi + FPT Play + tặng 01 camera' : 'Thiết bị minh họa'}<Move size={14}/></span>
    </div>
    <div className="stage-tools"><span className="stage-hint"><Move size={15}/>Kéo ngang / dọc để xem mọi góc</span><button className="stage-touch" disabled={!ready} type="button" aria-pressed={touchOrbit} onClick={() => setTouchOrbit(!touchOrbit)}>{touchOrbit ? <X size={15}/> : <Hand size={15}/>} {touchOrbit ? 'Cuộn trang' : 'Chạm để xoay'}</button><button className="stage-reset" disabled={!ready} type="button" onClick={() => chooseView(0)} aria-label={`Đặt lại góc nhìn ${label}`}><RotateCcw size={16}/></button></div>
    <div className="stage-views" role="group" aria-label={`Góc nhìn ${label}`}>{views.map((item, index) => <button key={item.name} disabled={!ready} type="button" onClick={() => chooseView(index)} aria-pressed={view === index}>{item.name}</button>)}</div>
  </div>;
}
