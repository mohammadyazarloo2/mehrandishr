import { useRef, useState } from 'react';
import Image from 'next/image';
import { IoPlaySkipBackCircle } from 'react-icons/io5';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import { BsFillSkipEndCircleFill } from 'react-icons/bs';
import { FaRepeat, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const PodcastPlayer = ({ currentPodcast }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off');

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-500">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentPodcast?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadMetadata}
      />

      {/* Podcast Image */}
      <div className="player-img relative mb-8 group perspective">
        <div className="relative transform transition-all duration-700 group-hover:rotate-6 preserve-3d">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <Image
            src={currentPodcast?.image}
            width={200}
            height={200}
            alt={currentPodcast?.title}
          />
        </div>
      </div>

      {/* Podcast Info */}
      <div className="podcast-info mb-6 text-center">
        <h3 className="text-xl font-bold">{currentPodcast?.title}</h3>
        <p className="text-gray-600">{currentPodcast?.description}</p>
        <span className="text-sm">{formatTime(duration)}</span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-6">
        <div
          className="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform origin-left hover:scale-x-105 transition-transform"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>

        {/* Controls */}
        <div className="player-actions flex flex-col gap-4">
          {/* Play/Pause Controls */}
          <div className="flex justify-center items-center gap-8">
            <button onClick={() => {}} className="text-4xl text-gray-700 hover:text-purple-600">
              <IoPlaySkipBackCircle />
            </button>
            <button onClick={handlePlayPause} className="text-5xl text-gray-700 hover:text-purple-600">
              {isPlaying ? <CiPause1 /> : <CiPlay1 />}
            </button>
            <button onClick={() => {}} className="text-4xl text-gray-700 hover:text-purple-600">
              <BsFillSkipEndCircleFill />
            </button>
          </div>

          {/* Volume and Time Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMuted(!isMuted)} className="text-xl text-gray-700">
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-gray-200 rounded-full accent-purple-500"
              />
            </div>
            <div className="flex text-sm text-gray-600 font-medium gap-2">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
