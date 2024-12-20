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
    if (isLoading || !duration) return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const seekTime = percentage * duration;
    AudioController.seek(seekTime, dispatch);
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
  };

  const handlePrevious = () => {
    if (loading) return;

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
  };

  const formatTime = (time) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-lg rounded-full shadow-lg p-2 flex items-center gap-2 group transition-all duration-300 hover:w-[80%] w-16">
      {/* Main Player Section */}
      <div className="flex items-center gap-4 min-w-[300px]">
        <div className="relative group-hover:rotate-6 transition-all duration-500">
          {currentPodcast?.image && (
            <Image
              src={currentPodcast.image}
              alt={currentPodcast.title}
              width={50}
              height={50}
              className="rounded-full shadow-lg hover:shadow-xl transition-all"
            />
          )}
        </div>

        <div className="hidden group-hover:block">
          <h3 className="font-bold text-gray-800">{currentPodcast?.title}</h3>
          <p className="text-sm text-gray-600">{currentPodcast?.artist}</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="hidden group-hover:flex flex-1 justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleShuffle())}
            className={`${
              isShuffleOn ? "text-purple-600" : "text-gray-600"
            } hover:scale-110 transition-all`}
          >
            <CiShuffle size={20} />
          </button>
          <button
            onClick={handlePrevious}
            className="hover:scale-110 transition-all"
          >
            <IoPlaySkipBackCircle size={24} />
          </button>
          <button
            onClick={() =>
              isPlaying
                ? AudioController.pause(dispatch)
                : AudioController.play(dispatch)
            }
            className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition-all"
          >
            {isPlaying ? (
              <CiPause1 size={24} className="text-white" />
            ) : (
              <CiPlay1 size={24} className="text-white" />
            )}
          </button>
          <button
            onClick={handleNext}
            className="hover:scale-110 transition-all"
          >
            <BsFillSkipEndCircleFill size={24} />
          </button>
          <button
            onClick={() => dispatch(setRepeatMode())}
            className={`${
              repeatMode !== "off" ? "text-purple-600" : "text-gray-600"
            } hover:scale-110 transition-all`}
          >
            <FaRepeat size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 mx-6">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            className="h-1 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            />
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button onClick={handleMuteToggle}>
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-purple-600"
          />
        </div>

        {/* Playlist Toggle Button */}
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-all"
        >
          <FaList size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Playlist Drawer */}
      {showPlaylist && (
        <div className="absolute bottom-full left-0 mb-4 w-80 max-h-96 overflow-y-auto bg-white rounded-2xl shadow-xl p-4">
          <h3 className="font-bold text-lg mb-4">Playlist</h3>
          <div className="space-y-2">
            {podcasts.map((podcast, index) => (
              <div
                key={podcast._id}
                onClick={() => {
                  dispatch(setCurrentPodcast(podcast));
                  AudioController.initialize(podcast.audioUrl, dispatch);
                  AudioController.play(dispatch);
                }}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer
                            ${
                              currentPodcast?._id === podcast._id
                                ? "bg-purple-50"
                                : ""
                            }`}
              >
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <p className="font-medium">{podcast.title}</p>
                  <p className="text-sm text-gray-600">{podcast.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
