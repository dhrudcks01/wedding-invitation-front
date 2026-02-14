import { FaCalendarAlt, FaPhoneAlt, FaShareAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

function InvitationSection({ contacts, openContact, onToggleContact, onOpenCalendar, onShare }) {
  return (
    <section className="section">
      <h2 className="section-title">INVITATION</h2>
      <p className="poem">
        가을의 정취가 깊어가는 10월,
        <br />
        도심 속 비밀의 정원 라비두스에서
        <br />
        저희 두 사람, 하나가 됩니다.
        <br />
        <br />
        소중한 발걸음으로 축복해 주시면
        <br />
        더없는 기쁨으로 간직하겠습니다.
      </p>

      <div className="action-row">
        <button className="action-btn" onClick={onOpenCalendar}>
          <FaCalendarAlt /> 일정 추가
        </button>
        <button className="action-btn" onClick={onShare}>
          <FaShareAlt /> 초대장 공유
        </button>
      </div>

      <div className="accordion-wrapper">
        <button className="accordion-header" onClick={onToggleContact}>
          연락처 보기 {openContact ? <IoMdClose /> : <FaPhoneAlt style={{ fontSize: 14 }} />}
        </button>
        {openContact && (
          <div className="accordion-content">
            {contacts.map((contact) => (
              <div key={contact.phone} className="contact-row">
                <span>
                  {contact.label} {contact.name}
                </span>
                <a href={`tel:${contact.phone}`} aria-label={`${contact.name}에게 전화하기`}>
                  <FaPhoneAlt />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default InvitationSection;
