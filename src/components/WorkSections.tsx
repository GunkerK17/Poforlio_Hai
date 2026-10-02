import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUpRight, Check, Wifi, Tv, Camera, Phone } from 'lucide-react';
import { skillsData } from '../data/skills';
import { showcase } from '../data/showcase';
import { profileData as profile } from '../data/profile';
import './work-sections.css';
import { WifiPlanSummary } from './ui/WifiPlanSummary';

function ProjectDetail({ project, close }: { project: typeof showcase[number]; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.showModal();
    return () => { ref.current?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  const descriptions: Record<string, string[]> = {
    football: ['Huấn luyện bóng đá thiếu nhi tại Cần Thơ.', 'Chia sẻ kỹ thuật xử lý bóng, tư duy chơi bóng và tinh thần đồng đội từ kinh nghiệm thi đấu.'],
    technology: ['ManageField là dự án kết hợp công nghệ với nhu cầu quản lý sân bóng.', 'Tập trung vào giao diện web, đặt sân và kết nối dữ liệu qua API.'],
    sales: ['Công việc kinh doanh và tư vấn tại FPT Telecom Cần Thơ.', 'Lắng nghe nhu cầu sử dụng Internet, truyền hình và camera để trao đổi giải pháp phù hợp.'],
    content: ['Ghi lại câu chuyện từ sân bóng, học tập và công việc.', 'Video và các sản phẩm nội dung thương hiệu sẽ được bổ sung tại đây khi sẵn sàng.'],
  };
  return createPortal(<dialog ref={ref} className="work-dialog" onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if(e.target === e.currentTarget) close(); }} aria-labelledby="work-detail-title"><button className="work-close" onClick={close} aria-label="Đóng chi tiết dự án"><X size={22}/></button><img className="work-detail-photo" src={`/images/${project.image}`} alt={project.title}/><div className="work-detail-copy"><p className="eyebrow">{project.category} / DỰ ÁN & HOẠT ĐỘNG</p><h2 id="work-detail-title">{project.title}</h2>{descriptions[project.id].map(text => <p key={text}>{text}</p>)}<div className="work-detail-links">{project.resources.length ? project.resources.map(r => <a className="button" key={r.url} href={r.url} target="_blank" rel="noopener noreferrer">{r.title}<ArrowUpRight size={16}/></a>) : <span>Video / liên kết sản phẩm đang được cập nhật.</span>}</div>{project.id === 'sales' && <a className="button" href={profile.contact.zaloUrl} target="_blank" rel="noopener noreferrer">Trao đổi với Hải qua Zalo <ArrowUpRight size={16}/></a>}</div></dialog>, document.body);
}

