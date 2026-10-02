import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, ArrowRight, ArrowLeft, X, Images, ChevronLeft, ChevronRight } from 'lucide-react';
import { journeyStages } from '../../data/journeyDetails';
import { profileContent } from '../../data/profileContent';
import './story.css';

type Stage = typeof journeyStages[number];

function JourneyAlbum({ initial, onClose }: { initial: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [chapter, setChapter] = useState(initial);
  const [photoIndex, setPhotoIndex] = useState(0);
  const stage = journeyStages[chapter];
  const photo = stage.photos[photoIndex];
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    return () => { element?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  const movePhoto = (offset: number) => setPhotoIndex(index => (index + offset + stage.photos.length) % stage.photos.length);
  const moveChapter = (index: number) => { setChapter(index); setPhotoIndex(0); };
  return createPortal(<dialog ref={dialog} className="jrn-dialog" aria-labelledby="jrn-album-title" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="jrn-album">
      <header className="jrn-album-header"><span>GUN / THE JOURNEY</span><span>CHƯƠNG {stage.number} / {String(journeyStages.length).padStart(2, '0')}</span><button autoFocus onClick={onClose} aria-label="Đóng hành trình"><X size={20} /></button></header>
      <div className="jrn-album-body">
        <div className="jrn-album-story">
          <p className="jrn-kicker">{stage.phaseName} · {stage.yearBadge}</p>
          <h2 id="jrn-album-title">{stage.modalTitle}</h2>
          <p className="jrn-description">{stage.modalDescription}</p>
          <h3 className="jrn-milestone-heading">Những dấu mốc</h3>
          <ol className="jrn-milestones">{stage.milestones.map(m => <li key={m.date}><span>{m.date}</span><h4>{m.title}</h4><p>{m.description}</p></li>)}</ol>
          <blockquote>“{stage.quote}”</blockquote>
        </div>
        <div className="jrn-album-gallery" role="region" aria-label="Album ảnh hành trình" onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); movePhoto(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); movePhoto(-1); } }}>
          <div className="jrn-viewer"><img src={photo.src} alt={photo.alt} /><div className="jrn-viewer-controls"><button onClick={() => movePhoto(-1)} aria-label="Ảnh trước"><ChevronLeft size={22} /></button><span aria-live="polite">{String(photoIndex + 1).padStart(2, '0')} / {String(stage.photos.length).padStart(2, '0')}</span><button onClick={() => movePhoto(1)} aria-label="Ảnh tiếp theo"><ChevronRight size={22} /></button></div></div>
          <p className="jrn-photo-caption" aria-live="polite">{photo.caption}</p>
          <div className="jrn-thumbnails">{stage.photos.map((p, index) => <button key={p.src} aria-label={`Xem ảnh ${index + 1}: ${p.alt}`} aria-pressed={index === photoIndex} onClick={() => setPhotoIndex(index)}><img src={p.src} alt="" loading="lazy" /></button>)}</div>
          <p className="jrn-gallery-note"><Images size={14} /> {stage.photos.length} ký ức trong chương này · Chọn ảnh để khám phá</p>
        </div>
      </div>
      <footer className="jrn-album-footer"><button disabled={chapter === 0} onClick={() => moveChapter(chapter - 1)}><ArrowLeft size={16} />Chương trước</button><span>{stage.title}</span><button disabled={chapter === journeyStages.length - 1} onClick={() => moveChapter(chapter + 1)}>Chương tiếp <ArrowRight size={16} /></button></footer>
    </div>
  </dialog>, document.body);
}

function JourneyCard({ stage, index, onOpen }: { stage: Stage; index: number; onOpen: () => void }) {
  return <article className={`jrn-chapter ${stage.isCurrent ? 'jrn-current' : ''}`}>
    <div className="jrn-date"><span className="jrn-node" /><span>{stage.yearBadge}</span>{stage.isCurrent && <i>ĐANG VIẾT TIẾP</i>}</div>
    <button className="jrn-card" onClick={onOpen} aria-label={`Khám phá ${stage.title}`}>
      <div className="jrn-collage"><img className="jrn-cover" src={stage.mainPhoto} alt={stage.alt} loading="lazy" /><span className="jrn-chapter-no">0{index + 1}</span><span className="jrn-photo-count"><Images size={14} />{stage.photos.length} ảnh</span><div className="jrn-snapshots" aria-hidden="true">{stage.photos.slice(1,3).map(p => <img key={p.src} src={p.src} alt="" loading="lazy" />)}</div></div>
      <div className="jrn-card-body"><p className="jrn-kicker">CHƯƠNG {stage.number} / {stage.phaseName}</p><h3>{stage.title}</h3><p className="jrn-card-description">{stage.subtitle}</p><div className="jrn-card-bottom"><span>{stage.milestones.length} dấu mốc · Xem câu chuyện</span><span className="jrn-open"><ArrowUpRight size={21} /></span></div></div>
    </button>
  </article>;
}

export function Story() {
  const [active, setActive] = useState<number | null>(null);
  return <section id="story" className="jrn-section" aria-labelledby="jrn-title"><div className="jrn-wrap">
    <header className="jrn-header"><div><p className="jrn-kicker">02 / CÂU CHUYỆN CỦA MÌNH</p><h2 id="jrn-title">Mỗi chặng đường,<br />một phiên bản <em>tốt hơn.</em></h2></div><div className="jrn-intro"><span className="jrn-small-line" /><p>{profileContent.bio}</p><span className="jrn-header-note">2015 — HIỆN TẠI <ArrowRight size={17} /></span></div></header>
    <div className="jrn-timeline">{journeyStages.map((stage,index) => <JourneyCard key={stage.id} stage={stage} index={index} onOpen={() => setActive(index)} />)}</div>
    <div className="jrn-ending"><span className="jrn-ending-dot" /><p>Hành trình vẫn đang tiếp tục.</p><span>Vẫn học hỏi. Vẫn tiến lên. Vẫn là mình.</span></div>
    {active !== null && <JourneyAlbum initial={active} onClose={() => setActive(null)} />}
  </div></section>;
}
export default Story;
