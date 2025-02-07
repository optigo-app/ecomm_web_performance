import React, { useState, useRef, useEffect } from "react";
import "./Video.scss";

export default function Video({videoUrl, videoId, width, height}) {

  console.log(videoUrl);
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('player', {
        videoId: {videoId},
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          loop: 1,
          autohide: 0,
          mute: 1,
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    };
  }, []);

  const onPlayerReady = (event) => {
    event.target.setVolume(50);
  };

  return (
    <div>
      <div>
        <iframe
          id="player"
          width={width}
          height={height}
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          style={{ pointerEvents: 'none' }}
          className="topVideoShow"
        ></iframe>
      </div>
    </div>
  );
}