export function WorkSections() {
  const [selected, setSelected] = useState<typeof showcase[number] | null>(null);
  const serviceRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = serviceRef.current;
    if (!section || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        section.classList.add('wifi-in-view');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    section.classList.add('wifi-reveal-ready');
    observer.observe(section);
    return () => { observer.disconnect(); section.classList.remove('wifi-reveal-ready'); };
  }, []);
  const resetTilt = () => {
    const panel = panelRef.current;
    if (panel) { panel.style.setProperty('--tilt-x', '0deg'); panel.style.setProperty('--tilt-y', '0deg'); }
  };

  return <>
    <section id="skills" className="section dark capabilities"><div className="wrap">
      <div className="section-heading"><div><p className="eyebrow">03 / KỸ NĂNG</p><h2>Bốn thế mạnh.<br />Một tinh thần hết mình.</h2></div><a href="#projects" className="capabilities-link">Xem sản phẩm & hoạt động <ArrowUpRight size={18} /></a></div>
      <div className="capability-grid">{skillsData.map(s => <article key={s.id}><span className="capability-number">{s.number}</span><h3>{s.name}</h3><p>{s.description}</p><ul>{s.subSkills.map(t => <li key={t}><Check size={15} />{t}</li>)}</ul></article>)}</div>
    </div></section>
    <section id="projects" className="section light showcase-section"><div className="wrap">
      <div className="section-heading"><div><p className="eyebrow">04 / DỰ ÁN & HOẠT ĐỘNG</p><h2>Từ kỹ năng đến thực tế.</h2></div><p className="showcase-intro">Những việc mình làm, những điều mình đang xây dựng.</p></div>
      <div className="showcase-grid">{showcase.map((p,index) => <article key={p.id} id={`work-${p.id}`}><button className="showcase-open" onClick={() => setSelected(p)} aria-label={`Xem chi tiết ${p.title}`}><div className="showcase-photo"><img src={`/images/${p.image}`} alt={p.title} loading="lazy" /><span>{p.category}</span><b className="showcase-index">0{index+1}</b></div><div className="showcase-copy"><h3>{p.title}</h3><p>{p.description}</p><div className="showcase-actions"><span>Xem câu chuyện</span><ArrowUpRight size={19}/></div></div></button></article>)}</div>
      {selected && <ProjectDetail project={selected} close={() => setSelected(null)}/>}
    </div></section>
    <section ref={serviceRef} id="products" className="wifi-section dark"><div className="wrap wifi-layout"><div className="wifi-copy"><p className="eyebrow">05 / INTERNET FPT · CẦN THƠ</p><h2>Nhà cần Wi-Fi?<br /><span>Cứ nhắn Hải.</span></h2><p>Học tập, làm việc hay giải trí — mình giúp bạn chọn giải pháp Internet phù hợp với căn nhà và nhu cầu sử dụng.</p><WifiPlanSummary /><ul><li><Check size={16} />Tư vấn theo số thiết bị và không gian nhà</li><li><Check size={16} />Kiểm tra hạ tầng tại địa chỉ lắp đặt</li><li><Check size={16} />Trao đổi gói cước, chi phí trước khi đăng ký</li></ul><div className="wifi-actions"><a className="button" href="/wifi">Xem gói cước & ưu đãi <ArrowUpRight size={18}/></a><a className="button" href={profile.contact.zaloUrl} target="_blank" rel="noopener noreferrer">Tư vấn lắp Wi-Fi qua Zalo <ArrowUpRight size={18} /></a><a className="wifi-phone" href={`tel:${profile.contact.phone}`}><Phone size={16} />{profile.contact.phoneFormatted}</a></div></div><div className="wifi-panel" ref={panelRef} onPointerLeave={resetTilt} onPointerCancel={resetTilt} onPointerMove={event => {
      if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const panel = panelRef.current;
      if (!panel) return;
      const bounds = panel.getBoundingClientRect();
      const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
      panel.style.setProperty('--tilt-x', `${-y * 7}deg`);
      panel.style.setProperty('--tilt-y', `${x * 9}deg`);
    }}><img className="wifi-office-photo wifi-device-photo" src="/images/fpt-home-devices.jpg" alt="Bộ thiết bị FPT gồm modem Wi-Fi, FPT Play và camera" loading="lazy"/><a className="wifi-poster-mini" href="/images/fpt-combo-poster.jpg" target="_blank" rel="noopener noreferrer" aria-label="Xem ảnh lớn combo FPT"><img src="/images/fpt-combo-poster.jpg" alt="Combo FPT Internet, FPT Play và Camera" loading="lazy"/><span>Xem combo <ArrowUpRight size={14}/></span></a><span className="wifi-panel-label">KẾT NỐI CHO TỔ ẤM</span><div className="wifi-symbol"><Wifi size={66} strokeWidth={1.5} /></div><h3>Internet FPT</h3><p>Bắt đầu từ điều bạn cần.</p><div className="wifi-options">{[{Icon:Wifi,title:'Internet / Wi-Fi',text:'Học tập · Làm việc · Giải trí'},{Icon:Tv,title:'FPT Play',text:'Thêm lựa chọn giải trí cho gia đình'},{Icon:Camera,title:'Camera',text:'Theo dõi không gian bạn quan tâm'}].map(({Icon,title,text}) => <div key={title}><Icon size={22}/><div><h4>{title}</h4><p>{text}</p></div></div>)}</div><p className="wifi-note">Nhắn địa chỉ và nhu cầu sử dụng để Hải kiểm tra gói cước hiện có.</p></div></div></section>
  </>;
}
