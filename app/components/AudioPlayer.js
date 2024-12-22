"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { CiPlay1, CiPause1, CiShuffle } from "react-icons/ci";
import { IoPlaySkipBackCircle } from "react-icons/io5";
import { BsFillSkipEndCircleFill } from "react-icons/bs";
import { FaRepeat } from "react-icons/fa6";
import {
  nextTrack,
  prevTrack,
  setRepeatMode,
  toggleShuffle,
  setCurrentTime,
  setIsPlaying,
  setCurrentPodcast,
  setVolume,
  toggleMute,
} from "../redux/audioSlice";
import { AudioController } from "../utils/AudioController";
import { FaVolumeMute, FaVolumeUp, FaList } from "react-icons/fa";

export default function AudioPlayer() {
  const dispatch = useDispatch();
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const audioRef = useRef(null);
  const [showPlaylist, setShowPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("/api/podcasts");
        const data = await response.json();
        console.log("Fetched podcasts:", data.podcasts);
        if (data.podcasts && data.podcasts.length > 0) {
          setPodcasts(data.podcasts);
          if (!currentPodcast?.title) {
            dispatch(setCurrentPodcast(data.podcasts[0]));
            AudioController.initialize(data.podcasts[0].audioUrl, dispatch);
          }
        }
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchPodcasts();
  }, [dispatch]);

  useEffect(() => {
    if (currentPodcast?.audioUrl) {
      AudioController.initialize(currentPodcast.audioUrl, dispatch);
    }
    return () => AudioController.cleanup();
  }, [currentPodcast?.audioUrl, dispatch]);

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
    let progressInterval;
    if (isPlaying && !isLoading) {
      progressInterval = setInterval(() => {
        const currentTime = AudioController.getCurrentTime();
        dispatch(setCurrentTime(currentTime));

        if (currentTime >= duration) {
          if (repeatMode === "one") {
            AudioController.seek(0, dispatch);
            AudioController.play(dispatch);
          } else if (repeatMode === "all") {
            handleNext();
          } else {
            dispatch(setIsPlaying(false));
          }
        }
      }, 1000);
    }
    return () => clearInterval(progressInterval);
  }, [isPlaying, isLoading, repeatMode, duration, dispatch]);

  const handlePlayPause = async () => {
    if (!currentPodcast?.audioSrc || isLoading) return; // Change audioUrl to audioSrc

    try {
      if (isPlaying) {
        AudioController.pause(dispatch);
      } else {
        await AudioController.play(dispatch);
      }
    } catch (error) {
      console.error("Playback control error:", error);
    }
  };

  const handleSeek = (e) => {
    const progressBar = e.target.getBoundingClientRect();
    const clickPosition = e.clientX - progressBar.left;
    const clickPercentage = clickPosition / progressBar.width;
    const seekTime = duration * clickPercentage;

    if (seekTime >= 0 && seekTime <= duration) {
      AudioController.seek(seekTime, dispatch);
      dispatch(setCurrentTime(seekTime));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    AudioController.setVolume(newVolume, dispatch);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      AudioController.unmute(dispatch);
    } else {
      AudioController.mute(dispatch);
    }
  };

  const handleNext = () => {
    if (loading) return;
    setLoading(true);
    const currentIndex = podcasts.findIndex(
      (p) => p._id === currentPodcast?._id
    );
    let nextPodcast;

    if (currentIndex === podcasts.length - 1) {
      // اگر آخرین پادکست است، به اولین پادکست برو
      nextPodcast = podcasts[0];
    } else {
      // در غیر این صورت به پادکست بعدی برو
      nextPodcast = podcasts[currentIndex + 1];
    }

    dispatch(setCurrentPodcast(nextPodcast));
    AudioController.initialize(nextPodcast.audioUrl, dispatch);
    AudioController.play(dispatch);
    setLoading(false);
  };

  const handlePrevious = () => {
    if (loading) return;
    setLoading(true);

    const currentIndex = podcasts.findIndex(
      (p) => p._id === currentPodcast?._id
    );
    let prevPodcast;

    if (currentIndex === 0) {
      // اگر اولین پادکست است، به آخرین پادکست برو
      prevPodcast = podcasts[podcasts.length - 1];
    } else {
      // در غیر این صورت به پادکست قبلی برو
      prevPodcast = podcasts[currentIndex - 1];
    }

    dispatch(setCurrentPodcast(prevPodcast));
    AudioController.initialize(prevPodcast.audioUrl, dispatch);
    AudioController.play(dispatch);
    setLoading(false);
  };

  const formatTime = (time) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 md:bottom-4 left-0 md:left-4 right-0 md:right-auto bg-white/90 backdrop-blur-lg rounded-none md:rounded-full shadow-lg p-2 md:p-3 flex items-center gap-2 group transition-all duration-300 md:hover:w-[80%] w-full md:w-16">
      {/* Main Player Section */}
      <div className="flex items-center gap-2 md:gap-4 min-w-[200px] md:min-w-[300px]">
        <div className="relative group-hover:rotate-6 transition-all duration-500">
          {currentPodcast?.image && (
            <Image
              src={currentPodcast.image}
              alt={currentPodcast.title}
              width={40}
              height={40}
              className="rounded-full shadow-lg hover:shadow-xl transition-all"
            />
          )}
        </div>

        <div className="hidden group-hover:block">
          <h3 className="font-bold text-sm md:text-base text-gray-800 truncate">
            {currentPodcast?.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 truncate">
            {currentPodcast?.artist}
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex md:hidden group-hover:flex flex-1 justify-between items-center px-2 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => dispatch(toggleShuffle())}
            className={`${isShuffleOn ? "text-purple-600" : "text-gray-600"}`}
          >
            <CiShuffle className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button onClick={handlePrevious}>
            <IoPlaySkipBackCircle className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={() =>
              isPlaying
                ? AudioController.pause(dispatch)
                : AudioController.play(dispatch)
            }
            className="bg-purple-600 p-2 md:p-3 rounded-full"
          >
            {isPlaying ? (
              <CiPause1 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            ) : (
              <CiPlay1 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            )}
          </button>
          <button onClick={handleNext}>
            <BsFillSkipEndCircleFill className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button onClick={() => dispatch(setRepeatMode())}>
            <FaRepeat className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="hidden md:flex flex-1 mx-4 md:mx-6">
          <div className="w-full">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div
              className="h-1 bg-gray-200 rounded-full cursor-pointer relative"
              onClick={handleSeek}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={handleMuteToggle}>
            {isMuted ? (
              <FaVolumeMute className="w-4 h-4" />
            ) : (
              <FaVolumeUp className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            className="w-16 md:w-20"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
          />
        </div>

        {/* Playlist Toggle */}
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="hidden md:block ml-2 md:ml-4"
        >
          <FaList className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
        </button>
      </div>

      {/* Playlist Drawer */}
      {showPlaylist && (
        <div className="absolute bottom-full left-0 mb-4 w-72 md:w-80 max-h-80 md:max-h-96 overflow-y-auto bg-white rounded-2xl shadow-xl p-4">
          <h3 className="font-bold text-base md:text-lg mb-4">پلی‌لیست</h3>
          <div className="space-y-2">
            {podcasts.map((podcast) => (
              <div
                key={podcast._id}
                onClick={() => {
                  dispatch(setCurrentPodcast(podcast));
                  AudioController.initialize(podcast.audioUrl, dispatch);
                  AudioController.play(dispatch);
                }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {podcast.title}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {podcast.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
