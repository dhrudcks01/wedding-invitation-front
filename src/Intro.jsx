import { useEffect, useState } from 'react';
import './Intro.css';
// import introImg from './assets/intro.jpg'; // 이미지를 import해서 쓴다면 주석 해제

const Intro = ({ onComplete }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setIsFading(true), 4500);
        const timer2 = setTimeout(() => onComplete(), 5500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        // 1. 전체 화면을 덮는 배경 (스크롤 방지 & 양옆 배경색)
        <div className={`intro-overlay ${isFading ? 'fade-out' : ''}`}>

            {/* 2. 모바일 크기(420px)만큼만 차지하는 실제 인트로 영역 */}
            <div className="intro-inner">

                {/* 배경 사진 */}
                <div className="intro-bg">
                    <img src="/intro.jpg" alt="Intro" />
                    <div className="dim-overlay"></div>
                </div>

                {/* 텍스트들 */}
                <div className="intro-center-text">
                    <span className="appear-text delay-1">오경찬</span>
                    <span className="appear-text delay-2 heart"> ♥ </span>
                    <span className="appear-text delay-3">유지연</span>
                </div>

                <div className="intro-bottom-text appear-text delay-4">
                    2026. 10. 09. 금요일 오후 3시
                </div>

            </div>
        </div>
    );
};

export default Intro;