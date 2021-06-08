import React, { useEffect, useState } from "react";
import { Video } from "./Video";
import { VideoItem } from "./VideoItem";
import { getVideos } from "./VideoService";

export const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const res = await getVideos();

    const formatedVideos = res.data
      .map((video) => {
        return {
          ...video,
          createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
          updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    setVideos(formatedVideos);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="row">
      {videos.map((video, index) => {
        return <VideoItem video={video} key={index} loadVideos={loadVideos} />;
      })}
    </div>
  );
};
