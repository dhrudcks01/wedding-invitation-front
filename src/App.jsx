import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import Guestbook from './Guestbook';
import Intro from './Intro';
import AccountSection from './components/AccountSection';
import FloatingControls from './components/FloatingControls';
import FooterSection from './components/FooterSection';
import GallerySection from './components/GallerySection';
import GuideSection from './components/GuideSection';
import HeroSection from './components/HeroSection';
import InvitationSection from './components/InvitationSection';
import LocationSection from './components/LocationSection';
import RsvpSection from './components/RsvpSection';
import ThemePicker from './components/ThemePicker';
import {
  ACCOUNTS,
  CONTACTS,
  FAQS,
  GALLERY,
  INITIAL_RSVP_FORM,
  RSVP_STORAGE_KEY,
  THEMES,
  TIMELINE,
  WEDDING_INFO,
  loadRsvpEntries,
} from './data/weddingData';

function App() {
  const [dDay, setDDay] = useState('');
  const [remainingTime, setRemainingTime] = useState('');
  const [openContact, setOpenContact] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [hasBgm, setHasBgm] = useState(true);
  const [theme, setTheme] = useState('warm');
  const [openFaq, setOpenFaq] = useState(-1);
  const [rsvpEntries, setRsvpEntries] = useState(() => loadRsvpEntries());
  const [rsvpForm, setRsvpForm] = useState(INITIAL_RSVP_FORM);
  const audioRef = useRef(null);

  const weddingDate = useMemo(() => new Date(WEDDING_INFO.datetime), []);

  useEffect(() => {
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvpEntries));
  }, [rsvpEntries]);

  useEffect(() => {
    const calculateDDay = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const target = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), weddingDate.getDate());
      const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays > 0) setDDay(`D-${diffDays}`);
      else if (diffDays === 0) setDDay('D-Day');
      else setDDay(`D+${Math.abs(diffDays)}`);

      const diffMs = weddingDate.getTime() - now.getTime();
      if (diffMs <= 0) {
        setRemainingTime('예식이 시작되었습니다.');
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      setRemainingTime(`${days}일 ${hours}시간 ${minutes}분 남음`);
    };

    calculateDDay();
    const interval = setInterval(calculateDDay, 60000);

    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }

    return () => clearInterval(interval);
  }, [weddingDate]);

  const rsvpStats = useMemo(() => {
    const attendingCount = rsvpEntries.filter((entry) => entry.attending === '참석').length;
    const absentCount = rsvpEntries.filter((entry) => entry.attending === '불참').length;
    const shuttleUsers = rsvpEntries.filter((entry) => entry.shuttle === '이용').length;

    return { attendingCount, absentCount, shuttleUsers };
  }, [rsvpEntries]);

  const toggleMusic = async () => {
    if (!audioRef.current || !hasBgm) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch {
      setHasBgm(false);
    }
  };

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${label} 복사되었습니다.`);
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${WEDDING_INFO.groom} ♥ ${WEDDING_INFO.bride} 결혼식 초대장`,
      text: `${WEDDING_INFO.displayDate} | ${WEDDING_INFO.venue}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // 공유 취소/실패 시 링크 복사 fallback
      }
    }

    handleCopy(window.location.href, '초대장 링크가');
  };

  const openGoogleCalendar = () => {
    const start = weddingDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const endDate = new Date(weddingDate.getTime() + 2 * 60 * 60 * 1000);
    const end = endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const text = encodeURIComponent(`${WEDDING_INFO.groom} ♥ ${WEDDING_INFO.bride} 결혼식`);
    const details = encodeURIComponent('모바일 청첩장으로 초대드립니다.');
    const location = encodeURIComponent(`${WEDDING_INFO.venue} ${WEDDING_INFO.address}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleRsvpSubmit = (event) => {
    event.preventDefault();
    const trimmedName = rsvpForm.name.trim();

    if (!trimmedName) {
      alert('성함을 입력해주세요.');
      return;
    }

    const entry = {
      id: Date.now(),
      ...rsvpForm,
      name: trimmedName,
      companions: Number(rsvpForm.companions) || 1,
      createdAt: new Date().toISOString(),
    };

    setRsvpEntries((prev) => [entry, ...prev]);
    setRsvpForm(INITIAL_RSVP_FORM);
    alert('참석 의사가 등록되었습니다. 감사합니다!');
  };

  return (
    <>
      {!introFinished && <Intro onComplete={() => setIntroFinished(true)} />}

      <div
        className={`container theme-${theme}`}
        style={{
          height: introFinished ? 'auto' : '100vh',
          overflow: introFinished ? 'auto' : 'hidden',
        }}
      >
        <audio ref={audioRef} src="/bgm.mp3" loop onError={() => setHasBgm(false)} />

        <div className="top-toolbar">
          <ThemePicker themes={THEMES} currentTheme={theme} onChange={setTheme} />
          <FloatingControls hasBgm={hasBgm} isPlaying={isPlaying} onToggleMusic={toggleMusic} onShare={handleShare} />
        </div>

        <HeroSection weddingInfo={WEDDING_INFO} dDay={dDay} remainingTime={remainingTime} />

        <div className="divider" />

        <InvitationSection
          contacts={CONTACTS}
          openContact={openContact}
          onToggleContact={() => setOpenContact((prev) => !prev)}
          onOpenCalendar={openGoogleCalendar}
          onShare={handleShare}
        />

        <div className="divider" />

        <RsvpSection
          rsvpStats={rsvpStats}
          rsvpForm={rsvpForm}
          setRsvpForm={setRsvpForm}
          onSubmit={handleRsvpSubmit}
        />

        <div className="divider" />

        <GuideSection
          timeline={TIMELINE}
          faqs={FAQS}
          openFaq={openFaq}
          onToggleFaq={(index) => setOpenFaq((prev) => (prev === index ? -1 : index))}
        />

        <div className="divider" />

        <GallerySection images={GALLERY} />

        <div className="divider" />

        <LocationSection
          weddingInfo={WEDDING_INFO}
          onCopyAddress={() => handleCopy(`${WEDDING_INFO.address} ${WEDDING_INFO.venue}`, '주소가')}
        />

        <div className="divider" />

        <AccountSection
          openAccount={openAccount}
          onToggleAccount={() => setOpenAccount((prev) => !prev)}
          accounts={ACCOUNTS}
          onCopyAccount={(accountNumber) => handleCopy(accountNumber, '계좌번호가')}
        />

        <div className="divider" />

        <section className="section">
          <h2 className="section-title">GUESTBOOK</h2>
          <Guestbook />
        </section>

        <FooterSection weddingInfo={WEDDING_INFO} />
      </div>
    </>
  );
}

export default App;
