import { AppDispatch } from ".."
import {
  LoginWithEmailDto,
  LoginWithPhoneDto,
  PasswordResetEmailDto,
  PasswordResetPhoneDto,
  VerifyOtpEmailDto,
  VerifyOtpPhoneDto
} from "../../models/auth"
import { authService } from "../../services/auth.service"
import {
  authFetchError,
  authFetching,
  authFetchSuccess,
  setLoginData,
  setOtpData,
  updateTokens
} from "../slices/authSlice"
import { otpSendToEmail, otpSendToPhone } from "../slices/accountSlice"

// Вход через email пользователя
export const loginWithEmail = (payload: LoginWithEmailDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.loginWithEmail(payload)
      if (resp.data) {
        localStorage.setItem("accessToken", resp.data.accessToken)
        localStorage.setItem("refreshToken", resp.data.refreshToken)
        dispatch(authFetchSuccess())
        dispatch(setLoginData({ email: payload.email }))
        return resp.data
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("err", err)
      dispatch(authFetchError(err))
    }
  }
}

// Вход через phone пользователя
export const loginWithPhone = (payload: LoginWithPhoneDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.loginWithPhone(payload)
      if (resp.data) {
        localStorage.setItem("accessToken", resp.data.accessToken)
        localStorage.setItem("refreshToken", resp.data.refreshToken)
        dispatch(authFetchSuccess())
        dispatch(setLoginData({ phoneNumber: payload.phoneNumber }))
        return resp.data
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("err", err)
      dispatch(authFetchError(err))
    }
  }
}

// Выход через refreshToken
export const logout = async (refreshToken: string) => {
  try {
    await authService.logout(refreshToken)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error("err", err)
  }
}

// Отправить код подтверждения пользователю
export const sendOtpEmail = (email: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.sendOtpEmail(email)
      if (resp.status === 204) {
        dispatch(authFetchSuccess())
        dispatch(setLoginData({ email }))
        dispatch(otpSendToEmail())
        return resp.status
      }
    } catch (error) {
      console.error("error", error)
      const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(err))
    }
  }
}

export const sendOtpPhone = (phoneNumber: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.sendOtpPhone(phoneNumber)
      if (resp.status === 204) {
        dispatch(authFetchSuccess())
        dispatch(setLoginData({ phoneNumber }))
        dispatch(otpSendToPhone())
        return resp.status
      }
    } catch (error) {
      console.error("error", error)
      const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(err))
    }
  }
}

// Отправить код подтверждения пользователю
export const verifyOtpEmail = (payload: VerifyOtpEmailDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.verifyOtpEmail(payload)
      if (resp.status === 204) {
        dispatch(authFetchSuccess())
        dispatch(setOtpData(payload))
        return resp.status
      }
    } catch (error) {
      console.error("error", error)
      const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(err))
    }
  }
}

export const verifyOtpPhone = (payload: VerifyOtpPhoneDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.verifyOtpPhone(payload)
      if (resp.status === 204) {
        dispatch(authFetchSuccess())
        dispatch(setOtpData(payload))
        return resp.status
      }
    } catch (error) {
      console.error("error", error)
      const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(err))
    }
  }
}

// Сброс пароля с подтверждением кода OTP
export const passwordResetEmail = (payload: PasswordResetEmailDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.passwordResetEmail(payload)
      if (resp.status === 204) {
        dispatch(authFetchSuccess())
        return resp.status
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(err))
    }
  }
}

export const passwordResetPhone = (payload: PasswordResetPhoneDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.passwordResetPhone(payload)
      if (resp.status === 204) {
        dispatch(authFetchSuccess())
        return resp.status
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(err))
    }
  }
}

export const refreshAccessToken = (refreshToken: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.refreshAccessToken(refreshToken)
      if (resp.data) {
        localStorage.setItem("accessToken", resp.data.accessToken)
        localStorage.setItem("refreshToken", resp.data.refreshToken)
        dispatch(updateTokens(resp.data))
        dispatch(authFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(err))
      throw err // Пробрасываем ошибку дальше
    }
  }
}

export const passwordChange = (password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.passwordChange(password)
      if (resp.status === 204) {
        dispatch(authFetchSuccess())
        return resp.status
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(err))
    }
  }
}
