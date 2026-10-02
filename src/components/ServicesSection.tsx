import { ArrowUpRight, Check, Phone, Trophy, Wifi } from 'lucide-react';
import { profileContent as profile } from '../data/profileContent';
import { WifiPlanSummary } from './ui/WifiPlanSummary';

export function ServicesSection() {
  return <section id="services" className="section gun-services" aria-labelledby="services-title"><div className="wrap">
    <div className="section-heading"><div><p className="eyebrow">01 / MÌNH CÓ THỂ GIÚP GÌ?</p><h2 id="services-title">Kết nối trong cuộc sống.<br /><span>Gắn kết trên sân bóng.</span></h2></div><p className="section-note">Một đường truyền cho cả nhà.<br />Một sân chơi cho những đam mê nhỏ.</p></div>
    <div className="gun-service-grid">
      <article className="gun-service-card gun-service-wifi"><div className="service-card-top"><span className="service-icon"><Wifi size={27} /></span><span>FPT TELECOM / CẦN THƠ</span><span className="service-no">01</span></div>
        <h3>Wi-Fi cho nhà bạn.<br /><span>Hải tư vấn cùng bạn.</span></h3><p>Học tập, làm việc hay giải trí? Mình giúp bạn chọn giải pháp Internet, FPT Play và camera theo nhu cầu thực tế.</p>
        <WifiPlanSummary />
        <p className="service-footnote">Gửi địa chỉ, mình kiểm tra hạ tầng và tư vấn gói phù hợp cho bạn.</p>
        <div className="service-card-actions"><a className="button" href="/wifi">Xem dịch vụ Wi-Fi <ArrowUpRight size={17}/></a><a className="service-text-link" href={profile.contact.zaloUrl} target="_blank" rel="noopener noreferrer">Nhắn Hải tư vấn <ArrowUpRight size={16}/></a></div>
        <svg className="service-signal" viewBox="0 0 240 160" fill="none" aria-hidden="true"><path d="M10 150C10 72 72 10 150 10M50 150C50 94 94 50 150 50M90 150C90 116 116 90 150 90"/><circle cx="150" cy="150" r="9"/></svg>
      </article>
      <article id="football" className="gun-service-card gun-service-football"><img className="service-football-image" src="/images/journey-current-day-training.jpg" alt="Buổi tập bóng đá của Hải cùng các cầu thủ nhí" loading="lazy"/><div className="service-football-shade"/><div className="service-card-top"><span className="service-icon"><Trophy size={27}/></span><span>BÓNG ĐÁ THIẾU NHI / CẦN THƠ</span><span className="service-no">02</span></div>
        <h3>Những bước chạy nhỏ.<br /><span>Một đam mê lớn.</span></h3><p>Mình đồng hành cùng các cầu thủ nhí: tập kỹ thuật cơ bản, rèn thể lực và học cách phối hợp với đồng đội.</p>
        <ul><li><Check size={16}/>Nền tảng 6 năm bóng đá tại CLB An Giang</li><li><Check size={16}/>Hướng dẫn kỹ thuật và tư duy chơi bóng</li><li><Check size={16}/>Trao đổi lớp phù hợp với phụ huynh</li></ul>
        <div className="service-card-actions"><a className="button" href={profile.contact.zaloUrl} target="_blank" rel="noopener noreferrer">Hỏi lớp & đăng ký học <ArrowUpRight size={17}/></a><a className="service-text-link" href={`tel:${profile.contact.phone}`}><Phone size={15}/>Gọi cho Hải</a></div>
        <p className="service-footnote">Nhắn độ tuổi của bé và khung giờ thuận tiện để mình trao đổi lịch tập, địa điểm và học phí.</p>
      </article>
    </div>
  </div></section>;
}
