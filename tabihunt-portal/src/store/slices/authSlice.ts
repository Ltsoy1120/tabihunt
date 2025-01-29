import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AuthStateType,
  VerifyOtpEmailDto,
  VerifyOtpPhoneDto
} from "../../models/auth"

interface AuthState {
  loading: boolean
  error: any | null
  registerData: AuthStateType | null
  loginData: AuthStateType | null
  otpData: VerifyOtpEmailDto | VerifyOtpPhoneDto | null
  isAuth: boolean
}

const initialState: AuthState = {
  loading: false,
  error: null,
  registerData: null,
  loginData: null,
  otpData: null,
  isAuth: false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authFetching(state) {
      state.loading = true
    },
    authFetchSuccess(state) {
      state.loading = false
    },
    authFetchError(state, action: PayloadAction<any | null>) {
      state.loading = false
      state.error = action.payload
    },
    setRegisterData(state, action: PayloadAction<AuthStateType | null>) {
      state.registerData = action.payload
    },
    setLoginData(state, action: PayloadAction<AuthStateType | null>) {
      state.loginData = action.payload
    },
    setOtpData(
      state,
      action: PayloadAction<VerifyOtpEmailDto | VerifyOtpPhoneDto | null>
    ) {
      state.otpData = action.payload
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    resetAuth(state) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      state.error = null
      state.registerData = null
      state.loginData = null
      state.otpData = null
      state.isAuth = false
    }
  }
})

export const {
  authFetching,
  authFetchSuccess,
  authFetchError,
  setRegisterData,
  setLoginData,
  setOtpData,
  setIsAuth,
  resetAuth
} = authSlice.actions

export default authSlice.reducer
