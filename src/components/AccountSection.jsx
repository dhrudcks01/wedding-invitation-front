import { FaCopy } from 'react-icons/fa';

function AccountSection({ openAccount, onToggleAccount, accounts, onCopyAccount }) {
  return (
    <section className="section account-section">
      <h2 className="section-title">ACCOUNT</h2>
      <p className="account-help">
        참석이 어려우신 분들을 위해
        <br />
        마음 전하실 계좌번호를 안내드립니다.
      </p>

      <div className="accordion-wrapper">
        <button className="accordion-header" onClick={onToggleAccount}>
          계좌번호 보기 {openAccount ? '접기' : '펼치기'}
        </button>

        {openAccount && (
          <div className="accordion-content">
            {accounts.map((account) => (
              <div key={account.number} className="account-box">
                <div className="account-info">
                  <div className="account-side">{account.side}</div>
                  <span className="bank">{account.bank}</span> {account.number}
                  <br />
                  (예금주: {account.holder})
                </div>
                <button className="copy-btn" onClick={() => onCopyAccount(account.number)}>
                  <FaCopy /> 복사
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AccountSection;
