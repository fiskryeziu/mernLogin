import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from './api'

const userLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const initialState = {
  userInfo: userLocalStorage,
  loading: false,
  error: '',
}

export const userLoginAction = createAsyncThunk(
  'user/userLoginAction',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('auth/login', userData)
      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
      }

      return data
    } catch (err) {
      const message =
        err.response && err.response.data ? err.response.data : err.message

      return rejectWithValue(message)
    }
  }
)
export const userRegisterAction = createAsyncThunk(
  'user/userRegisterAction',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('auth/register', userData)
      return data
    } catch (err) {
      const message =
        err.response && err.response.data
          ? err.response.data.message
          : err.message
      return rejectWithValue(message)
    }
  }
)

const userLoginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogOut(state) {
      localStorage.removeItem('userInfo')
      state.userInfo = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAction.pending, (state, action) => {
        state.loading = true
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
  },
})

export const { userLogOut } = userLoginSlice.actions

export default userLoginSlice.reducer
