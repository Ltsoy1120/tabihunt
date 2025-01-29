import { AppDispatch } from ".."
import { GetLimitsParameters, LimitData } from "../../models/limits"
import { limitsService } from "../../services/limits.service"
import {
  limitsFetching,
  limitsFetchSuccess,
  limitsFetchError,
  setLimits,
  setLimit,
  setNewLimitData
} from "../slices/limitsSlice"

// Получить лимиты текущей компании (СОХ)
export const getMeCompanyLimits = (payload: GetLimitsParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(limitsFetching())
      const resp = await limitsService.getMeCompanyLimits(payload)
      if (resp.data) {
        dispatch(limitsFetchSuccess())
        dispatch(setLimits(resp.data.content))
        return resp.data
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("err", err)
      dispatch(limitsFetchError(err))
    }
  }
}

export const createMeCompanyLimit = (payload: LimitData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(limitsFetching())
      const resp = await limitsService.createMeCompanyLimit(payload)
      if (resp.data) {
        dispatch(setNewLimitData(null))
        dispatch(limitsFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("err", err)
      dispatch(limitsFetchError(err))
    }
  }
}

export const getLimitById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(limitsFetching())
      const resp = await limitsService.getLimitById(id)
      if (resp.data) {
        dispatch(setLimit(resp.data))
        dispatch(limitsFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("err", err)
      dispatch(limitsFetchError(err))
    }
  }
}

export const editMeCompanyLimit = (payload: LimitData, id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(limitsFetching())
      const resp = await limitsService.editMeCompanyLimit(payload, id)
      if (resp.data) {
        dispatch(setNewLimitData(null))
        dispatch(limitsFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("err", err)
      dispatch(limitsFetchError(err))
    }
  }
}

export const deleteLimitById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(limitsFetching())
      const resp = await limitsService.deleteLimitById(id)
      if (resp.data) {
        dispatch(limitsFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error("err", err)
      dispatch(limitsFetchError(err))
    }
  }
}
