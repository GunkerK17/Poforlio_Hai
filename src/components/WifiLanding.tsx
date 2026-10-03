import { useReducedMotion } from '../hooks/useReducedMotion';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, ArrowLeft, ArrowDown, Check, Phone, MapPin, MessageCircle, Gift, Wifi, Camera, Tv, Film, MonitorPlay, Users, Send, CalendarCheck } from 'lucide-react';
import type Lenis from 'lenis';
import { profileData } from '../data/profile';
import { wifiPlans } from '../data/wifiPlans';
import { wifiStory, type CameraChoice } from '../data/wifiExperience';
import { wifiDevices } from '../data/wifiDevices';
import { MotionGraphics } from './MotionGraphics';
import { ProductShowcase } from './wifi/ProductShowcase';
import { DeviceStage } from './wifi/DeviceStage';
import { CameraChooser } from './wifi/CameraChooser';
import { WifiFooter } from './wifi/WifiFooter';
import { ThemeToggle } from './ui/ThemeToggle';
import { registrationUrl } from '../data/leadForm';
import 'lenis/dist/lenis.css';
import './wifi-landing.css';

export default function WifiLanding() {
  const contact = profileData.contact, reduced = useReducedMotion();
  const intro = useRef<HTMLElement>(null), smoothScroll = useRef<Lenis | null>(null);
  const [phase, setPhase] = useState(0), [selectedCamera, setSelectedCamera] = useState<CameraChoice | null>(null);
  const { scrollYProgress } = useScroll({ target: intro, offset: ['start start', 'end end'] });
  const story = wifiStory[phase];
  const chosenCamera = wifiDevices.find(item => item.id === selectedCamera);
  useMotionValueEvent(scrollYProgress, 'change', value => { if (window.innerWidth > 700 && !reduced) setPhase(value < .37 ? 0 : value < .74 ? 1 : 2); });
  useEffect(() => {
    const previous = document.title;
    document.title = 'Hải Wi-Fi · Internet FPT Cần Thơ · 195k / 220k / 230k';
    let cancelled = false, generation = 0;
    const media = matchMedia('(min-width: 701px)');
    const configure = () => {
      const requestedGeneration = ++generation;
      smoothScroll.current?.destroy(); smoothScroll.current = null;
      if (reduced || !media.matches) return;
      import('lenis').then(({ default: Lenis }) => {
        if (!cancelled && generation === requestedGeneration && media.matches) smoothScroll.current = new Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true, anchors: { offset: -100 } });
      });
    };
    configure(); media.addEventListener('change', configure);
    return () => { cancelled = true; media.removeEventListener('change', configure); smoothScroll.current?.destroy(); smoothScroll.current = null; document.title = previous; };
  }, [reduced]);
  const goToPhase = (index: number) => {
    setPhase(index);
    if (!intro.current || window.innerWidth <= 700 || reduced) return;
    const top = intro.current.getBoundingClientRect().top + window.scrollY;
    const target = top + (intro.current.offsetHeight - window.innerHeight) * wifiStory[index].point;
    if (smoothScroll.current) smoothScroll.current.scrollTo(target, { duration: .9 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };
  return <div className="wl wl-compact wl-showroom wl-experience">
    <MotionGraphics/>
    <header className="wl-nav">
      <a href="/" className="wl-brand wl-brand-lockup"><img src={`${import.meta.env.BASE_URL}brand/hai-wifi.svg`} alt=""/><span>HẢI WI-FI<small>TƯ VẤN INTERNET FPT</small></span></a>
      <nav aria-label="Điều hướng Wi-Fi"><a href="#pricing">Gói cước</a><a href="#camera-choice">Chọn camera</a><a href="#location">FPT Cần Thơ</a></nav>
      <div className="header-actions"><ThemeToggle/><a href={registrationUrl()} className="wl-nav-cta">Đăng ký <ArrowUpRight size={16}/></a></div>
    </header>
    <main>
      <section className="wf-scrollytelling" ref={intro} aria-label="Khám phá Internet, FPT Play và Camera">
        <div className="wf-intro wl-wrap">
          <div className="story-copy">
            <a className="wl-back" href="/#products"><ArrowLeft size={14}/>Về portfolio của Hải</a>
            <p className="wl-kicker"><MapPin size={14}/> INTERNET FPT · CẦN THƠ</p>
            <div className="story-text" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={phase} initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reduced ? 0 : .24 }}>
              <h1>{story.title}<br/><em>{story.accent}</em></h1><p className="wf-intro-text">{story.description}</p><div className="story-offer"><strong>{story.price}</strong><span>{story.offer}</span></div>
            </motion.div></AnimatePresence></div>
            <div className="wf-intro-bottom"><a href={phase === 2 ? '#camera-choice' : '#pricing'} className="wf-btn">{phase === 2 ? 'Chọn camera được tặng' : 'Xem gói phù hợp'} <ArrowUpRight size={17}/></a><a href={`tel:${contact.phone}`} className="wf-phone"><Phone size={15}/>{contact.phoneFormatted}</a></div>
            <a className="wf-registration-link" href={registrationUrl()}>Để lại nhu cầu, Hải tư vấn <ArrowUpRight size={14}/></a>
            <div className="wf-quick-prices">{wifiPlans.map(plan => <a key={plan.id} href={plan.id === 'camera' ? '#camera-choice' : '#pricing'}><strong>{plan.price}<span>k</span></strong><span>{plan.name}</span><small>/ tháng</small></a>)}</div>
            <div className="story-tabs" role="group" aria-label="Các bước khám phá FPT">{wifiStory.map((item, index) => <button key={item.name} type="button" aria-pressed={phase === index} onClick={() => goToPhase(index)}><span>0{index + 1}</span>{item.name}<i/></button>)}</div>
            <a className="wf-scroll-cue" href="#fpt-play"><span><ArrowDown size={15}/></span>Cuộn để khám phá trọn bộ thiết bị</a>
          </div>
          <ProductShowcase progress={scrollYProgress} phase={phase} onPhaseChange={goToPhase}/>
        </div>
      </section>
      <section className="play-section wl-wrap" id="fpt-play" aria-labelledby="play-title">
        <div className="play-copy"><p className="wl-kicker"><Tv size={16}/> 02 / GIẢI TRÍ CHO CẢ NHÀ</p><h2 id="play-title">Từ kết nối.<br/><em>Đến những phút vui.</em></h2><p>Thêm FPT Play để cả nhà cùng xem chương trình mình thích. Kết hợp Wi-Fi trong một gói, từ <strong>220k/tháng.</strong></p><div className="play-benefits">{[{ Icon: Film, text: 'Phim & truyền hình' }, { Icon: Users, text: 'Giải trí gia đình' }, { Icon: MonitorPlay, text: 'Xem trên thiết bị phù hợp' }].map(({ Icon, text }) => <span key={text}><Icon size={19}/>{text}</span>)}</div><a className="wf-btn" href={contact.zaloUrl} target="_blank" rel="noopener noreferrer">Tư vấn Wi-Fi + FPT Play <ArrowUpRight size={17}/></a><small>Quyền xem theo gói đăng ký. Box được tư vấn riêng nếu cần.</small></div>
        <DeviceStage device="play" label="FPT Play Box, remote và TV" className="play-stage"/>
      </section>
      <CameraChooser selected={selectedCamera} onSelect={setSelectedCamera}/>
      <section id="pricing" className="wf-pricing wl-wrap" aria-labelledby="wifi-pricing-title">
        <div className="wf-head"><div><p className="wl-kicker">GIÁ RÕ RÀNG · CHỌN THEO NHU CẦU</p><h2 id="wifi-pricing-title">3 gói chính.<br/><span>Nhà mình cần gói nào?</span></h2></div><span className="wf-monthly">Cước theo tháng</span></div>
        <div className="wf-plans">{wifiPlans.map((plan, index) => <article className={`wf-plan ${index === 2 ? 'wf-plan-featured' : ''}`} key={plan.id}>
          <div className="wf-plan-top"><span className="wf-plan-icon"><plan.Icon size={25}/></span><span>{plan.label}</span><small>0{index + 1}</small></div>
          {index === 2 && <span className="wf-plan-badge"><Gift size={12}/>Tặng 01 camera · chọn 1 trong 2</span>}
          <h3>{plan.name}</h3><p className="wf-price"><strong>{plan.price}<span>k</span></strong><span>/ tháng</span></p>
          <ul>{plan.features.map(text => <li key={text}><Check size={15}/>{text}</li>)}</ul>
          {index === 2 && <p className="plan-camera-picked" aria-live="polite">{chosenCamera ? `Bạn đã chọn: ${chosenCamera.title}` : 'Play 4 hoặc IQ 4S — bạn chọn mẫu được tặng.'}</p>}
          <a className="wf-btn" href={index === 2 ? '#camera-choice' : registrationUrl(plan.id)}>{index === 2 ? chosenCamera ? 'Xem camera đã chọn' : 'Chọn camera & tư vấn' : `Tư vấn gói ${plan.price}k`} <ArrowUpRight size={17}/></a>
        </article>)}</div>
        <details id="questions" className="wf-details"><summary>Chi phí lắp đặt & những thông tin cần biết <span>+</span></summary><div>
          <p><strong>Lắp đặt: 300.000đ.</strong> Có thể hỗ trợ 100.000–300.000đ; Hải xác nhận mức áp dụng theo từng trường hợp.</p>
          <p><strong>Đóng trước 12 tháng?</strong> Tổng cước trước hỗ trợ: Wi-Fi 2.340.000đ · Wi-Fi + FPT Play 2.640.000đ · Wi-Fi + FPT Play + Cam 2.760.000đ. Nhắn Hải để biết hỗ trợ và tổng thanh toán.</p>
          <p><strong>Quà tặng camera:</strong> Combo 230k tặng 01 camera. Bạn chọn Camera Play 4 hoặc Camera IQ 4S; không nhận đồng thời cả hai. Hải xác nhận vị trí lắp và điều kiện lưu trữ trước khi đăng ký.</p>
          <p><strong>FPT Play:</strong> Quyền xem theo gói đăng ký; Box được tư vấn riêng nếu cần.</p>
          <p>Gói áp dụng, VAT, hỗ trợ lắp đặt và phí phát sinh được xác nhận theo địa chỉ, chính sách tại thời điểm đăng ký. Thiết bị 3D là hình minh họa theo mẫu bạn đang xem.</p>
          <a href="/images/wifi/combo-vvip-hai.png" target="_blank" rel="noopener noreferrer">Xem poster combo FPT <ArrowUpRight size={14}/></a>
        </div></details>
      </section>
      <section className="setup-section wl-wrap" aria-labelledby="setup-title"><div><p className="wl-kicker">BẠN CHỌN NHU CẦU · HẢI LO TƯ VẤN</p><h2 id="setup-title">Bắt đầu thật đơn giản.</h2></div><div className="setup-steps">{[{ Icon: Send, title: 'Gửi địa chỉ', text: 'Nhắn Hải khu vực muốn lắp.' }, { Icon: Wifi, title: 'Kiểm tra & chọn gói', text: 'Kiểm tra hạ tầng, tư vấn theo nhu cầu.' }, { Icon: CalendarCheck, title: 'Hẹn lịch lắp', text: 'Xác nhận chi phí và lịch phù hợp.' }].map(({ Icon, title, text }, index) => <div key={title}><span>0{index + 1}</span><Icon size={23}/><h3>{title}</h3><p>{text}</p></div>)}</div></section>
      <section id="other-services" className="wf-other wl-wrap"><div><p className="wl-kicker">CÒN NHIỀU LỰA CHỌN KHÁC</p><h2>Bạn cần thêm dịch vụ?</h2><p>Camera riêng, FPT Play hoặc giải pháp Wi-Fi cho nhiều thiết bị. Mình trao đổi theo nhu cầu của bạn.</p></div><div className="wf-other-links">{[{ Icon: Camera, name: 'Camera' }, { Icon: Tv, name: 'FPT Play' }, { Icon: Wifi, name: 'Giải pháp Wi-Fi' }].map(({ Icon, name }) => <a key={name} href={contact.zaloUrl} target="_blank" rel="noopener noreferrer"><Icon size={18}/>{name}<ArrowUpRight size={14}/></a>)}</div></section>
      <section className="wf-bottom wl-wrap"><div><p className="wl-kicker">NHÀ MÌNH SẴN SÀNG KẾT NỐI?</p><h2>Chọn gói của bạn.<br/><span>Phần còn lại, cứ nhắn Hải.</span></h2></div><a className="wf-btn" href={contact.zaloUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Tư vấn qua Zalo <ArrowUpRight size={16}/></a></section>
    </main>
    <WifiFooter/>
  </div>;
}
