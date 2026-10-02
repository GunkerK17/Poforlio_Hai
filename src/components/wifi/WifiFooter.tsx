import { ArrowUpRight, MapPin, Phone, MessageCircle } from 'lucide-react';
import { fptCanTho } from '../../data/wifiExperience';
import { profileData } from '../../data/profile';
import { SocialLinks } from '../ui/SocialLinks';

export function WifiFooter() {
  const contact = profileData.contact;
  return <footer className="experience-footer" id="location">
    <div className="footer-grid wl-wrap">
      <div className="footer-person"><p className="wl-kicker">CÓ HẢI ĐỒNG HÀNH</p><div className="footer-identity"><img src="/images/hai_fpt_badge.jpg" alt="Nguyễn Chí Hải tại FPT Telecom" loading="lazy"/><div><h2>Nguyễn Chí Hải</h2><p>Tư vấn Internet FPT · Cần Thơ</p></div></div><p className="footer-description">Mình giúp bạn kiểm tra hạ tầng, chọn gói phù hợp và hẹn lịch lắp. Cần Internet, giải trí hay camera? Cứ nhắn Hải.</p><a className="footer-phone" href={`tel:${contact.phone}`}><Phone size={19}/>{contact.phoneFormatted}</a><a className="footer-zalo" href={contact.zaloUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Nhắn Hải qua Zalo<ArrowUpRight size={15}/></a><SocialLinks compact/></div>
      <div className="footer-location"><div><p className="wl-kicker"><MapPin size={14}/> ĐIỂM GIAO DỊCH TẠI CẦN THƠ</p><h3>{fptCanTho.name}</h3><p>{fptCanTho.address}</p></div><div className="footer-map" data-lenis-prevent><iframe title="Bản đồ FPT Telecom Ninh Kiều, Cần Thơ" src={fptCanTho.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><a href={fptCanTho.mapsUrl} target="_blank" rel="noopener noreferrer">Mở Google Maps <ArrowUpRight size={16}/></a></div><a className="footer-source" href={fptCanTho.source} target="_blank" rel="noopener noreferrer">Địa chỉ theo danh sách điểm giao dịch FPT Telecom <ArrowUpRight size={12}/></a></div>
    </div>
    <div className="footer-end wl-wrap"><span>Trang tư vấn cá nhân của Nguyễn Chí Hải</span><a href="/">Khám phá portfolio của Hải <ArrowUpRight size={14}/></a></div>
  </footer>;
}
