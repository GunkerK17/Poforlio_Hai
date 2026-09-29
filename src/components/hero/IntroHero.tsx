import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, MapPin, Trophy, GraduationCap, BriefcaseBusiness } from 'lucide-react';
import { profileContent as profile } from '../../data/profileContent';
import './intro-hero.css';

interface MemoryCardProps {
  className?: string;
  image: string;
  alt: string;
  number: string;
  title: string;
  subtitle: string;
  defaultRotate?: number;
}

function MemoryCard3D({
  className = '',
  image,
  alt,
  number,
  title,
  subtitle,
  defaultRotate = 0,
}: MemoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: `perspective(800px) rotate(${defaultRotate}deg)`,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate 3D tilt angles based on cursor distance from card center
    const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rotateY = ((x - centerX) / centerX) * 9;

    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(16px) scale(1.035)`,
      transition: 'transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.25s ease',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: `perspective(800px) rotate(${defaultRotate}deg) translateZ(0) scale(1)`,
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
    });
  };

  return (
    <figure
      ref={cardRef}
      className={`intro-photo-3d ${className} ${isHovered ? 'card-3d-active' : ''}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image} alt={alt} loading="lazy" />
      <div className="intro-photo-glare" />
      <figcaption>
        <b>{number} / {title}</b>
        <span>{subtitle} <ArrowUpRight size={13} /></span>
      </figcaption>
    </figure>
  );
}

export function IntroHero() {
  return (
    <section id="home" className="intro-hero">
      <img className="intro-field" src="/images/hero-stadium-night.png" alt="" aria-hidden="true" />
      <div className="intro-shade" />

      <div className="wrap intro-stage">
        <div className="intro-ground" aria-hidden="true" />

        {/* Central Cinematic Athlete with ball */}
        <div className="intro-player">
          <img
            src="/images/hero-player-cutout.png"
            alt="Nguyễn Chí Hải #18 cùng trái bóng trên sân cỏ đêm"
            fetchPriority="high"
          />
        </div>

        {/* Left Column: Greeting, Bio & CTAs */}
        <div className="intro-copy">
          <p className="eyebrow">FOOTBALL · TECHNOLOGY · BUSINESS · LIFE</p>
          <h1>Xin chào,<br />mình là <span>{profile.name.trim().split(/\s+/).pop()}.</span></h1>
          <p className="intro-bio">{profile.bio}</p>
          <div className="actions">
            <a className="button" href="#story">Khám phá hành trình <ArrowDown size={15} /></a>
            <a className="button outline" href={profile.contact.zaloUrl} target="_blank" rel="noopener noreferrer">Kết nối với tôi <ArrowUpRight size={15} /></a>
          </div>
        </div>

        {/* Right Column: 3 Memory Cards grouped neatly with 3D tilt */}
        <div className="intro-memories-column">
          <div className="intro-memories-stack" aria-label="Bóng đá, tốt nghiệp và công nghệ">
            <MemoryCard3D
              className="card-football"
              image="/images/hero-captain.jpg"
              alt="Hải khoác áo số 18 của Đại học FPT Cần Thơ"
              number="01"
              title="FOOTBALL"
              subtitle="Đam mê luôn ở đây"
              defaultRotate={-1.5}
            />
            <MemoryCard3D
              className="card-workspace"
              image="/images/hero-workspace.jpg"
              alt="Góc làm việc với ManageField API, lập trình và công nghệ"
              number="02"
              title="TECHNOLOGY"
              subtitle="Build. Learn. Improve."
              defaultRotate={1.5}
            />
            <MemoryCard3D
              className="card-graduation"
              image="/images/hero-graduation.jpg"
              alt="Nguyễn Chí Hải nhận bằng tốt nghiệp Đại học FPT Cần Thơ"
              number="03"
              title="MY JOURNEY"
              subtitle="Học hỏi để trưởng thành"
              defaultRotate={-1}
            />
          </div>

          <p className="intro-script-side">
            Always learning.<br /><small>Always moving forward.</small>
          </p>
        </div>
      </div>

      {/* Bottom Credentials Ribbon */}
      <div className="intro-credentials">
        <div className="wrap">
          <div><MapPin /><span>{profile.location}</span></div>
          <div><Trophy /><span><b>6 năm</b><small>Tập luyện và thi đấu môi trường bóng đá chuyên nghiệp</small></span></div>
          <div><GraduationCap /><span><b>FPT University Cần Thơ</b><small>Kỹ thuật phần mềm</small></span></div>
          <div><BriefcaseBusiness /><span><b>{profile.currentCompany}</b><small>Kinh doanh · Tư vấn giải pháp</small></span></div>
        </div>
      </div>
    </section>
  );
}
