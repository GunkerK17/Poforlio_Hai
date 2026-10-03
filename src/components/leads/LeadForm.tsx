import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, ChevronDown, LoaderCircle, MessageCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { profileData } from '../../data/profile';
import { buildLead, homeOptions, initialLeadValues, installationOptions, leadMessage, packageOptions, tvOptions, tvWifiOptions, usageOptions, validateLead, type LeadData, type LeadErrors, type LeadFormValues } from '../../data/leadForm';
import { createLeadRequestId, leadDeliveryMode, submitLead, type LeadSubmission } from '../../services/submitLead';
import { LeadResult } from './LeadResult';
import { copyAndOpenZalo, type ZaloHandoff } from '../../services/zaloLead';

const requiredFields = ['fullName', 'phone', 'area', 'packageInterest'] as const;
const errorIds = (field: keyof LeadFormValues) => `lead-${field}-error`;
export function LeadForm() {
  const [values, setValues] = useState<LeadFormValues>(initialLeadValues);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [busy, setBusy] = useState(false), [sendError, setSendError] = useState('');
  const [result, setResult] = useState<{ lead: LeadData; submission: LeadSubmission; handoff?: ZaloHandoff } | null>(null);
  const active = useRef<AbortController | null>(null), submitting = useRef(false), root = useRef<HTMLDivElement>(null);
  const requestId = useRef('');
  const reduced = useReducedMotion();
  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    if (!result) return;
    root.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    root.current?.querySelector<HTMLElement>('#lead-result-title')?.focus({ preventScroll: true });
  }, [result, reduced]);
  const change = <K extends keyof LeadFormValues>(field: K, value: LeadFormValues[K]) => {
    const next = { ...values, [field]: value, ...(field === 'tvType' && value === 'Không dùng TV' ? { tvWifi: '' } : {}) };
    setValues(next); setSendError('');
    requestId.current = '';
    if (errors[field]) setErrors(previous => ({ ...previous, [field]: validateLead(next)[field] }));
  };
  const blur = (field: keyof LeadFormValues) => setErrors(previous => ({ ...previous, [field]: validateLead(values)[field] }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validateLead(values);
    setErrors(nextErrors); setSendError('');
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      root.current?.querySelector<HTMLElement>(firstError === 'packageInterest' ? 'input[name="packageInterest"]' : `#lead-${firstError}`)?.focus();
      return;
    }
    submitting.current = true; setBusy(true);
    const controller = new AbortController(); active.current = controller;
    try {
      const lead = buildLead(values);
      if (leadDeliveryMode === 'zalo') {
        const handoff = await copyAndOpenZalo(leadMessage(lead), profileData.contact.zaloUrl);
        if (!controller.signal.aborted) setResult({ lead, submission: { mode: 'zalo' }, handoff });
        return;
      }
      if (!requestId.current) requestId.current = createLeadRequestId();
      const submission = await submitLead(lead, controller.signal, requestId.current);
      if (!controller.signal.aborted) setResult({ lead, submission });
    } catch (error) {
      if (!controller.signal.aborted) setSendError(error instanceof Error ? error.message : 'Chưa gửi được yêu cầu. Anh/chị thử lại nhé.');
    } finally { if (!controller.signal.aborted) setBusy(false); submitting.current = false; active.current = null; }
  };
  const backToForm = (reset: boolean) => {
    setResult(null); setErrors({}); setSendError('');
    requestId.current = '';
    if (reset) setValues({ ...initialLeadValues(), packageInterest: '', note: '' });
    requestAnimationFrame(() => root.current?.querySelector<HTMLInputElement>('#lead-fullName')?.focus());
  };
  const progress = requiredFields.filter(field => !!values[field].trim() && !validateLead(values)[field]).length;
  const fieldError = (field: keyof LeadFormValues) => errors[field] ? <p className="lead-field-error" id={errorIds(field)}>{errors[field]}</p> : null;
  const attributes = (field: keyof LeadFormValues) => ({ 'aria-invalid': !!errors[field], 'aria-describedby': errors[field] ? errorIds(field) : undefined });
  const choice = (field: 'homeFloors' | 'tvType' | 'tvWifi', title: string, options: readonly string[]) => <fieldset className="lead-quick-choice"><legend>{title} <small>Không bắt buộc</small></legend><div className="lead-choice-chips">{options.map(option => <label key={option} className={values[field] === option ? 'is-selected' : ''}><input type="radio" name={field} value={option} checked={values[field] === option} onChange={() => change(field, option)}/>{values[field] === option && <Check size={13} aria-hidden="true"/>}<span>{option}</span></label>)}</div>{fieldError(field)}</fieldset>;
  return <div className="lead-card" ref={root}>
    {result ? <LeadResult lead={result.lead} submission={result.submission} initialHandoff={result.handoff} onEdit={() => backToForm(false)} onReset={() => backToForm(true)}/> : <form onSubmit={submit} noValidate aria-label="Đăng ký tư vấn Internet FPT">
      <div className="lead-form-heading"><span>Thông tin tư vấn</span><small>{progress}/4 mục cần điền</small></div>
      <div className="lead-progress" role="progressbar" aria-label="Thông tin bắt buộc đã hoàn thành" aria-valuemin={0} aria-valuemax={4} aria-valuenow={progress}><span style={{ width: `${progress * 25}%` }}/></div>
      {(leadDeliveryMode === 'demo' || leadDeliveryMode === 'zalo') && <p className="lead-delivery-note">{leadDeliveryMode === 'demo' ? 'Bản xem thử: thông tin chưa gửi đến Hải.' : 'Điền thông tin → mở Zalo → dán nội dung và gửi cho Hải.'}</p>}
      <fieldset disabled={busy} className="lead-fields">
        <div className="lead-fields-pair"><div className="lead-field"><label htmlFor="lead-fullName">Họ và tên <span aria-hidden="true">*</span></label><input id="lead-fullName" name="fullName" value={values.fullName} onChange={event => change('fullName', event.target.value)} onBlur={() => blur('fullName')} autoComplete="name" placeholder="Nguyễn Văn A" maxLength={80} required {...attributes('fullName')}/>{fieldError('fullName')}</div>
        <div className="lead-field"><label htmlFor="lead-phone">Số điện thoại <span aria-hidden="true">*</span></label><input id="lead-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={event => change('phone', event.target.value)} onBlur={() => blur('phone')} placeholder="09xx xxx xxx" maxLength={24} required {...attributes('phone')}/>{fieldError('phone')}</div></div>
        <div className="lead-field"><label htmlFor="lead-area">Khu vực cần lắp <span aria-hidden="true">*</span></label><input id="lead-area" name="area" autoComplete="address-level2" value={values.area} onChange={event => change('area', event.target.value)} onBlur={() => blur('area')} placeholder="Phường/Xã, Quận/Huyện" maxLength={180} required {...attributes('area')}/>{fieldError('area')}<small>Chưa cần địa chỉ nhà chi tiết.</small></div>
        <fieldset className="lead-interest" aria-describedby={errors.packageInterest ? errorIds('packageInterest') : undefined}><legend>Anh/chị đang quan tâm gì? <span aria-hidden="true">*</span></legend><div className="lead-package-grid">{packageOptions.map(option => <label className={`lead-package ${values.packageInterest === option.id ? 'is-selected' : ''}`} key={option.id}>
          <input type="radio" name="packageInterest" value={option.id} checked={values.packageInterest === option.id} onChange={() => change('packageInterest', option.id)} required aria-invalid={!!errors.packageInterest}/>
          <option.Icon size={23} aria-hidden="true"/><span>{option.label}</span><motion.i aria-hidden="true" animate={{ scale: values.packageInterest === option.id ? 1 : 0 }} transition={{ duration: reduced ? 0 : .18 }}><Check size={13}/></motion.i>
        </label>)}</div>{fieldError('packageInterest')}</fieldset>
        <fieldset className="lead-usage"><legend>Nhu cầu sử dụng <small>Không bắt buộc</small></legend><div className="lead-chips">{usageOptions.map(option => <button type="button" aria-pressed={values.usageNeeds.includes(option)} key={option} onClick={() => change('usageNeeds', values.usageNeeds.includes(option) ? values.usageNeeds.filter(value => value !== option) : [...values.usageNeeds, option])}>{values.usageNeeds.includes(option) && <Check size={12} aria-hidden="true"/>}{option}</button>)}</div></fieldset>
        <div className="lead-field"><label htmlFor="lead-installationTime">Thời gian dự kiến lắp <small>Không bắt buộc</small></label><div className="lead-select-wrap"><select id="lead-installationTime" name="installationTime" value={values.installationTime} onChange={event => change('installationTime', event.target.value)}><option value="">Chọn thời gian phù hợp</option>{installationOptions.map(option => <option key={option}>{option}</option>)}</select><ChevronDown size={16} aria-hidden="true"/></div>{fieldError('installationTime')}</div>
        {choice('homeFloors', 'Nhà mình có lầu không?', homeOptions)}
        {choice('tvType', 'Nhà mình đang dùng loại TV nào?', tvOptions)}
        {values.tvType !== 'Không dùng TV' && choice('tvWifi', 'TV có kết nối Wi-Fi được không?', tvWifiOptions)}
        <p className="lead-home-tip">Thông tin giúp Hải tư vấn phủ sóng các tầng và cách kết nối TV phù hợp. Chưa rõ thì anh/chị có thể bỏ qua.</p>
        <div className="lead-field"><label htmlFor="lead-note">Ghi chú <small>Không bắt buộc</small></label><textarea id="lead-note" name="note" rows={2} value={values.note} onChange={event => change('note', event.target.value)} placeholder="Anh/chị có thể ghi thêm nhu cầu..." maxLength={600}/>{fieldError('note')}</div>
      </fieldset>
      {sendError && <div className="lead-send-error" role="alert"><strong>{sendError}</strong><a href={profileData.contact.zaloUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={14}/>Liên hệ Hải qua Zalo <ArrowRight size={14}/></a></div>}
      <button type="submit" className="lead-submit" disabled={busy} aria-busy={busy}>{busy ? <LoaderCircle className="lead-loading" size={19}/> : leadDeliveryMode === 'zalo' ? <MessageCircle size={18}/> : <Send size={18}/>} {busy ? leadDeliveryMode === 'zalo' ? 'Đang chuẩn bị nội dung...' : 'Đang gửi yêu cầu...' : leadDeliveryMode === 'zalo' ? 'GỬI YÊU CẦU QUA ZALO' : 'GỬI YÊU CẦU TƯ VẤN'}</button>
      <p className="lead-form-footnote">{leadDeliveryMode === 'zalo' ? 'Web sao chép đầy đủ yêu cầu và mở Zalo. Anh/chị dán nội dung, bấm Gửi để Hải nhận được thông tin.' : 'Thông tin dùng để liên hệ tư vấn. Đây là yêu cầu tư vấn, chưa phải hợp đồng đăng ký.'}</p>
    </form>}
  </div>;
}
