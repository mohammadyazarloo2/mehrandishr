"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
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
  incrementListens,
} from "../redux/audioSlice";
import { podcasts } from "../data/podcasts";
import { AudioController } from "../utils/AudioController";
import { usePathname } from "next/navigation";
import { CiShuffle } from "react-icons/ci";
import { IoPlaySkipBackCircle } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { BsFillSkipEndCircleFill } from "react-icons/bs";
import { FaRepeat } from "react-icons/fa6";
import { FaVolumeMute, FaVolumeUp, FaTimes } from "react-icons/fa";
import { fetchSettings } from "../redux/settingsSlice";

export default function HomeAudioPlayer() {
  const [loading, setLoading] = useState(true);
  const [currentPodcastIndex, setCurrentPodcastIndex] = useState(0);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
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
  const [showModal, setShowModal] = useState(false);
  const [podcasts, setPodcasts] = useState(null);
  const settings = useSelector((state) => state.settings.data);
  const [playedPodcasts, setPlayedPodcasts] = useState(new Set());

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

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

  const handleLoadMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    }
  };

  const handleAudioEnd = () => {
    if (currentPodcast < podcasts.length - 1) {
      handleNext();
    } else {
      AudioController.stop(dispatch);
    }
  };

  const handlePlayPause = async () => {
    if (loading || !currentPodcast?.audioUrl) return;

    if (isPlaying) {
      AudioController.pause(dispatch);
    } else {
      await AudioController.play(dispatch);

      // چک میکنیم این پادکست قبلاً پخش شده یا نه
      if (!playedPodcasts.has(currentPodcast._id)) {
        dispatch(incrementListens());

        fetch(`/api/podcasts/${currentPodcast._id}/listen`, {
          method: "POST",
        });

        // اضافه کردن به لیست پخش شده‌ها
        setPlayedPodcasts((prev) => new Set(prev).add(currentPodcast._id));
      }
    }
  };
  // const handlePlayPause = async () => {
  //   if (loading || !currentPodcast?.audioUrl) return;
  //   if (isPlaying) {
  //     AudioController.pause(dispatch);
  //   } else {
  //     await AudioController.play(dispatch);
  //   }
  // };

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const bounds = progressBar.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    const seekTime = percentage * duration;

    AudioController.seek(seekTime, dispatch);
  };
  // const handleSeek = (value) => {
  //   AudioController.seek(value, dispatch);
  // };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    AudioController.setVolume(newVolume, dispatch);
  };

  const handlePlaybackRateChange = (rate) => {
    AudioController.setPlaybackRate(rate);
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

  // const handlePrevious = () => {
  //   dispatch(prevTrack());
  //   const prevPodcast = podcasts[currentPodcastIndex - 1];
  //   if (prevPodcast) {
  //     AudioController.changeTrack(prevPodcast.audioSrc, dispatch);
  //   }
  // };

  const handleRepeatClick = () => {
    dispatch(setRepeatMode());
    // وقتی آهنگ تمام شد، براساس حالت تکرار عمل می‌کنیم
    if (repeatMode === "one") {
      AudioController.seek(0, dispatch);
      AudioController.play(dispatch);
    } else if (repeatMode === "all") {
      handleNext();
    }
  };

  // const handleRepeatClick = () => {
  //   dispatch(setRepeatMode());
  // };
  // const handleShuffleClick = () => {
  //   dispatch(toggleShuffle());
  //   // پخش تصادفی آهنگ‌ها
  //   if (!isShuffleOn) {
  //     const currentIndex = podcasts.findIndex(p => p._id === currentPodcast?._id);
  //     const nextIndex = Math.floor(Math.random() * podcasts.length);
  //     dispatch(setCurrentPodcast(podcasts[nextIndex]));
  //   }
  // };

  const formatTime = (time) => {
    if (!time || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="course-padcast-head text-center mb-8 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent inline-block transform hover:scale-105 transition-all duration-300">
          {settings?.features?.podcast?.title}
        </h2>
      </div>

      <div className="course-padcast-body flex flex-col lg:flex-row items-center gap-6 md:gap-12">
        <div className="course-padcast-content transform hover:-translate-y-2 transition-all duration-500 w-full lg:w-1/3">
          <div className="backdrop-blur-lg bg-white/80 p-4 md:p-8 rounded-3xl shadow-2xl hover:shadow-purple-200/50">
            <p className="leading-relaxed text-gray-700 text-base md:text-lg">
              {settings?.features?.podcast?.description}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 md:mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              مشاهده همه پادکست‌ها
            </button>
          </div>
        </div>

        <div className="course-padcast-player flex-1">
          <div className="player bg-white/90 backdrop-blur-xl rounded-3xl p-4 md:p-8 shadow-xl transform hover:scale-105 transition-all duration-500">
            <div className="player-img relative mb-4 md:mb-8 group perspective">
              <div className="relative transform transition-all duration-700 group-hover:rotate-6 preserve-3d">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                {currentPodcast?.image && (
                  <Image
                    src={currentPodcast.image}
                    width={300}
                    height={300}
                    alt={currentPodcast.title}
                    className="rounded-2xl shadow-xl w-full h-auto"
                  />
                )}
              </div>
            </div>

            <div className="podcast-info mb-4 md:mb-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                {currentPodcast?.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-2">
                {currentPodcast?.description}
              </p>
              <span className="text-xs md:text-sm bg-purple-100 text-purple-600 px-2 md:px-3 py-1 rounded-full">
                {formatTime(duration)}
              </span>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="progress-bar relative px-2">
                <div
                  className="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="controls flex flex-col gap-4 md:gap-6">
                <div className="flex justify-center items-center gap-4 md:gap-8">
                  <button
                    onClick={() => dispatch(toggleShuffle())}
                    className={`transform hover:scale-110 transition-all ${
                      isShuffleOn ? "text-purple-600" : "text-gray-600"
                    }`}
                  >
                    <CiShuffle className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={handlePrevious}
                    className="transform hover:scale-110 transition-all text-gray-600"
                  >
                    <IoPlaySkipBackCircle className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                  <button
                    onClick={() => {
                      if (isPlaying) {
                        AudioController.pause(dispatch);
                      } else {
                        AudioController.play(dispatch);
                        // فقط اگر قبلاً پخش نشده باشه
                        if (!playedPodcasts.has(currentPodcast._id)) {
                          dispatch(incrementListens());
                          fetch(`/api/podcasts/${currentPodcast._id}/listen`, {
                            method: "POST",
                          });
                          setPlayedPodcasts((prev) =>
                            new Set(prev).add(currentPodcast._id)
                          );
                        }
                      }
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 md:p-4 rounded-full transform hover:scale-110 transition-all"
                  >
                    {isPlaying ? (
                      <CiPause1 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    ) : (
                      <CiPlay1 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    )}
                  </button>
                  <button
                    onClick={handleNext}
                    className="transform hover:scale-110 transition-all text-gray-600"
                  >
                    <BsFillSkipEndCircleFill className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                  <button
                    onClick={handleRepeatClick}
                    className={`transform hover:scale-110 transition-all ${
                      repeatMode !== "off" ? "text-purple-600" : "text-gray-600"
                    }`}
                  >
                    <FaRepeat className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                <div className="volume-control flex items-center gap-2 md:gap-4 justify-center">
                  <button onClick={handleMuteToggle} className="text-gray-600">
                    {isMuted ? (
                      <FaVolumeMute className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <FaVolumeUp className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    className="w-24 md:w-32 accent-purple-600"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Podcast List */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-4 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold">لیست پادکست‌ها</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="grid gap-4">
              {podcasts?.map((podcast) => (
                <div
                  key={podcast._id}
                  onClick={() => {
                    dispatch(setCurrentPodcast(podcast));
                    setShowModal(false);
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-purple-50 cursor-pointer transition-all"
                >
                  <Image
                    src={podcast.image}
                    width={80}
                    height={80}
                    alt={podcast.title}
                    className="rounded-xl"
                  />
                  <div>
                    <h4 className="font-bold mb-1">{podcast.title}</h4>
                    <p className="text-sm text-gray-600">
                      {podcast.description}
                    </p>
                    <span className="text-xs text-purple-600">
                      {podcast.listens}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
