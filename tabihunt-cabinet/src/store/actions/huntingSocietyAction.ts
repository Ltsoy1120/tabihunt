import { AppDispatch } from ".."
import { HuntingSocietyData } from "../../models/huntingSociety"
import { huntingSocietyService } from "../../services/huntingSociety.service"
import { huntingFetchError, huntingFetching, huntingFetchSuccess, setHuntingDescription, setHuntingDescriptionData } from "../slices/huntingSocietySlice"

export const createHuntingSocietyDescription = (payload: HuntingSocietyData) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(huntingFetching())
        const resp = await huntingSocietyService.createHuntingSocietyDescription(payload)
        if (resp.data) {
          dispatch(huntingFetchSuccess())
          dispatch(setHuntingDescriptionData(null))
          dispatch(setHuntingDescription(resp.data))
          return resp.data
        }
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : String(error)
        dispatch(huntingFetchError(errMessage))
      }
    }
}

export const getHuntingSocietyDescriptions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntingFetching())
      const resp = await huntingSocietyService.getHuntingSocietyDescriptions()
      if (resp.data) {
        dispatch(huntingFetchSuccess())
        dispatch(setHuntingDescription(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntingFetchError(errMessage))
    }
  }
}



export const editHuntingSocietyDescription = (payload: HuntingSocietyData) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(huntingFetching())
        const resp = await huntingSocietyService.editHuntingSocietyDescription(payload)
        if (resp.data) {
          dispatch(huntingFetchSuccess())
          dispatch(setHuntingDescriptionData(null))
          dispatch(setHuntingDescription(resp.data))
          return resp.data
        }
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : String(error)
        dispatch(huntingFetchError(errMessage))
      }
    }
}