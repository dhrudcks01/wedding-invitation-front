function FooterSection({ weddingInfo }) {
  return (
    <footer className="footer">
      <span>The Wedding of</span>
      <strong>
        {weddingInfo.groom} & {weddingInfo.bride}
      </strong>
      <span>2026.10.09. Laviedouce</span>
    </footer>
  );
}

export default FooterSection;
