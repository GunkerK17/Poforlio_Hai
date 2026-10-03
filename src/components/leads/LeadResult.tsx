import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Copy, LoaderCircle, MessageCircle, Pencil, Phone, Plus } from 'lucide-react';
import { profileData } from '../../data/profile';
import { leadMessage, packageOptions, type LeadData } from '../../data/leadForm';
import type { LeadSubmission } from '../../services/submitLead';
import { copyAndOpenZalo, type ZaloHandoff } from '../../services/zaloLead';

export function LeadResult({ lead, submission, initialHandoff, onEdit, onReset }: { lead: LeadData; submission: LeadSubmission; initialHandoff?: ZaloHandoff; onEdit: () => void; onReset: () => void }) {
  const [handoff, setHandoff] = useState(initialHandoff), [busy, setBusy] = useState(false);
  const sending = useRef(false), messageField = useRef<HTMLTextAreaElement>(null);
  const message = leadMessage(lead);
  const received = submission.mode === 'api' || submission.mode === 'sheets', demo = submission.mode === 'demo';
  const failedCopy = handoff?.copied === false;
  useEffect(() => { if (failedCopy) { messageField.current?.focus({ preventScroll: true }); messageField.current?.select(); } }, [failedCopy]);
  const copyAndOpen = async () => {
    if (sending.current) return;
    sending.current = true; setBusy(true);
    try { setHandoff(await copyAndOpenZalo(message, profileData.contact.zaloUrl)); }
    finally { sending.current = false; setBusy(false); }
  };
  const summary = [
    ['Họ tên', lead.fullName], ['Số điện thoại', lead.phone], ['Khu vực cần lắp', lead.area],
    ['Quan tâm', packageOptions.find(option => option.id === lead.packageInterest)?.label],
    ['Nhu cầu', lead.usageNeeds.join(' · ')], ['Nhà', lead.homeFloors], ['TV', lead.tvType],
    ['Kết nối TV', lead.tvWifi], ['Dự kiến lắp', lead.installationTime], ['Ghi chú', lead.note],
  ].filter(([, value]) => !!value);
  return <section className="lead-result" aria-labelledby="lead-result-title">
    <div className="lead-result-icon" aria-hidden="true">{received ? <CheckCircle2 size={34}/> : <MessageCircle size={34}/>}</div>
    <div role="status"><p className="lead-kicker">{received ? 'ĐÃ TIẾP NHẬN YÊU CẦU' : demo ? 'BẢN XEM THỬ' : handoff?.copied ? 'ĐÃ SAO CHÉP ĐẦY ĐỦ' : 'NỘI DUNG ĐÃ CHUẨN BỊ'}</p>
      <h2 id="lead-result-title" tabIndex={-1}>{received ? 'Đăng ký thành công!' : demo ? 'Đã hoàn tất bản xem thử.' : 'Yêu cầu đã sẵn sàng.'}</h2>
      <p className="lead-result-description">{received ? 'Cảm ơn anh/chị đã để lại thông tin 🧡 Hải sẽ kiểm tra hạ tầng và liên hệ tư vấn trong thời gian sớm nhất.' : demo ? 'Thông tin chưa được gửi đến Hải. Anh/chị có thể gửi nhu cầu qua Zalo bên dưới.' : handoff?.copied ? 'Trong Zalo, dán nội dung đã sao chép và bấm Gửi cho Hải. Yêu cầu gồm đầy đủ thông tin anh/chị vừa điền.' : 'Sao chép nội dung bên dưới, mở Zalo của Hải, dán và bấm Gửi để Hải nhận được yêu cầu nhé.'}</p>
    </div>
    {!received && <div className={`lead-zalo-guide ${failedCopy ? 'needs-manual-copy' : ''}`}>
      {failedCopy && <p className="lead-copy-warning" role="status">Trình duyệt chưa cho sao chép tự động. Anh/chị nhấn giữ nội dung bên dưới, chọn Sao chép rồi mở Zalo nhé.</p>}
      <label htmlFor="lead-message-copy">Nội dung gửi Hải <span>Đầy đủ thông tin đã điền</span></label>
      <textarea id="lead-message-copy" ref={messageField} value={message} readOnly onFocus={event => event.currentTarget.select()} rows={8}/>
      <button className="lead-submit" type="button" onClick={copyAndOpen} disabled={busy} aria-busy={busy}>{busy ? <LoaderCircle className="lead-loading" size={18}/> : <Copy size={18}/>} {busy ? 'Đang sao chép...' : 'Sao chép & mở Zalo'}</button>
      <p className="lead-copy-status" role="status">{handoff?.copied ? handoff.opened ? 'Đã sao chép. Dán và bấm Gửi trong Zalo để hoàn tất.' : 'Đã sao chép. Bấm “Mở Zalo của Hải” bên dưới, dán và gửi nhé.' : 'Hải chỉ nhận được thông tin sau khi anh/chị bấm Gửi trong Zalo.'}</p>
    </div>}
    {received && <dl className="lead-summary">{summary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
    <div className="lead-advisor"><span className="lead-advisor-avatar" aria-hidden="true">H</span><div><strong>Hải – FPT Telecom</strong><a href={`tel:${profileData.contact.phone}`}><Phone size={14}/>{profileData.contact.phoneFormatted}</a></div></div>
    <a className={received ? 'lead-submit lead-zalo' : 'lead-zalo-secondary'} href={profileData.contact.zaloUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>{received ? 'Liên hệ Zalo' : 'Mở Zalo của Hải'}</a>
    <div className="lead-result-actions"><button type="button" onClick={onEdit} disabled={busy}><Pencil size={14}/>Sửa thông tin</button><button type="button" onClick={onReset} disabled={busy}><Plus size={15}/>Đăng ký thêm nhu cầu khác</button></div>
  </section>;
}