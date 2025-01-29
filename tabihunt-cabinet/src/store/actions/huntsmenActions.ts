import { AppDispatch } from ".."
import { GetHuntsmenParameters, HuntsmanData } from "../../models/huntsmen"
import { huntsmenService } from "../../services/huntsmen.service"
import {
  huntsmenFetching,
  huntsmenFetchSuccess,
  huntsmenFetchError,
  setHuntsmen,
  setHuntsman,
  setNewHuntsmanData
} from "../slices/huntsmenSlice"

// Получить егерей текущей компании (СОХ)
export const getMeCompanyHuntsmen = (payload: GetHuntsmenParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntsmenFetching())
      const resp = await huntsmenService.getMeCompanyHuntsmen(payload)
      if (resp.data) {
        dispatch(huntsmenFetchSuccess())
        dispatch(setHuntsmen(resp.data.content))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntsmenFetchError(errMessage))
    }
  }
}

export const getMeCompanyHuntsmanById = (huntsmanId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntsmenFetchSuccess())
      const resp = await huntsmenService.getMeCompanyHuntsmanById(huntsmanId)
      if (resp.data) {
        dispatch(setHuntsman(resp.data))
        dispatch(huntsmenFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntsmenFetchError(errMessage))
    }
  }
}

export const createMeCompanyHuntsman = (payload: HuntsmanData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntsmenFetching())
      const resp = await huntsmenService.createMeCompanyHuntsman(payload)
      if (resp.data) {
        dispatch(setNewHuntsmanData(null))
        dispatch(huntsmenFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntsmenFetchError(errMessage))
    }
  }
}

export const editMeCompanyHuntsman = (
  payload: HuntsmanData,
  huntsmanId: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntsmenFetching())
      const resp = await huntsmenService.editMeCompanyHuntsman(
        payload,
        huntsmanId
      )
      if (resp.data) {
        dispatch(setNewHuntsmanData(null))
        dispatch(huntsmenFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntsmenFetchError(errMessage))
    }
  }
}

export const deleteMeCompanyHuntsman = (huntsmanId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntsmenFetching())
      const resp = await huntsmenService.deleteMeCompanyHuntsman(huntsmanId)
      if (resp.data) {
        dispatch(huntsmenFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntsmenFetchError(errMessage))
    }
  }
}
