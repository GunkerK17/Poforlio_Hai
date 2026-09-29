import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, MapPin, Menu, X, Check, Wifi, Tv, Camera, Mail, Phone, UserRound, GraduationCap, BriefcaseBusiness, Trophy, Users, CalendarDays, Youtube, Facebook, Instagram, Music2 } from 'lucide-react';

import { profileContent } from './data/profileContent';
import { skillsData } from './data/skills';
import { projectsData } from './data/projects';
import { AuthenticPhoto } from './components/ui/AuthenticPhoto';
import './portfolio.css';
import { IntroHero } from './components/hero/IntroHero';
import { WorkSections } from './components/WorkSections';
import { Story } from './components/story/Story';


const workstation = 'att.z4FaEGg355ZZkQ2bUWi6vR2Sn2nxXhDkf_KXj08dQZw.jpg';
const links = [['Trang chủ', 'home'], ['Về tôi', 'story'], ['Kỹ năng', 'skills'], ['Dự án', 'projects'], ['Dịch vụ', 'products'], ['Nhật ký', 'content']];
const moments = [
  { image: 'IMG_7935.JPG', category: 'Bóng đá', title: 'Cùng đồng đội, cùng tiến bộ.', body: 'Những buổi trao đổi chiến thuật và những bài học về tinh thần đồng đội trên sân cỏ.' },
  { image: workstation, category: 'Công nghệ', title: 'Từ một ý tưởng đến dòng code.', body: 'Góc làm việc và hành trình xây dựng ManageField — nơi tình yêu bóng đá gặp công nghệ.' },
  { image: 'IMG_9161.JPG', category: 'Công việc', title: 'Một cột mốc. Một khởi đầu mới.', body: 'Khoảnh khắc tốt nghiệp Đại học FPT Cần Thơ, mở ra hành trình làm việc và học hỏi tiếp theo.' },
  { image: 'IMG_3698.JPG', category: 'Cuộc sống', title: 'Hết giờ làm, mình lại ra sân.', body: 'Bóng đá vẫn luôn là một phần trong cuộc sống của mình. Giữ đam mê, giữ nhịp sống và tiếp tục tiến về phía trước.' },
];
type Detail = { title: string; image: string; body: string[]; category: string };
function Photo({ name, className = '', priority = false }: { name: string; className?: string; priority?: boolean }) {
  return <AuthenticPhoto photoKey={name} aspectRatio="custom" className={`photo ${className}`} priority={priority} />;
}
function Label({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p>; }
function Dialog({ children, close, title }: { children: React.ReactNode; close: () => void; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; ref.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const items = ref.current?.querySelectorAll<HTMLElement>('button, a[href], input, textarea, select');
        if (!items?.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (document.activeElement === last || document.activeElement === ref.current)) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', key); previous?.focus(); };
  }, [close]);
  return <div className="dialog-backdrop" onClick={e => { if (e.target === e.currentTarget) close(); }}><div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className="dialog"><button className="dialog-close" onClick={close} aria-label="Đóng"><X /></button>{children}</div></div>;
}
export default function App() {
  const profile = profileContent;
  const [menu, setMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const closeProfile = React.useCallback(() => setProfileOpen(false), []);
  const [detail, setDetail] = useState<Detail | null>(null), [filter, setFilter] = useState('Tất cả');
  const closeDetail = React.useCallback(() => setDetail(null), []);
  const shortName = profile.name.trim().split(/\s+/).pop();
  const journey = [
    { image: 'IMG_9587.JPG', tag: 'Khởi đầu', title: 'Bắt đầu với bóng đá', body: 'Những bước chạy đầu tiên, nuôi dưỡng tình yêu với trái bóng tròn.' },
    { image: 'IMG_5663.JPG', tag: `${profile.yearsInFootball} năm`, title: 'Thi đấu chuyên nghiệp', body: `Rèn luyện bản lĩnh và kỷ luật tại ${profile.footballClub}.` },
    { image: 'IMG_9161.JPG', tag: 'Trưởng thành', title: 'Bước vào công nghệ', body: profile.university },
    { image: 'IMG_3698.JPG', tag: 'Hiện tại', title: 'Công việc & đam mê', body: `${profile.currentCompany}. Tiếp tục sống cùng bóng đá.` },
  ];
  return <>
    <header className="site-header"><div className="wrap nav-inner"><a className="brand brand-lockup" href="#home" aria-label="GUN — Trang chủ"><span className="brand-word">GUN<small>NGUYỄN CHÍ HẢI</small></span></a><nav aria-label="Điều hướng chính" className={menu ? 'navigation open' : 'navigation'}>{links.map(([text, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{text}</a>)}<button className="profile-nav" onClick={() => { setMenu(false); setProfileOpen(true); }}><UserRound size={15} /><span>Hồ sơ</span></button></nav><a href={profile.contact.zaloUrl} target="_blank" rel="noopener noreferrer" className="button small nav-contact">Kết nối với tôi <ArrowUpRight size={15} /></a><button className="menu-toggle" aria-label={menu ? 'Đóng menu' : 'Mở menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div></header>
    <main>
      <IntroHero />
      <Story />
      <WorkSections />
      <section id="content" className="section light"><div className="wrap"><div className="section-heading"><div><Label>06 / NHẬT KÝ / LIFE</Label><h2>Những khoảnh khắc<br />đáng nhớ.</h2></div><div className="filters" role="group" aria-label="Lọc nhật ký">{['Tất cả', 'Bóng đá', 'Công nghệ', 'Công việc', 'Cuộc sống'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div></div><div className="moments-grid">{moments.filter(m => filter === 'Tất cả' || m.category === filter).map(m => <button key={m.title} className="moment" onClick={() => setDetail({ ...m, body: [m.body] })}><div className="moment-image"><Photo name={m.image} /><span><ArrowUpRight size={20} /></span></div><span className="moment-category">{m.category}</span><h3>{m.title}</h3></button>)}</div></div></section>
      <section id="contact" className="contact dark"><Photo name="IMG_7934.JPG" className="contact-background" /><div className="wrap contact-layout"><div><Label>07 / KẾT NỐI VỚI TÔI</Label><h2>Cùng nói chuyện nhé<span>?</span></h2><p>Một ý tưởng mới, một trận bóng hay,<br />hay đơn giản là một lời chào.</p></div><div className="contact-links"><a className="button" href={profile.contact.zaloUrl} target="_blank" rel="noreferrer">Nhắn cho mình qua Zalo <ArrowUpRight size={18} /></a><a href={`tel:${profile.contact.phone}`}><Phone size={16} />{profile.contact.phoneFormatted}</a><a href={`mailto:${profile.contact.email}`}><Mail size={16} />{profile.contact.email}</a><div className="personal-socials"><a href={profile.contact.youtubeUrl} target="_blank" rel="noopener noreferrer"><Youtube size={18}/><span>YouTube</span><ArrowUpRight size={13}/></a><a href={profile.contact.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook size={18}/><span>Facebook</span><ArrowUpRight size={13}/></a><a href={profile.contact.tiktokUrl} target="_blank" rel="noopener noreferrer"><Music2 size={18}/><span>TikTok</span><ArrowUpRight size={13}/></a><a href={profile.contact.instagramUrl} target="_blank" rel="noopener noreferrer"><Instagram size={18}/><span>Instagram</span><ArrowUpRight size={13}/></a></div></div></div></section>
    </main><footer><div className="wrap footer-inner"><div><a href="#home" className="brand">{profile.nickname}<span>.</span></a><p>FOOTBALL · TECH · LIFE</p></div><p>© {new Date().getFullYear()} {profile.name}<br />Made with passion in Cần Thơ.</p><a className="back-top" href="#home" aria-label="Về đầu trang"><ArrowUpRight /></a></div></footer>
    {profileOpen && <Dialog close={closeProfile} title="Hồ sơ Nguyễn Chí Hải"><div className="identity-profile"><div className="identity-cover"><img src="/images/journey-university-capstone.jpg" alt="Nguyễn Chí Hải tại buổi bảo vệ đồ án Đại học FPT"/><div className="identity-cover-shade"/><span className="identity-brand">GUN<span>.</span></span><div className="identity-cover-caption"><span>FOOTBALL / BUSINESS / LIFE</span><p>Không ngừng học hỏi.<br/>Luôn giữ đam mê.</p></div></div><div className="identity-content"><p className="identity-kicker">HỒ SƠ CÁ NHÂN</p><h2>{profile.name}</h2><p className="identity-role">Kinh doanh tại FPT Telecom<br/>Coach bóng đá cộng đồng</p><div className="identity-meta"><span><CalendarDays size={15}/><time dateTime="2003-10-11">{profile.birthDate}</time></span><span><MapPin size={15}/>Cần Thơ</span></div><div className="identity-facts">{[{Icon:Trophy,label:'NỀN TẢNG',title:'6 năm tập luyện bóng đá',text:'CLB An Giang'},{Icon:GraduationCap,label:'HỌC VẤN',title:'Tốt nghiệp Đại học FPT Cần Thơ',text:'Ngành Kỹ thuật phần mềm'},{Icon:BriefcaseBusiness,label:'CÔNG VIỆC',title:'Kinh doanh',text:'FPT Telecom Cần Thơ'},{Icon:Users,label:'ĐAM MÊ',title:'Coach lớp bóng đá cộng đồng',text:'Đồng hành, hướng dẫn và truyền đam mê'}].map(({Icon,label,title,text}) => <div className="identity-fact" key={label}><span className="identity-icon"><Icon size={20}/></span><div><span className="identity-label">{label}</span><h3>{title}</h3><p>{text}</p></div></div>)}</div><div className="personal-socials"><a href={profile.contact.youtubeUrl} target="_blank" rel="noopener noreferrer"><Youtube size={18}/><span>YouTube</span><ArrowUpRight size={13}/></a><a href={profile.contact.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook size={18}/><span>Facebook</span><ArrowUpRight size={13}/></a><a href={profile.contact.tiktokUrl} target="_blank" rel="noopener noreferrer"><Music2 size={18}/><span>TikTok</span><ArrowUpRight size={13}/></a><a href={profile.contact.instagramUrl} target="_blank" rel="noopener noreferrer"><Instagram size={18}/><span>Instagram</span><ArrowUpRight size={13}/></a></div><div className="identity-actions"><a className="button" href={profile.contact.zaloUrl} target="_blank" rel="noopener noreferrer">Kết nối qua Zalo <ArrowUpRight size={16}/></a><a className="identity-call" href={`tel:${profile.contact.phone}`}><Phone size={16}/>{profile.contact.phoneFormatted}</a></div></div></div></Dialog>}
    {detail && <Dialog close={closeDetail} title={detail.title}><Photo name={detail.image} className="detail-image" /><div className="detail-body"><Label>{detail.category}</Label><h2>{detail.title}</h2>{detail.body.map((p, i) => <p key={i}>{p}</p>)}<a className="button" href={profile.contact.zaloUrl} target="_blank" rel="noreferrer">Kết nối với Hải <ArrowUpRight size={16} /></a></div></Dialog>}
  </>;
}


