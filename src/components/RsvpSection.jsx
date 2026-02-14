import { FaCheckCircle } from 'react-icons/fa';

function RsvpSection({ rsvpStats, rsvpForm, setRsvpForm, onSubmit }) {
  return (
    <section className="section rsvp-section">
      <h2 className="section-title">RSVP</h2>
      <p className="rsvp-caption">참석 여부와 식사/셔틀 정보를 남겨주세요.</p>

      <div className="rsvp-stats">
        <div className="stat-box">
          <strong>{rsvpStats.attendingCount}</strong>
          <span>참석</span>
        </div>
        <div className="stat-box">
          <strong>{rsvpStats.absentCount}</strong>
          <span>불참</span>
        </div>
        <div className="stat-box">
          <strong>{rsvpStats.shuttleUsers}</strong>
          <span>셔틀 이용</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="rsvp-form">
        <input
          className="guestbook-input"
          placeholder="성함"
          value={rsvpForm.name}
          onChange={(event) => setRsvpForm((prev) => ({ ...prev, name: event.target.value }))}
        />

        <div className="rsvp-grid">
          <select
            className="guestbook-input"
            value={rsvpForm.side}
            onChange={(event) => setRsvpForm((prev) => ({ ...prev, side: event.target.value }))}
          >
            <option value="신랑측">신랑측</option>
            <option value="신부측">신부측</option>
          </select>
          <select
            className="guestbook-input"
            value={rsvpForm.attending}
            onChange={(event) => setRsvpForm((prev) => ({ ...prev, attending: event.target.value }))}
          >
            <option value="참석">참석</option>
            <option value="불참">불참</option>
          </select>
        </div>

        <div className="rsvp-grid">
          <select
            className="guestbook-input"
            value={rsvpForm.meal}
            onChange={(event) => setRsvpForm((prev) => ({ ...prev, meal: event.target.value }))}
          >
            <option value="한식">식사 선호: 한식</option>
            <option value="양식">식사 선호: 양식</option>
          </select>
          <select
            className="guestbook-input"
            value={rsvpForm.shuttle}
            onChange={(event) => setRsvpForm((prev) => ({ ...prev, shuttle: event.target.value }))}
          >
            <option value="이용 안 함">셔틀 이용 안 함</option>
            <option value="이용">셔틀 이용</option>
          </select>
        </div>

        <input
          className="guestbook-input"
          type="number"
          min="1"
          max="10"
          value={rsvpForm.companions}
          onChange={(event) => setRsvpForm((prev) => ({ ...prev, companions: event.target.value }))}
          placeholder="동행 인원"
        />

        <textarea
          className="guestbook-input"
          placeholder="남기실 말씀 (선택)"
          value={rsvpForm.note}
          onChange={(event) => setRsvpForm((prev) => ({ ...prev, note: event.target.value }))}
          style={{ height: 84, resize: 'none' }}
        />

        <button type="submit" className="guestbook-btn">
          <FaCheckCircle /> 참석의사 보내기
        </button>
      </form>
    </section>
  );
}

export default RsvpSection;
