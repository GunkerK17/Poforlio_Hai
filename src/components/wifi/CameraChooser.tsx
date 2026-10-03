import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Check, Copy, Gift, House, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { wifiDevices } from '../../data/wifiDevices';
import type { CameraChoice } from '../../data/wifiExperience';
import { DeviceStage } from './DeviceStage';
import { registrationUrl } from '../../data/leadForm';

export function CameraChooser({ selected, onSelect }: { selected: CameraChoice | null; onSelect: (id: CameraChoice) => void }) {
  const [preview, setPreview] = useState<CameraChoice>('camera-indoor'), [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const reduced = useReducedMotion();
  const device = wifiDevices.find(item => item.id === preview)!;
  const selectedDevice = wifiDevices.find(item => item.id === selected);
  const switchCamera = () => setPreview(preview === 'camera-indoor' ? 'camera-outdoor' : 'camera-indoor');
  const copy = async () => {
    try { await navigator.clipboard.writeText(`Hải ơi, mình muốn đăng ký combo Wi-Fi + FPT Play 230k/tháng, nhận 01 ${selectedDevice?.title}. Nhờ Hải kiểm tra hạ tầng và tư vấn lắp đặt giúp mình.`); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  };
  return <section className="camera-choice wl-wrap" id="camera-choice" aria-labelledby="camera-title">
    <div className="camera-head"><p className="wl-kicker"><Gift size={16}/> QUÀ TẶNG TRONG COMBO 230K</p><h2 id="camera-title">Tặng 01 camera.<br/><em>Bạn chọn 1 trong 2.</em></h2><p>Chọn mẫu phù hợp với nhà mình. Combo vẫn là <strong>230k/tháng</strong>: Wi-Fi + FPT Play + một camera.</p></div>
    <div className="camera-layout">
      <div className="camera-view"><DeviceStage device={preview} label="Camera FPT"/><div className="camera-arrows"><button type="button" onClick={switchCamera} aria-label="Camera trước"><ArrowLeft size={20}/></button><span>{preview === 'camera-indoor' ? '01' : '02'} / 02</span><button type="button" onClick={switchCamera} aria-label="Camera tiếp theo"><ArrowRight size={20}/></button></div></div>
      <div className="camera-copy">
        <div className="camera-options" role="group" aria-label="Xem hai mẫu camera">
          {(['camera-indoor', 'camera-outdoor'] as const).map((id, index) => { const item = wifiDevices.find(device => device.id === id)!; const Icon = index ? ShieldCheck : House; return <button type="button" key={id} aria-pressed={preview === id} onClick={() => setPreview(id)}><Icon size={23}/><span><small>{index ? 'CHO KHÔNG GIAN NGOÀI TRỜI' : 'CHO KHÔNG GIAN TRONG NHÀ'}</small><strong>{item.title}</strong></span>{selected === id ? <Check size={18}/> : <ArrowUpRight size={18}/>}</button>; })}
        </div>
        <AnimatePresence mode="wait"><motion.div className="camera-specs" key={preview} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : .22 }}>
          <p className="wl-kicker">{preview === 'camera-indoor' ? 'GẦN NHÀ, DÙ BẠN Ở ĐÂU' : 'THÊM MỘT GÓC NHÌN AN TÂM'}</p><h3>{device.title}</h3><p>{device.description}</p><ul>{device.tags.map(tag => <li key={tag}><Check size={15}/>{tag}</li>)}</ul>
          <button type="button" className="wf-btn camera-select" onClick={() => { onSelect(preview); setCopyState('idle'); }}>{selected === preview ? <Check size={18}/> : <Camera size={18}/>} {selected === preview ? `Đã chọn ${device.title}` : `Tôi chọn ${device.title}`}</button>
        </motion.div></AnimatePresence>
        <div className={`camera-confirm ${selected ? 'has-selection' : ''}`} aria-live="polite">
          {selectedDevice ? <><span><Check size={17}/>Bạn chọn <strong>{selectedDevice.title}</strong></span><p>01 camera · Wi-Fi + FPT Play · <b>230k/tháng</b></p><div><a className="wf-btn" href={registrationUrl('camera', selected!)}>Điền thông tin tư vấn <ArrowUpRight size={16}/></a><button type="button" onClick={copy} className="copy-request"><Copy size={15}/>{copyState === 'copied' ? 'Đã sao chép' : 'Sao chép yêu cầu Zalo'}</button></div><small>{copyState === 'failed' ? `Bạn nhắn Hải: combo 230k + ${selectedDevice.title}.` : 'Mẫu camera đã chọn sẽ được ghi sẵn trong form.'}</small></> : <p>Chọn một mẫu phía trên để chuẩn bị yêu cầu tư vấn.</p>}
        </div>
        <p className="camera-terms">Tặng một camera trong combo, không phải cả hai. Hải xác nhận vị trí lắp và lưu trữ trước khi đăng ký.</p>
      </div>
    </div>
  </section>;
}
