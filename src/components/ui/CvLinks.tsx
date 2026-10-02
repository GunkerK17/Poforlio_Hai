import { Download, FileText } from 'lucide-react';

const cvUrl = `${import.meta.env.BASE_URL}cv/ITSale_FPTTelecom.pdf`;

export function CvLinks() {
  return <div className="cv-links" role="group" aria-label="CV Nguyễn Chí Hải">
    <a href={cvUrl} target="_blank" rel="noopener noreferrer" aria-label="Xem CV Nguyễn Chí Hải (PDF, mở tab mới)"><FileText size={16}/><span>Xem CV</span></a>
    <span className="cv-separator" aria-hidden="true"/>
    <a href={cvUrl} download="CV-Nguyen-Chi-Hai.pdf"><Download size={16}/><span>Tải CV</span><small>PDF</small></a>
  </div>;
}
