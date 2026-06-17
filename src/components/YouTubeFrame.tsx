export function YouTubeFrame({ title, videoId }: { title: string; videoId: string }) {
  return (
    <div className="video-shell">
      <iframe
        title={title}
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
