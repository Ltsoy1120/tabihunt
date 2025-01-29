import { commonService } from "@/services/common.service"
import { AppDispatch } from ".."
import {
  commonFetchError,
  commonFetching,
  commonFetchSuccess,
  setRegions,
  setVersion
} from "../slices/commonSlice"

// Получение областей
export const getRegions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(commonFetching())
      const resp = await commonService.getRegions()
      if (resp?.data) {
        dispatch(setRegions(resp.data.content))
        dispatch(commonFetchSuccess())
        return resp.data.content
      }
    } catch (error: any) {
      const errMessage = error.response.data.message
      dispatch(commonFetchError(errMessage))
    }
  }
}

// Получение версии проекта
export const getVersion = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(commonFetching())
      const resp = await commonService.getVersion()
      if (resp?.data) {
        dispatch(setVersion(resp.data))
        dispatch(commonFetchSuccess())
        return resp.data
      }
    } catch (error: any) {
      const errMessage = error.response.data.message
      dispatch(commonFetchError(errMessage))
    }
  }
}
