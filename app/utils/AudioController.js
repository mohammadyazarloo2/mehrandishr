import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setLoading,
  setVolume,
  toggleMute,
} from "../redux/audioSlice";

class AudioManager {
  constructor() {
    this.audio = typeof Audio !== 'undefined' ? new Audio() : null;
    this.eventListeners = new Map();
  }

  clearEventListeners() {
    this.eventListeners.forEach((listener, event) => {
      this.audio?.removeEventListener(event, listener);
    });
    this.eventListeners.clear();
  }

  addEventListeners(dispatch) {
    if (!this.audio) return;

    const listeners = {
      timeupdate: () => dispatch(setCurrentTime(this.audio.currentTime)),
      loadedmetadata: () => {
        dispatch(setDuration(this.audio.duration));
        dispatch(setLoading(false));
        this.audio.play().then(() => {
          dispatch(setIsPlaying(true));
        }).catch(error => {
          console.error("Autoplay failed:", error);
          dispatch(setIsPlaying(false));
        });
      },
      ended: () => {
        dispatch(setIsPlaying(false));
        dispatch(setCurrentTime(0));
      },
      error: (e) => {
        console.error("Audio error occurred:", e);
        dispatch(setLoading(false));
        dispatch(setIsPlaying(false));
      },
      playing: () => {
        dispatch(setIsPlaying(true));
        dispatch(setLoading(false));
      },
      pause: () => {
        dispatch(setIsPlaying(false));
      }
    };

    Object.entries(listeners).forEach(([event, listener]) => {
      this.audio.addEventListener(event, listener);
      this.eventListeners.set(event, listener);
    });
  }
}

const audioManager = new AudioManager();

export const AudioController = {
  async initialize(audioSrc, dispatch) {
    try {
      dispatch(setLoading(true));
      audioManager.clearEventListeners();
      
      if (audioManager.audio) {
        // Ensure the audio source is a valid URL
        const validAudioUrl = new URL(audioSrc, window.location.origin).href;
        audioManager.audio.src = validAudioUrl;
        audioManager.audio.preload = "auto";
        
        audioManager.addEventListeners(dispatch);
        await audioManager.audio.load();
      }
      
      return true;
    } catch (error) {
      console.error("Initialization error:", error);
      dispatch(setLoading(false));
      return false;
    }
  },
  
  async play(dispatch) {
    try {
      dispatch(setLoading(true));
      if (audioManager.audio) {
        await audioManager.audio.play();
        dispatch(setIsPlaying(true));
      }
    } catch (error) {
      console.error("Playback error:", error);
      dispatch(setIsPlaying(false));
    } finally {
      dispatch(setLoading(false));
    }
  },

  pause(dispatch) {
    if (audioManager.audio) {
      audioManager.audio.pause();
      dispatch(setIsPlaying(false));
    }
  },

  seek(time, dispatch) {
    if (!audioManager.audio) return;

    const wasPlaying = !audioManager.audio.paused;
    if (wasPlaying) {
      audioManager.audio.pause();
    }
    
    const validTime = Number(time);
    if (isFinite(validTime)) {
      const safeTime = Math.min(Math.max(0, validTime), audioManager.audio.duration || 0);
      audioManager.audio.currentTime = safeTime;
      dispatch(setCurrentTime(safeTime));
    }
  
    if (wasPlaying) {
      this.play(dispatch);
    }
  },

  setVolume(volume, dispatch) {
    if (audioManager.audio) {
      const normalizedVolume = Math.min(Math.max(0, volume), 1);
      audioManager.audio.volume = normalizedVolume;
      dispatch(setVolume(normalizedVolume));
    }
  },

  mute(dispatch) {
    if (audioManager.audio) {
      audioManager.audio.muted = true;
      dispatch(toggleMute());
    }
  },

  unmute(dispatch) {
    if (audioManager.audio) {
      audioManager.audio.muted = false;
      dispatch(toggleMute());
    }
  },

  getCurrentTime() {
    return audioManager.audio?.currentTime || 0;
  },

  getDuration() {
    return audioManager.audio?.duration || 0;
  },

  cleanup() {
    if (audioManager.audio) {
      audioManager.audio.pause();
      audioManager.audio.currentTime = 0;
      audioManager.audio.src = '';
      audioManager.clearEventListeners();
    }
  }
};
