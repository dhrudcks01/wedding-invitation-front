import { useState, useEffect } from 'react';
import axios from 'axios';

function Guestbook() {
    const [comments, setComments] = useState([]);
    const [form, setForm] = useState({ name: '', password: '', content: '' });

    const fetchComments = () => {
        axios.get('http://localhost:8080/api/comments')
            .then(res => setComments(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.content) return alert("내용을 입력해주세요!");

        axios.post('http://localhost:8080/api/comments', form)
            .then(() => {
                alert("메시지가 등록되었습니다!");
                setForm({ name: '', password: '', content: '' });
                fetchComments();
            });
    };

    const handleDelete = (id) => {
        const password = prompt("비밀번호를 입력하세요:");
        if (!password) return;
        axios.delete(`http://localhost:8080/api/comments/${id}`, { params: { password } })
            .then(res => {
                if(res.data) { alert("삭제되었습니다."); fetchComments(); }
                else alert("비밀번호가 틀립니다.");
            });
    };

    return (
        <div style={{ textAlign: 'left' }}>
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <input
                        className="guestbook-input"
                        placeholder="이름"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        style={{flex: 1}}
                    />
                    <input
                        className="guestbook-input"
                        type="password"
                        placeholder="비밀번호"
                        value={form.password}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        style={{flex: 1}}
                    />
                </div>
                <textarea
                    className="guestbook-input"
                    placeholder="축하 메시지를 남겨주세요"
                    value={form.content}
                    onChange={(e) => setForm({...form, content: e.target.value})}
                    style={{ height: '80px', resize: 'none' }}
                />
                <button type="submit" className="guestbook-btn">축하 메시지 남기기</button>
            </form>

            <div>
                {comments.map((c) => (
                    <div key={c.id} className="comment-card">
                        <div className="comment-header">
                            <span className="comment-name">{c.name}</span>
                            <span>{c.createdAt.split('T')[0]}</span>
                        </div>
                        <div style={{fontSize: '14px', lineHeight: '1.5', color: '#444'}}>
                            {c.content}
                        </div>
                        <button
                            onClick={() => handleDelete(c.id)}
                            style={{position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#ccc', cursor: 'pointer'}}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Guestbook;