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
  setLoading,
  setCurrentPodcast,
} from "../redux/audioSlice";
let globalAudio = new Audio();

export const AudioController = {
  isPlaying: false,

  initialize(audioSrc, dispatch) {
    this.cleanup();
    globalAudio.src = audioSrc;

    const onTimeUpdate = () => {
      dispatch(setCurrentTime(globalAudio.currentTime));
    };

    const onLoadedMetadata = () => {
      dispatch(setDuration(globalAudio.duration));
      dispatch(setLoading(false));
    };

    const onEnded = () => {
      dispatch(setIsPlaying(false));
      dispatch(setCurrentTime(0));
      this.isPlaying = false;
    };

    const onError = (error) => {
      console.error('Audio error:', error);
      dispatch(setLoading(false));
      dispatch(setIsPlaying(false));
    };

    globalAudio.addEventListener("timeupdate", onTimeUpdate);
    globalAudio.addEventListener("loadedmetadata", onLoadedMetadata);
    globalAudio.addEventListener("ended", onEnded);
    globalAudio.addEventListener("error", onError);

    this.eventListeners = {
      timeupdate: onTimeUpdate,
      loadedmetadata: onLoadedMetadata,
      ended: onEnded,
      error: onError
    };

    return globalAudio;
  },

  cleanup() {
    if (this.eventListeners) {
      Object.entries(this.eventListeners).forEach(([event, listener]) => {
        globalAudio.removeEventListener(event, listener);
      });
    }
  },

  changeTrack(audioSrc, dispatch) {
    dispatch(setLoading(true));
    globalAudio.pause();
    dispatch(setIsPlaying(false));
    dispatch(setCurrentTime(0));
    dispatch(setDuration(0));
    
    this.cleanup();
    globalAudio.src = audioSrc;
    this.initialize(audioSrc, dispatch);
  },

  async play(dispatch) {
    if (globalAudio) {
      try {
        dispatch(setLoading(true));
        await globalAudio.play();
        this.isPlaying = true;
        dispatch(setIsPlaying(true));
      } catch (error) {
        console.error('Playback error:', error);
        this.isPlaying = false;
        dispatch(setIsPlaying(false));
      } finally {
        dispatch(setLoading(false));
      }
    }
  },

  pause(dispatch) {
    if (globalAudio) {
      globalAudio.pause();
      this.isPlaying = false;
      dispatch(setIsPlaying(false));
    }
  },

  setVolume(volume, dispatch) {
    const normalizedVolume = Math.max(0, Math.min(1, volume));
    globalAudio.volume = normalizedVolume;
    dispatch(setVolume(normalizedVolume));
  },

  mute(dispatch) {
    globalAudio.muted = true;
    dispatch(toggleMute(true));
  },

  unmute(dispatch) {
    globalAudio.muted = false;
    dispatch(toggleMute(false));
  },

  setPlaybackRate(rate) {
    globalAudio.playbackRate = rate;
  },

  seek(time, dispatch) {
    const seekTime = Math.max(0, Math.min(Number(time), globalAudio.duration));
    const wasPlaying = this.isPlaying;
    
    if (wasPlaying) {
      globalAudio.pause();
    }

    globalAudio.currentTime = seekTime;
    dispatch(setCurrentTime(seekTime));

    if (wasPlaying) {
      this.play(dispatch);
    }
  },

  getCurrentTime() {
    return globalAudio.currentTime || 0;
  },

  getDuration() {
    return globalAudio.duration || 0;
  },

  isEnded() {
    return globalAudio.ended || false;
  },

  async playNext(nextTrackSrc, dispatch) {
    if (nextTrackSrc) {
      await this.changeTrack(nextTrackSrc, dispatch);
      await this.play(dispatch);
    }
  },

  async playPrevious(prevTrackSrc, dispatch) {
    if (prevTrackSrc) {
      await this.changeTrack(prevTrackSrc, dispatch);
      await this.play(dispatch);
    }
  },
  handleLoadMetadata(audio, dispatch) {
    if (audio) {
      const duration = audio.duration;
      dispatch(setDuration(duration));
      dispatch(setCurrentTime(0));
      dispatch(setLoading(false));
    }
  },
};


