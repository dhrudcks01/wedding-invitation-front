import { useState, useEffect, useRef } from 'react';
import './App.css';
import Guestbook from './Guestbook';
import { FaPhoneAlt, FaRegCopy, FaMusic, FaPause, FaSubway, FaBus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Intro from "./Intro.jsx";

function App() {
    const [dDay, setDDay] = useState('');
    const [openContact, setOpenContact] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [introFinished, setIntroFinished] = useState(false);

    // 📅 예식일: 2026년 10월 9일 (금) 오후 3시
    const weddingDateStr = '2026-10-09T15:00:00';

    useEffect(() => {
        const calculateDDay = () => {
            const today = new Date();
            const wedding = new Date(weddingDateStr);
            today.setHours(0,0,0,0);
            wedding.setHours(0,0,0,0);
            const diff = wedding.getTime() - today.getTime();
            const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

            if (diffDays > 0) setDDay(`D-${diffDays}`);
            else if (diffDays === 0) setDDay("D-Day! 축하해주세요!");
            else setDDay(`D+${Math.abs(diffDays)}`);
        };
        calculateDDay();

        if (audioRef.current) { audioRef.current.volume = 0.3; }
    }, []);

    const toggleMusic = () => {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert(`'${text}' 복사되었습니다.`))
            .catch(() => alert('복사에 실패했습니다.'));
    };

    return (
        <>

        {!introFinished && (
            <Intro onComplete={() => setIntroFinished(true)} />
        )}

        <div className="container" style={{
            // 인트로 중일 때는 스크롤 방지 & 높이 고정 (화면 흔들림 방지)
            height: introFinished ? 'auto' : '100vh',
            overflow: introFinished ? 'auto' : 'hidden'
        }}>
            <audio ref={audioRef} src="/bgm.mp3" loop />
            <button className={`music-btn ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
                {isPlaying ? <FaPause /> : <FaMusic />}
            </button>

            {/* 1. 메인 섹션 */}
            <div className="hero">
                <img
                    src="https://via.placeholder.com/400x500/e0d4c8/ffffff?text=WEDDING+PHOTO"
                    alt="메인사진"
                    className="main-photo"
                />
                <div className="names">
                    오경찬 <span className="and">|</span> 유지연
                </div>
                <div className="date-info">
                    2026년 10월 9일 금요일 오후 3시
                    <br />
                    충무로 라비두스 (Laviedouce)
                </div>
                <div className="d-day-badge">{dDay}</div>
            </div>

            <div className="divider"></div>

            {/* 2. 초대 문구 */}
            <div className="section">
                <div className="section-title">INVITATION</div>
                <div className="poem">
                    가을의 정취가 깊어가는 10월,<br/>
                    도심 속 비밀의 정원 라비두스에서<br/>
                    저희 두 사람 하나가 됩니다.<br/><br/>
                    소중한 발걸음으로 축복해 주시면<br/>
                    더없는 기쁨으로 간직하겠습니다.
                </div>
                <div className="accordion-wrapper">
                    <button className="accordion-header" onClick={() => setOpenContact(!openContact)}>
                        연락처 보기 {openContact ? <IoMdClose /> : <FaPhoneAlt style={{fontSize: '14px'}}/>}
                    </button>
                    {openContact && (
                        <div className="accordion-content">
                            <div className="contact-row">
                                <span>신랑에게 연락하기</span>
                                <a href="tel:01012345678"><FaPhoneAlt /></a>
                            </div>
                            <div className="contact-row">
                                <span>신부에게 연락하기</span>
                                <a href="tel:01098765432"><FaPhoneAlt /></a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="divider"></div>

            {/* 3. 오시는 길 (라비두스 정보 적용) */}
            <div className="section">
                <div className="section-title">LOCATION</div>
                <h3 style={{marginBottom: '5px', fontSize: '18px', color: '#333'}}>라비두스</h3>
                <p style={{fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: '1.6'}}>
                    서울특별시 중구 필동로5길 7 (필동3가 62-15)<br/>
                    Tel. 02-2265-7000
                </p>

                {/* 약도 이미지 영역 */}
                <div style={{marginTop: '10px'}}>
                    {/* [중요] 약도 이미지는 라비두스 홈페이지에서 캡처해서
                frontend/public/map.jpg 로 저장해주세요.
             */}
                    <img
                        src="/laviedouce.jpg"
                        alt="라비두스 약도"
                        style={{width: '100%', borderRadius: '8px', border: '1px solid #eee'}}
                        onError={(e) => {
                            e.target.style.display='none'; // 이미지 없으면 숨김
                        }}
                    />
                </div>


                {/* 교통편 안내 (아이콘 포함) */}
                <div style={{textAlign: 'left', marginTop: '25px', padding: '0 10px'}}>
                    <div style={{marginBottom: '15px'}}>
                        <div style={{fontWeight:'bold', color: '#8b7d6b', display:'flex', alignItems:'center', gap:'5px'}}>
                            <FaSubway /> 지하철 안내
                        </div>
                        <ul style={{fontSize: '13px', color: '#444', paddingLeft: '20px', marginTop: '5px'}}>
                            <li><strong>3, 4호선 충무로역</strong> 1번 출구 (도보 10분)</li>
                            <li>1번 출구 앞 <strong>셔틀버스</strong> 운행</li>
                        </ul>
                    </div>
                    <div>
                        <div style={{fontWeight:'bold', color: '#8b7d6b', display:'flex', alignItems:'center', gap:'5px'}}>
                            <FaBus /> 셔틀버스 안내
                        </div>
                        <p style={{fontSize: '13px', color: '#444', marginTop: '5px', paddingLeft: '5px'}}>
                            예식 1시간 전부터 수시 운행<br/>
                            (충무로역 1번 출구 대한극장 앞 탑승)
                        </p>
                    </div>
                </div>
                {/* 지도 버튼 3종 세트 */}
                <div className="map-buttons">
                    <a
                        href="https://map.naver.com/p/search/충무로%20라비두스"
                        target="_blank"
                        rel="noreferrer"
                        className="map-btn naver"
                    >
                        N 네이버 지도
                    </a>
                    <a
                        href="https://map.kakao.com/link/search/충무로%20라비두스"
                        target="_blank"
                        rel="noreferrer"
                        className="map-btn kakao"
                    >
                        K 카카오맵
                    </a>
                    <a
                        href="https://www.google.com/maps/search/충무로+라비두스"
                        target="_blank"
                        rel="noreferrer"
                        className="map-btn google"
                    >
                        G 구글 지도
                    </a>
                </div>

            </div>

            <div className="divider"></div>

            {/* 4. 계좌번호 & 5. 방명록 (기존 동일) */}
            <div className="section" style={{background: '#fafafa'}}>
                <div className="section-title">ACCOUNT</div>
                <p style={{fontSize: '14px', color: '#666', marginBottom: '20px'}}>
                    참석이 어려우신 분들을 위해<br/>계좌번호를 안내해 드립니다.
                </p>
                <div className="accordion-wrapper" style={{background: 'white'}}>
                    <button className="accordion-header" onClick={() => setOpenAccount(!openAccount)}>
                        계좌번호 보기 {openAccount ? '접기' : '펼치기'}
                    </button>
                    {openAccount && (
                        <div className="accordion-content">
                            <div className="account-box">
                                <div className="account-info">
                                    <span className="bank">신한은행</span> 110-123-456789 <br/>(예금주: 오경찬)
                                </div>
                                <button className="copy-btn" onClick={() => handleCopy('110-123-456789')}>
                                    <FaRegCopy /> 복사
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="divider"></div>

            <div className="section">
                <div className="section-title">GUESTBOOK</div>
                <Guestbook />
            </div>

            <footer style={{background: '#333', color: '#fff', padding: '40px 20px', textAlign: 'center', fontSize: '11px', lineHeight: '1.6'}}>
                <span style={{opacity: 0.7}}>The Wedding of</span><br/>
                <span style={{fontSize: '14px'}}>Kyungchan & Bride</span><br/><br/>
                2026.10.09. Laviedouce
            </footer>
        </div>
        </>
    );
}

export default App;
