import { useState, useEffect, ChangeEvent } from 'react';

export const useVideoPlayer = (videoElement: any) => {
  const [playerState, setPlayerState] = useState({
    isMuted: false,
    isPlaying: false,
    progress: 0,
    speed: 1
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying
    });
  };

  useEffect(() => {
    if (playerState.isPlaying) {
      videoElement.current.play();
    } else {
      videoElement.current.pause();
    }
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress
    });
  };

  const handleMediaProgress = (event: ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange
    });
  };

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted
    });
  };

  useEffect(() => {
    if (playerState.isMuted) {
      videoElement.current.muted = true;
    } else {
      videoElement.current.muted = false;
    }
  }, [playerState.isMuted, videoElement]);

  return {
    handleMediaProgress,
    handleOnTimeUpdate,
    playerState,
    toggleMute,
    togglePlay
  };
};
