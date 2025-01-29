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
  resetAuth,
  setIsAuth,
  setLoginData,
  setOtpData
} from "../slices/authSlice"

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
        dispatch(setIsAuth(true))
        return resp.data
      }
    } catch (error: any) {
      // const err = error instanceof Error ? error : new Error(String(error))
      console.error("error", error)
      dispatch(authFetchError(error))
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
        dispatch(setIsAuth(true))
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
export const logout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await authService.logout()
      if (resp.status && resp.status >= 200 && resp.status < 300) {
        dispatch(resetAuth())
        return resp.status
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("err", err)
      dispatch(authFetchError(error))
    }
  }
}

// Отправить код подтверждения пользователю
export const sendOtpEmail = (email: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.sendOtpEmail(email)
      if (resp.status && resp.status >= 200 && resp.status < 300) {
        dispatch(authFetchSuccess())
        return resp.status
      }
    } catch (error) {
      console.error("error", error)
      // const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(error))
    }
  }
}

export const sendOtpPhone = (phoneNumber: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.sendOtpPhone(phoneNumber)
      if (resp.status && resp.status >= 200 && resp.status < 300) {
        dispatch(authFetchSuccess())
        return resp.status
      }
    } catch (error) {
      console.error("error", error)
      // const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(error))
    }
  }
}

// Проверить код подтверждения пользователю
export const verifyOtpEmail = (payload: VerifyOtpEmailDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.verifyOtpEmail(payload)
      console.log("verifyOtpEmail", resp)
      if (resp && resp.status >= 200 && resp.status < 300) {
        dispatch(setOtpData(payload))
        dispatch(authFetchSuccess())
        return resp.status
      }
    } catch (error) {
      console.error("error", error)
      // const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(error))
    }
  }
}

export const verifyOtpPhone = (payload: VerifyOtpPhoneDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.verifyOtpPhone(payload)
      if (resp && resp.status >= 200 && resp.status < 300) {
        dispatch(setOtpData(payload))
        dispatch(authFetchSuccess())
        return resp.status
      }
    } catch (error) {
      console.error("error", error)
      // const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(error))
    }
  }
}

// Сброс пароля с подтверждением кода OTP
export const passwordResetEmail = (payload: PasswordResetEmailDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.passwordResetEmail(payload)
      if (resp && resp.status >= 200 && resp.status < 300) {
        dispatch(authFetchSuccess())
        return resp.status
      }
    } catch (error) {
      // const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(error))
    }
  }
}

export const passwordResetPhone = (payload: PasswordResetPhoneDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authFetching())
      const resp = await authService.passwordResetPhone(payload)
      if (resp && resp.status >= 200 && resp.status < 300) {
        dispatch(authFetchSuccess())
        return resp.status
      }
    } catch (error) {
      // const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(error))
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
      if (resp.data) {
        dispatch(authFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      dispatch(authFetchError(err))
    }
  }
}
