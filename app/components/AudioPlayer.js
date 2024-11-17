"use client";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { IoPlaySkipBackCircle } from "react-icons/io5";
import { BsFillSkipEndCircleFill } from "react-icons/bs";
import { CiShuffle } from "react-icons/ci";
import { FaRepeat } from "react-icons/fa6";
import {
  togglePlay,
  setCurrentTime,
  setDuration,
  nextTrack,
  prevTrack,
  setVolume,
  toggleMute,
  setRepeatMode,
  toggleShuffle,
  setIsPlaying,
} from "../redux/audioSlice";
import { podcasts } from "../data/podcasts"; // یا مسیر صحیح فایل podcasts
import { AudioController } from "../utils/AudioController";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentPodcast,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    repeatMode,
    isShuffleOn,
  } = useSelector((state) => state.audio);

  const handleAudioEnd = () => {
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(nextTrack());
      dispatch(setIsPlaying(true));
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // useEffect(() => {
  //   if (audioRef.current) {
  //     setIsReady(true);
  //   }
  // }, []);
  useEffect(() => {
    if (currentPodcast?.audioSrc) {
      AudioController.initialize(currentPodcast.audioSrc, dispatch);
    }
    return () => AudioController.cleanup();
  }, [currentPodcast?.audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.addEventListener('play', () => dispatch(setIsPlaying(true)));
        audioRef.current.addEventListener('pause', () => dispatch(setIsPlaying(false)));
        audioRef.current.addEventListener('ended', handleAudioEnd);
        
        return () => {
            audioRef.current?.removeEventListener('play', () => dispatch(setIsPlaying(true)));
            audioRef.current?.removeEventListener('pause', () => dispatch(setIsPlaying(false)));
            audioRef.current?.removeEventListener('ended', handleAudioEnd);
        };
    }
}, []);

  // useEffect(() => {
  //   if (!isReady || !audioRef.current || !currentPodcast?.audioSrc) return;

  //   const audio = audioRef.current;
  //   audio.load(); // Force reload audio when source changes

  //   // ... rest of the code
  // }, [isReady, isPlaying, currentPodcast]);

  //   if (isPlaying) {
  //     const playPromise = audio.play();
  //     if (playPromise !== undefined) {
  //       playPromise
  //         .then(() => {
  //           console.log("Audio started playing");
  //         })
  //         .catch((error) => {
  //           console.log("Playback error:", error);
  //           dispatch(setIsPlaying(false));
  //         });
  //     }
  //   } else {
  //     audio.pause();
  //   }

  //   // Cleanup function
  //   return () => {
  //     audio.pause();
  //   };
  // }, [isReady, isPlaying, currentPodcast]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await AudioController.pause(dispatch);
    } else {
      await AudioController.play(dispatch);
    }
  };

  const handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    dispatch(setCurrentTime(currentTime));
  };

  const handleLoadMetadata = (e) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      dispatch(setDuration(duration));
      dispatch(setCurrentTime(0));
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  };

  const handleSeek = (e) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch(setCurrentTime(time));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    audioRef.current.volume = newVolume;
  };

  const handleMuteToggle = () => {
    dispatch(toggleMute());
    audioRef.current.volume = isMuted ? volume : 0;
  };

  const handleRepeatClick = () => {
    dispatch(setRepeatMode());
  };

  const handleShuffleClick = () => {
    dispatch(toggleShuffle());
  };


  const getCurrentIndex = () => {
    return podcasts.findIndex(podcast => podcast.id === currentPodcast?.id);
  };
  
  const getNextIndex = () => {
    const currentIndex = getCurrentIndex();
    return isShuffleOn 
      ? Math.floor(Math.random() * podcasts.length)
      : (currentIndex + 1) % podcasts.length;
  };
  
  const getPrevIndex = () => {
    const currentIndex = getCurrentIndex();
    return currentIndex === 0 ? podcasts.length - 1 : currentIndex - 1;
  };

  const handleNext = () => {
    const nextIndex = getNextIndex();
    AudioController.changeTrack(podcasts[nextIndex].audioSrc, dispatch);
    dispatch(nextTrack());
  };
  
  const handlePrev = () => {
    const prevIndex = getPrevIndex();
    AudioController.changeTrack(podcasts[prevIndex].audioSrc, dispatch);
    dispatch(prevTrack());
  };

  const handleEnded = () => {
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(nextTrack());
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <>
      <audio
        ref={audioRef}
        src={currentPodcast?.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadMetadata}
        onEnded={handleAudioEnd}
      />
      <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-lg rounded-full shadow-lg p-2 flex items-center gap-2 hover:w-auto w-16 group transition-all duration-300">
        <div className="flex items-center gap-2">
          <Image
            src={currentPodcast?.image}
            alt={currentPodcast?.title}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="hidden group-hover:block whitespace-nowrap">
            <h3 className="font-bold text-sm">{currentPodcast?.title}</h3>
            <p className="text-xs text-gray-600">{currentPodcast?.artist}</p>
          </div>
        </div>

        <div className="hidden group-hover:flex items-center gap-2 mx-4">
          <button
            onClick={handleShuffleClick}
            className={`${isShuffleOn ? "text-purple-600" : "text-gray-600"}`}
          >
            <CiShuffle size={20} />
          </button>
          <button onClick={handlePrev}>
            <IoPlaySkipBackCircle size={24} />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? <CiPause1 size={28} /> : <CiPlay1 size={28} />}
          </button>
          <button onClick={handleNext}>
            <BsFillSkipEndCircleFill size={24} />
          </button>
          <button
            onClick={handleRepeatClick}
            className={`${
              repeatMode !== "off" ? "text-purple-600" : "text-gray-600"
            }`}
          >
            <FaRepeat size={20} />
          </button>
        </div>

        <div className="hidden group-hover:block">
          <div className="flex justify-between text-xs">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16"
          />
          <div
            className="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform origin-left hover:scale-x-105 transition-transform"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
