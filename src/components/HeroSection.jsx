function HeroSection({ weddingInfo, dDay, remainingTime }) {
  return (
    <section className="hero">
      <img src="/intro.jpg" alt="웨딩 메인사진" className="main-photo" />
      <div className="names">
        {weddingInfo.groom} <span className="and">|</span> {weddingInfo.bride}
      </div>
      <p className="date-info">
        {weddingInfo.displayDate}
        <br />
        {weddingInfo.venue}
      </p>
      <div className="d-day-badge">{dDay}</div>
      <div className="countdown">{remainingTime}</div>
    </section>
  );
}

export default HeroSection;
