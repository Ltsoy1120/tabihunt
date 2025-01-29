import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  TokenResponseDto,
  VerifyOtpEmailDto,
  VerifyOtpPhoneDto
} from "../../models/auth"

interface AuthState {
  loading: boolean
  error: Error | null
  lang: string
  loginData: { email: string } | { phoneNumber: string } | null
  otpData: VerifyOtpEmailDto | VerifyOtpPhoneDto | null
  accessToken: string
  refreshToken: string
}
const initialState: AuthState = {
  loading: false,
  error: null,
  lang: "ru",
  loginData: null,
  otpData: null,
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || ""
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
    authFetchError(state, action: PayloadAction<Error | null>) {
      state.loading = false
      state.error = action.payload
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload
    },
    setLoginData(
      state,
      action: PayloadAction<{ email: string } | { phoneNumber: string }>
    ) {
      state.loginData = action.payload
    },
    setOtpData(
      state,
      action: PayloadAction<VerifyOtpEmailDto | VerifyOtpPhoneDto | null>
    ) {
      state.otpData = action.payload
    },
    updateTokens(state, action: PayloadAction<TokenResponseDto>) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    }
  }
})

export const {
  authFetching,
  authFetchSuccess,
  authFetchError,
  setLanguage,
  setLoginData,
  setOtpData,
  updateTokens
} = authSlice.actions

export default authSlice.reducer
