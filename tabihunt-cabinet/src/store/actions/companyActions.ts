import { AppDispatch } from ".."
import { UpdateCurrentCompanyData } from "../../models/companies"
import { companiesService } from "../../services/companies.service"
import {
  companyFetching,
  companyFetchSuccess,
  companyFetchError,
  setChecklist,
  setMeCompany
} from "../slices/companySlice"

// Получить чеклист с лимитами текущей компании (СОХ)
export const getMeCompaniesChecklist = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(companyFetching())
      const resp = await companiesService.getMeCompaniesChecklist()
      if (resp.data) {
        dispatch(companyFetchSuccess())
        dispatch(setChecklist(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(companyFetchError(errMessage))
    }
  }
}

export const getMeCompany = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(companyFetching())
      const resp = await companiesService.getMeCompany()
      if (resp.data) {
        dispatch(companyFetchSuccess())
        dispatch(setMeCompany(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(companyFetchError(errMessage))
    }
  }
}

export const updateMeCompanyMembership = (
  payload: UpdateCurrentCompanyData
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(companyFetching())
      const resp = await companiesService.updateMeCompanyMembership(payload)
      if (resp.data) {
        dispatch(companyFetchSuccess())
        dispatch(setMeCompany(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(companyFetchError(errMessage))
    }
  }
}
