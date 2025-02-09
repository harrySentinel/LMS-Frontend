import React, { useEffect, useState } from 'react';

type VideoPlayerProps = {
  videoId: string; // Cloudinary public ID of the video
  title?: string;  // Optional title prop
};

const CoursePlayer: React.FC<VideoPlayerProps> = ({ videoId, title }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) {
      setError('No video ID provided');
    }
  }, [videoId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUD_NAME}/video/upload/v1726063270/${videoId}`;

  return (
    <div style={{ position: "relative"}}>
  {title && <h2>{title}</h2>} {/* Render the title if provided */}
  <iframe
    src={cloudinaryUrl}
    width="320"  // Adjusted width to make it smaller
    height="180" // Adjusted height accordingly
    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
    title="Cloudinary Video Player"
    style={{ maxWidth: "100%", borderRadius: "8px" }} // Optional: Adding a responsive style and rounded corners
  ></iframe>
</div>

  );
};

export default CoursePlayer;
