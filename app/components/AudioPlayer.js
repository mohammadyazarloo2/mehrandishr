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
import { podcasts } from '../data/podcasts';  // یا مسیر صحیح فایل podcasts


export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
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
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === "all") {
      if (isShuffleOn) {
        dispatch(nextTrack());
        dispatch(setIsPlaying(true));
      } else {
        dispatch(nextTrack());
        dispatch(setIsPlaying(true));
      }
    } else {
      const currentIndex = podcasts.findIndex(
        (p) => p.id === currentPodcast.id
      );
      if (currentIndex < podcasts.length - 1) {
        if (isShuffleOn) {
          dispatch(nextTrack());
        } else {
          dispatch(nextTrack());
        }
        dispatch(setIsPlaying(true));
      } else {
        dispatch(setIsPlaying(false));
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      setIsReady(true);
    }
  }, []);
  useEffect(() => {
    console.log("Current Podcast:", currentPodcast);
    console.log("Audio URL:", currentPodcast?.audioSrc);
  }, [currentPodcast]);

  useEffect(() => {
    if (!isReady || !audioRef.current || !currentPodcast?.audioSrc) return;

    const audio = audioRef.current;
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio started playing");
          })
          .catch((error) => {
            console.log("Playback error:", error);
            dispatch(setIsPlaying(false));
          });
      }
    } else {
      audio.pause();
    }
  }, [isReady, isPlaying, currentPodcast]);

  const handlePlayPause = () => {
    dispatch(togglePlay());
  };

  const handleTimeUpdate = () => {
    dispatch(setCurrentTime(audioRef.current.currentTime));
  };

  const handleLoadMetadata = (e) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      dispatch(setDuration(duration));
      setCurrentTime(0);
    }
  };

  const handleSeek = (e) => {
    const timelineWidth = e.currentTarget.clientWidth;
    const clickPosition = timelineWidth - e.nativeEvent.offsetX;
    const seekTime = (clickPosition / timelineWidth) * duration;
    audioRef.current.currentTime = seekTime;
    dispatch(setCurrentTime(seekTime));
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

  const handleNext = () => {
    dispatch(nextTrack());
    dispatch(setIsPlaying(true)); // اضافه کردن این خط
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handlePrev = () => {
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
        </div>
      </div>
    </>
  );
}
