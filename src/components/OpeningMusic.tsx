const GRATITUDE_VIDEO_ID = "dQdfs5S6jyA";

export function OpeningMusic() {
  const params = new URLSearchParams({
    autoplay: "1",
    controls: "0",
    loop: "1",
    modestbranding: "1",
    playlist: GRATITUDE_VIDEO_ID,
    playsinline: "1",
    rel: "0"
  });

  return (
    <div className="opening-music" aria-hidden="true">
      <iframe
        title="Gratitude by Brandon Lake"
        src={`https://www.youtube.com/embed/${GRATITUDE_VIDEO_ID}?${params.toString()}`}
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}
