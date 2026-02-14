import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'wedding_guestbook_comments';

const toYmd = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toISOString().split('T')[0];
};

const loadLocalComments = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveLocalComments = (comments) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(comments));
};

const getCommentsWithFallback = async (apiBaseUrl) => {
  if (apiBaseUrl) {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/comments`);
      return { comments: res.data, source: '서버 연동' };
    } catch {
      // 서버 연결 실패 시 로컬 fallback
    }
  }

  return { comments: loadLocalComments(), source: '로컬 저장' };
};

function Guestbook() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', password: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sourceLabel, setSourceLabel] = useState('');

  const apiBaseUrl = useMemo(() => {
    const value = import.meta.env.VITE_API_BASE_URL;
    return value ? value.replace(/\/$/, '') : '';
  }, []);

  useEffect(() => {
    let active = true;

    getCommentsWithFallback(apiBaseUrl).then((result) => {
      if (!active) return;
      setComments(result.comments);
      setSourceLabel(result.source);
    });

    return () => {
      active = false;
    };
  }, [apiBaseUrl]);

  const refreshComments = async () => {
    const result = await getCommentsWithFallback(apiBaseUrl);
    setComments(result.comments);
    setSourceLabel(result.source);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedContent = form.content.trim();

    if (!trimmedName || !trimmedContent) {
      alert('이름과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    if (apiBaseUrl) {
      try {
        await axios.post(`${apiBaseUrl}/api/comments`, {
          name: trimmedName,
          password: form.password,
          content: trimmedContent,
        });
        alert('메시지가 등록되었습니다!');
        setForm({ name: '', password: '', content: '' });
        await refreshComments();
        setIsSubmitting(false);
        return;
      } catch {
        // 서버 등록 실패 시 로컬 fallback
      }
    }

    const newComment = {
      id: Date.now(),
      name: trimmedName,
      password: form.password,
      content: trimmedContent,
      createdAt: new Date().toISOString(),
    };

    const nextComments = [newComment, ...loadLocalComments()];
    saveLocalComments(nextComments);
    setComments(nextComments);
    setSourceLabel('로컬 저장');
    setForm({ name: '', password: '', content: '' });
    setIsSubmitting(false);
    alert('메시지가 등록되었습니다!');
  };

  const handleDelete = async (id) => {
    const password = prompt('비밀번호를 입력하세요:');
    if (!password) return;

    if (apiBaseUrl) {
      try {
        const res = await axios.delete(`${apiBaseUrl}/api/comments/${id}`, { params: { password } });
        if (res.data) {
          alert('삭제되었습니다.');
          await refreshComments();
          return;
        }
        alert('비밀번호가 틀립니다.');
        return;
      } catch {
        // 서버 삭제 실패 시 로컬 fallback
      }
    }

    const target = comments.find((comment) => comment.id === id);
    if (!target) return;

    if ((target.password || '') !== password) {
      alert('비밀번호가 틀립니다.');
      return;
    }

    const nextComments = comments.filter((comment) => comment.id !== id);
    saveLocalComments(nextComments);
    setComments(nextComments);
    setSourceLabel('로컬 저장');
    alert('삭제되었습니다.');
  };

  return (
    <div className="guestbook-wrap">
      <div className="guestbook-source">저장 방식: {sourceLabel || '확인 중'}</div>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="guestbook-input"
            placeholder="이름"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ flex: 1 }}
          />
          <input
            className="guestbook-input"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ flex: 1 }}
          />
        </div>
        <textarea
          className="guestbook-input"
          placeholder="축하 메시지를 남겨주세요"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          style={{ height: 90, resize: 'none' }}
        />
        <button type="submit" className="guestbook-btn" disabled={isSubmitting}>
          {isSubmitting ? '등록 중...' : '축하 메시지 남기기'}
        </button>
      </form>

      <div>
        {comments.length === 0 && <p className="empty-comment">첫 축하 메시지를 남겨주세요.</p>}

        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <span className="comment-name">{comment.name}</span>
              <span>{toYmd(comment.createdAt)}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
            <button onClick={() => handleDelete(comment.id)} className="delete-comment-btn" aria-label="댓글 삭제">
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guestbook;
