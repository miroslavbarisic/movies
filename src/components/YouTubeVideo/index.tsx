interface YouTubeVideoProps {
  videoId: string;
  className: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, className }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={`youtube-video ${className}`}>
      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;