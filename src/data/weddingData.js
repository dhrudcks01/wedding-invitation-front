export const RSVP_STORAGE_KEY = 'wedding_rsvp_entries';

export const WEDDING_INFO = {
  groom: '오경찬',
  bride: '유지연',
  datetime: '2026-10-09T15:00:00',
  displayDate: '2026년 10월 9일 금요일 오후 3시',
  venue: '라비두스 (Laviedouce)',
  address: '서울특별시 중구 필동로5길 7 (필동3가 62-15)',
  tel: '02-2265-7000',
};

export const THEMES = [
  { key: 'warm', label: 'Warm' },
  { key: 'sage', label: 'Sage' },
  { key: 'midnight', label: 'Midnight' },
  { key: 'rose', label: 'Rose' },
];

export const CONTACTS = [
  { label: '신랑', name: '오경찬', phone: '01012345678' },
  { label: '신부', name: '유지연', phone: '01098765432' },
];

export const ACCOUNTS = [
  { side: '신랑측', bank: '신한은행', number: '110-123-456789', holder: '오경찬' },
  { side: '신부측', bank: '국민은행', number: '004-1234-5678', holder: '유지연' },
];

export const TIMELINE = [
  { time: '14:20', title: '예식장 입장', detail: '하객 입장 및 자리 안내' },
  { time: '15:00', title: '본식 시작', detail: '신랑 신부 입장 및 예식 진행' },
  { time: '16:00', title: '피로연', detail: '식사 및 인사' },
];

export const FAQS = [
  {
    q: '주차가 가능한가요?',
    a: '라비두스 주차장 및 인근 제휴 주차장을 이용하실 수 있습니다. 만차 시 안내요원이 대체 주차를 도와드립니다.',
  },
  {
    q: '드레스 코드는 있나요?',
    a: '세미 포멀(단정한 정장/원피스)을 권장드립니다. 아이보리 계열은 신부 의상과 겹칠 수 있어 피해주세요.',
  },
  {
    q: '식사는 어떻게 제공되나요?',
    a: '한식/양식 코스가 준비되어 있으며, RSVP에서 식사 선호를 남겨주시면 좌석 배치에 참고하겠습니다.',
  },
];

export const GALLERY = ['/intro.jpg', '/laviedouce.jpg', '/intro.jpg'];

export const INITIAL_RSVP_FORM = {
  name: '',
  side: '신랑측',
  attending: '참석',
  companions: 1,
  meal: '한식',
  shuttle: '이용 안 함',
  note: '',
};

export const loadRsvpEntries = () => {
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
