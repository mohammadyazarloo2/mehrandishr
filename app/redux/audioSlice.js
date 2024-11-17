import { createSlice } from '@reduxjs/toolkit';
import { podcasts } from '../data/podcasts';

const initialState = {
  currentPodcast: podcasts[0],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  repeatMode: 'off', // off, one, all
  isShuffleOn: false,
  queue: [...podcasts],
  loading: false,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setCurrentPodcast: (state, action) => {
      state.currentPodcast = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
      if (action.payload > 0) {
        state.isMuted = false;
      }
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setRepeatMode: (state) => {
      const modes = ['off', 'one', 'all'];
      const currentIndex = modes.indexOf(state.repeatMode);
      state.repeatMode = modes[(currentIndex + 1) % modes.length];
    },
    toggleShuffle: (state) => {
      state.isShuffleOn = !state.isShuffleOn;
      if (state.isShuffleOn) {
        state.queue = [...podcasts].sort(() => Math.random() - 0.5);
      } else {
        state.queue = [...podcasts];
      }
    },
    nextTrack: (state) => {
      const currentIndex = state.queue.findIndex(p => p.id === state.currentPodcast.id);
      const nextIndex = state.isShuffleOn 
        ? Math.floor(Math.random() * state.queue.length)
        : (currentIndex + 1) % state.queue.length;
      state.currentPodcast = state.queue[nextIndex];
    },
    prevTrack: (state) => {
      const currentIndex = state.queue.findIndex(p => p.id === state.currentPodcast.id);
      const prevIndex = currentIndex === 0 ? state.queue.length - 1 : currentIndex - 1;
      state.currentPodcast = state.queue[prevIndex];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  }
});
export const {
  setCurrentPodcast,
  togglePlay,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleMute,
  setRepeatMode,
  toggleShuffle,
  nextTrack,
  prevTrack,
  setLoading
} = audioSlice.actions;
export default audioSlice.reducer;