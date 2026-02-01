import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [message, setMessage] = useState('');

    // 컴포넌트가 켜질 때 백엔드에 요청
    useEffect(() => {
        axios.get('http://localhost:8080/api/hello')
            .then(response => {
                setMessage(response.data.message);
                console.log("서버 응답 성공:", response.data);
            })
            .catch(error => {
                console.error("서버 연결 실패:", error);
                setMessage("서버와 연결할 수 없습니다.");
            });
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>🤵 신랑 ♥ 신부 👰</h1>
            <p>모바일 청첩장 준비 중...</p>

            <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '10px' }}>
                <strong>서버 상태:</strong> {message}
            </div>
        </div>
    );
}

export default App;