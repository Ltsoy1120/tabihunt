import { UserData } from "@/models/auth"
import { HunterData } from "@/models/hunter"
import { AppDispatch } from ".."
import { huntersService } from "../../services/hunters.service"
import { setIsAuth, setOtpData, setRegisterData } from "../slices/authSlice"
import {
  huntersFetching,
  huntersFetchSuccess,
  huntersFetchError,
  setMe,
  setNewHunterData
} from "../slices/huntersSlice"

// Регистрация охотника через email
export const registerWithEmail = (payload: HunterData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.registerWithEmail(payload)
      if (resp && resp?.data) {
        localStorage.setItem("accessToken", resp.data.accessToken)
        localStorage.setItem("refreshToken", resp.data.refreshToken)
        dispatch(setOtpData(null))
        dispatch(setRegisterData(null))
        dispatch(setNewHunterData(null))
        dispatch(huntersFetchSuccess())
        dispatch(setIsAuth(true))
        return resp.data
      }
    } catch (error: any) {
      console.error("error", error)
      dispatch(huntersFetchError(error))
    }
  }
}

// Регистрация охотника через phone
export const registerWithPhone = (payload: HunterData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.registerWithPhone(payload)
      if (resp.data) {
        localStorage.setItem("accessToken", resp.data.accessToken)
        localStorage.setItem("refreshToken", resp.data.refreshToken)
        dispatch(huntersFetchSuccess())
        dispatch(setIsAuth(true))
        return resp.data
      }
    } catch (error) {
      console.error("error", error)
      dispatch(huntersFetchError(error))
    }
  }
}

// Проверка на существующего пользователя
export const getUsersExists = (payload: UserData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.getUsersExists(payload)
      if (resp.status && resp.status >= 200 && resp.status < 300) {
        dispatch(huntersFetchSuccess())
        return resp.status
      }
    } catch (error) {
      dispatch(huntersFetchError(error))
    }
  }
}

export const getMeHunter = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.getMeHunter()
      if (resp.data) {
        dispatch(setMe(resp.data))
        dispatch(huntersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntersFetchError(errMessage))
    }
  }
}

// export const createHunterMe = (payload: HunterData) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(huntersFetching())
//       const resp = await huntersService.createHunterMe(payload)
//       if (resp.data) {
//         dispatch(setNewHunterData(null))
//         dispatch(huntersFetchSuccess())
//         return resp.data
//       }
//     } catch (error) {
//       const errMessage = error instanceof Error ? error.message : String(error)
//       dispatch(huntersFetchError(errMessage))
//     }
//   }
// }

export const editMeHunter = (payload: HunterData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.editMeHunter(payload)
      if (resp.data) {
        dispatch(setMe(resp.data))
        dispatch(setNewHunterData(null))
        dispatch(huntersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntersFetchError(errMessage))
    }
  }
}
