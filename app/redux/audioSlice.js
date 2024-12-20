import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPodcast: {
    title: "",
    description: "",
    audioUrl: "",
    duration: 0,
    category: null,
    categories: [],
    tags: [],
    listens: 0,
    createdAt: null,
    updatedAt: null,
  },
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  repeatMode: "off",
  isShuffleOn: false,
  queue: [],
  loading: false,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setCurrentPodcast: (state, action) => {
      console.log("Setting podcast:", action.payload);
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
      state.duration = action.payload || state.currentPodcast.duration;
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
      const modes = ["off", "one", "all"];
      const currentIndex = modes.indexOf(state.repeatMode);
      state.repeatMode = modes[(currentIndex + 1) % modes.length];
    },
    toggleShuffle: (state) => {
      state.isShuffleOn = !state.isShuffleOn;
      if (state.isShuffleOn) {
        state.queue = [...state.queue].sort(() => Math.random() - 0.5);
      } else {
        // Reset queue to original order
        fetch("/api/podcasts")
          .then((res) => res.json())
          .then((podcasts) => (state.queue = podcasts));
      }
    },
    nextTrack: (state) => {
      const currentIndex = state.queue.findIndex(
        (p) => p._id === state.currentPodcast._id
      );
      // اگر آخرین پادکست بود، به اولین پادکست برمی‌گردیم
      if (currentIndex === state.queue.length - 1) {
        state.currentPodcast = state.queue[0];
      } else {
        state.currentPodcast = state.queue[currentIndex + 1];
      }
    },
    prevTrack: (state) => {
      const currentIndex = state.queue.findIndex(
        (p) => p._id === state.currentPodcast._id
      );
      // اگر اولین پادکست بود، به آخرین پادکست می‌رویم
      if (currentIndex === 0) {
        state.currentPodcast = state.queue[state.queue.length - 1];
      } else {
        state.currentPodcast = state.queue[currentIndex - 1];
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
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
  setLoading,
} = audioSlice.actions;

export default audioSlice.reducer;
