import { FaBus, FaCar, FaUtensils } from 'react-icons/fa';

function GuideSection({ timeline, faqs, openFaq, onToggleFaq }) {
  return (
    <section className="section info-section">
      <h2 className="section-title">GUIDE</h2>

      <div className="info-chip-wrap">
        <div className="info-chip">
          <FaCar /> 주차 가능 (발렛/제휴주차)
        </div>
        <div className="info-chip">
          <FaUtensils /> 식사 선호 RSVP 반영
        </div>
        <div className="info-chip">
          <FaBus /> 셔틀 운행 예정
        </div>
      </div>

      <div className="timeline-list">
        {timeline.map((item) => (
          <div className="timeline-item" key={item.time}>
            <div className="timeline-time">{item.time}</div>
            <div>
              <div className="timeline-title">{item.title}</div>
              <div className="timeline-desc">{item.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-wrap">
        {faqs.map((faq, index) => (
          <div key={faq.q} className="faq-item">
            <button className="faq-q" onClick={() => onToggleFaq(index)}>
              {faq.q}
            </button>
            {openFaq === index && <div className="faq-a">{faq.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default GuideSection;
