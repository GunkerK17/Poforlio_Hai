// Standalone Google Apps Script, V8 runtime. Run setup() once, then deploy
// as a Web App: execute as the owner, access Anyone. The spreadsheet stays private.
const LEAD_TAB = 'Khách đăng ký';
// The provisioning script can fill this with the new private sheet's ID.
const LEAD_SPREADSHEET_ID = '';
const LEAD_HEADERS = ['Ngày nhận', 'Mã yêu cầu', 'Họ tên', 'Điện thoại', 'Khu vực', 'Gói quan tâm', 'Nhu cầu', 'Nhà / số lầu', 'Loại TV', 'TV kết nối Wi-Fi', 'Dự kiến lắp', 'Ghi chú', 'Nguồn', 'Trạng thái', 'Dấu kiểm tra'];
const LEAD_PACKAGES = { wifi: 'Internet / Wi-Fi', play: 'Internet + FPT Play', camera: 'Internet + FPT Play + Camera', advice: 'Chưa biết – Cần tư vấn' };

function setup() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('LEAD_SPREADSHEET_ID') || LEAD_SPREADSHEET_ID;
  const book = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.create('Hải FPT – Khách đăng ký Internet');
  if (!id) props.setProperty('LEAD_SPREADSHEET_ID', book.getId());
  book.setSpreadsheetTimeZone('Asia/Ho_Chi_Minh');
  const sheet = book.getSheetByName(LEAD_TAB) || book.insertSheet(LEAD_TAB);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(LEAD_HEADERS);
    sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setBackground('#256bc0').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(3, 180); sheet.setColumnWidth(4, 140); sheet.setColumnWidth(5, 230);
    sheet.setColumnWidth(6, 220); sheet.setColumnWidth(7, 250); sheet.setColumnWidth(12, 280);
    sheet.hideColumns(2); sheet.hideColumns(15);
  }
  console.log('Bảng khách: ' + book.getUrl());
  return book.getUrl();
}

function doGet() {
  // Public health check only. Never return customer records.
  return leadJson_({ service: 'hai-fpt-leads', configured: !!(PropertiesService.getScriptProperties().getProperty('LEAD_SPREADSHEET_ID') || LEAD_SPREADSHEET_ID) });
}

function doPost(event) {
  let lock;
  try {
    const body = event && event.postData && event.postData.contents;
    if (!body || body.length > 12000) throw new Error('INVALID');
    const lead = validateIncomingLead_(JSON.parse(body));
    const id = PropertiesService.getScriptProperties().getProperty('LEAD_SPREADSHEET_ID') || LEAD_SPREADSHEET_ID;
    if (!id) return leadJson_({ success: false, code: 'NOT_CONFIGURED' });
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return leadJson_({ success: false, code: 'BUSY' });
    const sheet = SpreadsheetApp.openById(id).getSheetByName(LEAD_TAB);
    if (!sheet || sheet.getRange(1, 1, 1, LEAD_HEADERS.length).getValues()[0].join('|') !== LEAD_HEADERS.join('|')) throw new Error('CONFIG');
    const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, JSON.stringify(lead.values), Utilities.Charset.UTF_8).map(b => ('0' + (b & 255).toString(16)).slice(-2)).join('');
    const last = sheet.getLastRow();
    const existing = last > 1 ? sheet.getRange(2, 2, last - 1, 1).createTextFinder(lead.requestId).matchEntireCell(true).findNext() : null;
    if (existing) {
      if (sheet.getRange(existing.getRow(), 15).getValue() !== digest) throw new Error('INVALID');
      return leadJson_({ success: true });
    }
    const row = last + 1;
    const values = [new Date(), lead.requestId].concat(lead.values.map(sheetText_)).concat(['Website Form', 'Mới', digest]);
    sheet.getRange(row, 2, 1, LEAD_HEADERS.length - 1).setNumberFormat('@');
    sheet.getRange(row, 1, 1, LEAD_HEADERS.length).setValues([values]);
    sheet.getRange(row, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    SpreadsheetApp.flush();
    return leadJson_({ success: true });
  } catch (error) {
    // No personal information or internal exception details in responses or logs.
    return leadJson_({ success: false, code: error.message === 'INVALID' ? 'INVALID' : 'SAVE_FAILED' });
  } finally { if (lock && lock.hasLock()) lock.releaseLock(); }
}

function validateIncomingLead_(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('INVALID');
  const text = (key, max, min) => {
    if (typeof data[key] !== 'string') throw new Error('INVALID');
    const value = data[key].trim();
    if (value.length < (min || 0) || value.length > max) throw new Error('INVALID');
    return value;
  };
  const pick = (key, options) => { const value = text(key, 80); if (value && options.indexOf(value) === -1) throw new Error('INVALID'); return value; };
  const requestId = text('requestId', 36, 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) throw new Error('INVALID');
  const name = text('fullName', 80, 2).replace(/\s+/g, ' ');
  if (/[^\p{L}\p{M}\s.'’\-]/u.test(name)) throw new Error('INVALID');
  const phone = text('phone', 10, 10); if (!/^0[35789]\d{8}$/.test(phone)) throw new Error('INVALID');
  const area = text('area', 180, 3), interest = text('packageInterest', 20, 1);
  if (!Object.prototype.hasOwnProperty.call(LEAD_PACKAGES, interest)) throw new Error('INVALID');
  const usageOptions = ['Wi-Fi gia đình', 'Học tập / Làm việc', 'Chơi game', 'Xem bóng đá', 'Xem phim', 'Truyền hình', 'Nhiều thiết bị', 'Camera'];
  if (!Array.isArray(data.usageNeeds) || data.usageNeeds.length > usageOptions.length || data.usageNeeds.some(item => usageOptions.indexOf(item) === -1)) throw new Error('INVALID');
  const usage = Array.from(new Set(data.usageNeeds)).join(', ');
  const home = pick('homeFloors', ['Nhà trệt, không có lầu', 'Có 1 lầu', 'Có từ 2 lầu', 'Chưa rõ']);
  const tv = pick('tvType', ['Smart TV', 'TV thường / đời cũ', 'Chưa rõ loại TV', 'Không dùng TV']);
  const wifi = pick('tvWifi', ['Kết nối Wi-Fi được', 'Không kết nối Wi-Fi', 'Chưa rõ']);
  if (tv === 'Không dùng TV' && wifi) throw new Error('INVALID');
  const time = pick('installationTime', ['Càng sớm càng tốt', 'Trong 1–3 ngày', 'Trong tuần này', 'Đang tham khảo']);
  return { requestId: requestId.toLowerCase(), values: [name, phone, area, LEAD_PACKAGES[interest], usage, home, tv, wifi, time, text('note', 600)] };
}

function sheetText_(value) { return /^[=+\-@]/.test(value) ? "'" + value : value; }
function leadJson_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
