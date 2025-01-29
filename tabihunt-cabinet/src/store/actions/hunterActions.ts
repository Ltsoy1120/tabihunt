import { AppDispatch } from ".."
import { HunterData } from "../../models/hunters"
import { huntersService } from "../../services/hunters.service"
import {
  huntersFetching,
  huntersFetchSuccess,
  huntersFetchError,
  setHunter,
  setNewHunterData
} from "../slices/huntersSlice"

export const getHunterByIin = (hunterIin: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.getHunterByIin(hunterIin)
      if (resp.data) {
        dispatch(huntersFetchSuccess())
        dispatch(setHunter(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntersFetchError(errMessage))
    }
  }
}

export const getHunterByPhoneNumber = (phoneNumber: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.getHunterByPhoneNumber(phoneNumber)
      if (resp.data) {
        dispatch(huntersFetchSuccess())
        dispatch(setHunter(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntersFetchError(errMessage))
    }
  }
}

export const getMeCompanyHunterById = (hunterId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.getMeCompanyHunterById(hunterId)
      if (resp.data) {
        dispatch(setHunter(resp.data))
        dispatch(huntersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntersFetchError(errMessage))
    }
  }
}

export const createMeCompanyHunter = (payload: HunterData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.createMeCompanyHunter(payload)
      if (resp.data) {
        dispatch(setNewHunterData(null))
        dispatch(setHunter(resp.data))
        dispatch(huntersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(huntersFetchError(errMessage))
    }
  }
}

export const editMeCompanyHunter = (payload: HunterData, hunterId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntersFetching())
      const resp = await huntersService.editMeCompanyHunter(payload, hunterId)
      if (resp.data) {
        dispatch(setHunter(resp.data))
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
