import { useEffect, useMemo, useState } from 'react';

function GallerySection({ images }) {
  const safeImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    if (!isViewerOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsViewerOpen(false);
      }

      if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % safeImages.length);
      }

      if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isViewerOpen, safeImages.length]);

  useEffect(() => {
    if (!isViewerOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isViewerOpen]);

  if (safeImages.length === 0) {
    return (
      <section className="section">
        <h2 className="section-title">GALLERY</h2>
        <p className="empty-comment">등록된 사진이 없습니다.</p>
      </section>
    );
  }

  const boundedIndex = Math.min(selectedIndex, safeImages.length - 1);
  const onPrev = () => setSelectedIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  const onNext = () => setSelectedIndex((prev) => (prev + 1) % safeImages.length);
  const openViewer = (index) => {
    setSelectedIndex(index);
    setIsViewerOpen(true);
  };

  const onTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX);
  };

  const onTouchEnd = (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const threshold = 45;
    if (deltaX < -threshold) onNext();
    if (deltaX > threshold) onPrev();
    setTouchStartX(null);
  };

  return (
    <section className="section">
      <h2 className="section-title">GALLERY</h2>

      <div className="gallery-overview">
        {safeImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            className="gallery-tile"
            onClick={() => openViewer(index)}
            type="button"
            aria-label={`웨딩 사진 ${index + 1} 선택`}
          >
            <img src={image} alt={`웨딩 사진 ${index + 1}`} className="gallery-tile-image" />
          </button>
        ))}
      </div>

      {isViewerOpen && (
        <div
          className="gallery-viewer"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsViewerOpen(false);
          }}
          role="presentation"
        >
          <button className="viewer-close" onClick={() => setIsViewerOpen(false)} type="button" aria-label="닫기">
            닫기
          </button>
          <button className="viewer-nav left" onClick={onPrev} type="button" aria-label="이전 사진">
            ‹
          </button>
          <div className="gallery-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="gallery-track" style={{ transform: `translateX(-${boundedIndex * 100}%)` }}>
              {safeImages.map((image, index) => (
                <div key={`${image}-viewer-${index}`} className="gallery-slide">
                  <img src={image} alt={`웨딩 사진 크게보기 ${index + 1}`} className="gallery-viewer-image" />
                </div>
              ))}
            </div>
          </div>
          <button className="viewer-nav right" onClick={onNext} type="button" aria-label="다음 사진">
            ›
          </button>
          <div className="viewer-index">
            {boundedIndex + 1} / {safeImages.length}
          </div>
        </div>
      )}
    </section>
  );
}

export default GallerySection;
