import { FaMusic, FaPause, FaShareAlt } from 'react-icons/fa';

function FloatingControls({ hasBgm, isPlaying, onToggleMusic, onShare }) {
  return (
    <div className="control-actions">
      {hasBgm && (
        <button
          className={`music-btn ${isPlaying ? 'playing' : ''}`}
          onClick={onToggleMusic}
          type="button"
          aria-label={isPlaying ? '배경음악 일시정지' : '배경음악 재생'}
        >
          {isPlaying ? <FaPause /> : <FaMusic />}
        </button>
      )}

      <button className="share-btn" onClick={onShare} type="button" aria-label="초대장 공유">
        <FaShareAlt />
      </button>
    </div>
  );
}

export default FloatingControls;
