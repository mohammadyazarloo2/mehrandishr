import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async () => {
    const response = await fetch('/api/settings')
    const data = await response.json()
    return data.settings
  }
)

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (updatedData) => {
    const response = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
    const data = await response.json()
    return data.settings
  }
)

export const invalidateSettings = createAsyncThunk(
  'settings/invalidate',
  async () => {
    await fetch('/api/settings/invalidate')
    return await fetchSettings()
  }
)

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default settingsSlice.reducer
