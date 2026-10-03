import { useEffect } from 'react';
import { ArrowLeft, Clock3, Phone, Wifi } from 'lucide-react';
import { profileData } from '../data/profile';
import { leadPageDescription, leadPageTitle } from '../data/leadForm';
import { ThemeToggle } from './ui/ThemeToggle';
import { LeadForm } from './leads/LeadForm';

export default function InternetRegistration() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content');
    document.title = leadPageTitle; description?.setAttribute('content', leadPageDescription);
    return () => { document.title = previousTitle; if (previousDescription) description?.setAttribute('content', previousDescription); };
  }, []);
  return <div className="lead-page">
    <a href="#lead-main" className="lead-skip">Đến form đăng ký</a>
    <header className="lead-header"><a className="lead-brand" href={`${import.meta.env.BASE_URL}wifi/`}><span aria-hidden="true"><Wifi size={23}/></span><div>HẢI WI-FI<small>TƯ VẤN INTERNET FPT</small></div></a><div className="header-actions"><a className="lead-header-phone" href={`tel:${profileData.contact.phone}`}><Phone size={15}/><span>{profileData.contact.phoneFormatted}</span></a><ThemeToggle/></div></header>
    <main id="lead-main" className="lead-main">
      <a className="lead-back" href={`${import.meta.env.BASE_URL}wifi/`}><ArrowLeft size={14}/>Về trang Wi-Fi</a>
      <div className="lead-intro"><p className="lead-kicker">HẢI – FPT TELECOM</p><h1>Đăng ký tư vấn<br/><span>Internet FPT.</span></h1><p>Để lại thông tin, Hải sẽ kiểm tra hạ tầng và tư vấn gói phù hợp cho anh/chị.</p><span className="lead-time"><Clock3 size={14}/>Mất chưa đến 1 phút để đăng ký.</span></div>
      <LeadForm/>
      <footer className="lead-footer"><span>Hải – FPT Telecom</span><a href={`tel:${profileData.contact.phone}`}><Phone size={14}/>{profileData.contact.phoneFormatted}</a></footer>
    </main>
  </div>;
}
