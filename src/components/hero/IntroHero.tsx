import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Code2, GraduationCap, MapPin, Trophy, Wifi } from 'lucide-react';
import { profileContent as profile } from '../../data/profileContent';
import { SocialLinks } from '../ui/SocialLinks';
import { CvLinks } from '../ui/CvLinks';

export function IntroHero() {
  const reduced = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, -9]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const mouseX = useMotionValue(0), mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 90, damping: 24 });
  const y = useSpring(mouseY, { stiffness: 90, damping: 24 });
  const depthX = useTransform(y, [-16, 16], [3, -3]);
  const depthY = useTransform(x, [-24, 24], [-5, 5]);
  const watermarkX = useTransform(x, value => -value * .65);
  const entrance = (delay: number) => ({
    initial: reduced ? false as const : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .75, delay: reduced ? 0 : delay },
  });
  return <section id="home" ref={hero} className="gun-hero" aria-labelledby="hero-title">
    <div className="hero-ambient" aria-hidden="true"><span /><span /></div>
    <div className="wrap gun-hero-grid">
      <div className="gun-hero-copy">
        <motion.p className="hero-location" {...entrance(.08)}><span className="status-dot" /><MapPin size={13} /> CẦN THƠ, VIỆT NAM</motion.p>
        <motion.p className="hero-greeting" {...entrance(.15)}>Xin chào, mình là <strong>{profile.name}.</strong></motion.p>
        <h1 id="hero-title" aria-label="Bạn có thể gọi mình là Gun.">
          <motion.span className="hero-title-small" {...entrance(.23)}>Bạn có thể gọi mình là</motion.span>
          <span className="hero-name" aria-hidden="true">{'GUN.'.split('').map((letter, i) => <motion.span key={i} initial={reduced ? false : { opacity: 0, y: 70, rotate: 8, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }} transition={{ duration: .85, delay: .25 + i * .09 }}>{letter}</motion.span>)}</span>
        </h1>
        <motion.p className="hero-role" {...entrance(.5)}>Kinh doanh FPT Telecom <span>/</span> Coach bóng đá</motion.p>
        <motion.p className="hero-description" {...entrance(.58)}>Từ sân cỏ đến công nghệ, mình mang tinh thần đồng đội vào mọi việc. Hiện mình tư vấn Internet FPT và hướng dẫn các cầu thủ nhí tại Cần Thơ.</motion.p>
        <motion.div className="hero-actions" {...entrance(.65)}>
          <a className="button" href="#products">Mình cần lắp Wi-Fi <ArrowUpRight size={18} /></a>
          <a className="button outline" href="#football">Tìm lớp bóng đá <ArrowUpRight size={18} /></a>
        </motion.div>
        <motion.div className="hero-cv-row" {...entrance(.69)}><CvLinks/></motion.div>
        <motion.div className="hero-social-row" {...entrance(.72)}><span>KẾT NỐI VỚI MÌNH</span><SocialLinks compact /></motion.div>
        <motion.div className="hero-facts" {...entrance(.8)}>
          <div><Trophy size={18} /><strong>06<span>năm</span></strong><p>Nền tảng bóng đá<br />tại CLB An Giang</p></div>
          <div><GraduationCap size={18} /><strong>FPT<span>University</span></strong><p>Tốt nghiệp ngành<br />Kỹ thuật phần mềm</p></div>
          <div><Wifi size={18} /><strong>FPT<span>Telecom</span></strong><p>Kinh doanh & tư vấn<br />giải pháp Internet</p></div>
        </motion.div>
      </div>
      <motion.div className="hero-portrait-stage" ref={stage} {...entrance(.25)} onPointerMove={event => {
        if (reduced || event.pointerType !== 'mouse') return;
        const rect = stage.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(((event.clientX - rect.left) / rect.width - .5) * 48);
        mouseY.set(((event.clientY - rect.top) / rect.height - .5) * 32);
      }} onPointerLeave={() => { mouseX.set(0); mouseY.set(0); }} onPointerCancel={() => { mouseX.set(0); mouseY.set(0); }}>
        <motion.span className="hero-watermark" style={reduced ? undefined : { x: watermarkX }} aria-hidden="true">18</motion.span>
        <motion.div className="portrait-orbit" style={reduced ? undefined : { y: scrollY, rotate: scrollRotate }} aria-hidden="true"><span className="orbit-track" /><span className="orbit-dashed" /><span className="orbit-dot" /></motion.div>
        <motion.div className="hero-portrait-motion" style={reduced ? undefined : { y: scrollY, scale: scrollScale }}>
          <motion.img className="hero-portrait" style={reduced ? undefined : { x, y, rotateX: depthX, rotateY: depthY }} src="/images/hero-player-cutout.png" alt="Hải trong trang phục bóng đá, cùng trái bóng và áo số 18" fetchPriority="high" />
        </motion.div>
        <div className="portrait-label portrait-label-top"><span className="portrait-label-icon"><Trophy size={19} /></span><div><small>ĐAM MÊ TRÊN SÂN CỎ</small><strong>Football is my roots.</strong></div></div>
        <div className="portrait-label portrait-label-bottom"><span className="portrait-label-icon"><Code2 size={19} /></span><div><small>TỪ ĐAM MÊ ĐẾN CÔNG VIỆC</small><strong>Luôn học. Luôn tiến lên.</strong></div><ArrowUpRight size={18}/></div>
        <span className="portrait-caption">NGUYỄN CHÍ HẢI <span>—</span> FOOTBALL / TECH / LIFE</span>
      </motion.div>
    </div>
    <div className="wrap hero-bottom"><a href="#services"><span className="scroll-mouse"><i /></span>Cuộn xuống để hiểu mình hơn <ArrowDown size={15}/></a><span>ĐAM MÊ TẠO NÊN KẾT NỐI <span className="tiny-star">✳</span></span></div>
  </section>;
}
