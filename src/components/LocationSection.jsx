import { FaBus, FaMapMarkerAlt, FaSubway } from 'react-icons/fa';

function LocationSection({ weddingInfo, onCopyAddress }) {
  return (
    <section className="section location-section">
      <h2 className="section-title">LOCATION</h2>
      <h3 className="location-title">{weddingInfo.venue}</h3>
      <p className="location-desc">
        {weddingInfo.address}
        <br />
        Tel. {weddingInfo.tel}
      </p>

      <img src="/laviedouce.jpg" alt="라비두스 약도" className="map-image" />

      <div className="traffic-card">
        <div className="traffic-title">
          <FaSubway /> 지하철 안내
        </div>
        <ul>
          <li>3, 4호선 충무로역 1번 출구 도보 10분</li>
          <li>충무로역 1번 출구 앞 셔틀버스 수시 운행</li>
        </ul>
      </div>

      <div className="traffic-card">
        <div className="traffic-title">
          <FaBus /> 셔틀버스 안내
        </div>
        <p>예식 1시간 전부터 수시 운행 (대한극장 앞 탑승)</p>
      </div>

      <div className="map-buttons">
        <a href="https://map.naver.com/p/search/충무로%20라비두스" target="_blank" rel="noreferrer" className="map-btn naver">
          네이버지도
        </a>
        <a href="https://map.kakao.com/link/search/충무로%20라비두스" target="_blank" rel="noreferrer" className="map-btn kakao">
          카카오맵
        </a>
        <a href="https://www.google.com/maps/search/충무로+라비두스" target="_blank" rel="noreferrer" className="map-btn google">
          구글지도
        </a>
      </div>

      <button className="action-btn full" onClick={onCopyAddress}>
        <FaMapMarkerAlt /> 주소 복사
      </button>
    </section>
  );
}

export default LocationSection;
