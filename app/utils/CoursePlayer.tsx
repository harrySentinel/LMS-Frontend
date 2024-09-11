


import React, { useEffect, useState } from 'react';
import axios from 'axios';

type VideoPlayerProps = {
  videoId: string; // Cloudinary public ID of the video
};

const CoursePlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Call API to get Cloudinary video URL
    const fetchVideoUrl = async () => {
      try {
        const response = await axios.post('/upload', { videoId });
        setVideoUrl(response.data.videoUrl);
      } catch (err) {
        setError('Failed to load video');
      }
    };

    if (videoId) {
      fetchVideoUrl();
    }
  }, [videoId]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  const cloudinaryUrl = ` https://res.cloudinary.com/${process.env.CLOUD_NAME}/video/upload/v1726063270/${videoId}`;
  // https://res.cloudinary.com/${process.env.CLOUD_NAME}/video/upload/v1726063270/${videoId}
  return (
    <div>
      <iframe
        src={cloudinaryUrl}
        width="640"
        height="360"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        title="Cloudinary Video Player"
      ></iframe>
    </div>
  );
};


export default CoursePlayer;





