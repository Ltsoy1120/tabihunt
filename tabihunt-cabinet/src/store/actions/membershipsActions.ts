import { AppDispatch } from ".."
import {
  GetMembershipsParameters,
  MembershipData,
  RenewMembershipData
} from "../../models/memberships"
import { membershipsService } from "../../services/memberships.service"
import { setHunter } from "../slices/huntersSlice"
import {
  membershipsFetching,
  membershipsFetchSuccess,
  membershipsFetchError,
  setMemberships,
  setMembershipsRenewals,
  setMembership,
  setNewMembershipData
} from "../slices/membershipsSlice"

export const getMeCompanyMemberships = (payload?: GetMembershipsParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(membershipsFetching())
      const resp = await membershipsService.getMeCompanyMemberships(
        payload ?? {}
      )
      if (resp.data) {
        dispatch(membershipsFetchSuccess())
        dispatch(setMemberships(resp.data.content))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(membershipsFetchError(errMessage))
    }
  }
}

export const getMeCompanyMembershipsById = (membershipId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(membershipsFetching())
      const resp = await membershipsService.getMeCompanyMembershipsById(
        membershipId
      )
      if (resp.data) {
        dispatch(setHunter(resp.data.hunter))
        dispatch(setMembership(resp.data))
        dispatch(membershipsFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(membershipsFetchError(errMessage))
    }
  }
}

export const createMeCompanyMembership = (payload: MembershipData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(membershipsFetching())
      const resp = await membershipsService.createMeCompanyMembership(payload)
      if (resp.data) {
        dispatch(setNewMembershipData(null))
        dispatch(membershipsFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(membershipsFetchError(errMessage))
    }
  }
}

export const renewMembership = (payload: RenewMembershipData, id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(membershipsFetching())
      const resp = await membershipsService.renewMembership(payload, id)
      if (resp.data) {
        dispatch(membershipsFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(membershipsFetchError(errMessage))
    }
  }
}

export const getExportMembership = (payload: GetMembershipsParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await membershipsService.getExportMembership(payload)
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Список членства.xlsx")
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(membershipsFetchError(errMessage))
    }
  }
}

export const createMeCompanyMembershipFile = (payload: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await membershipsService.createMeCompanyMembershipFile(
        payload
      )
      if (resp.data) {
        console.log(resp.data)
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(membershipsFetchError(errMessage))
    }
  }
}

export const getMeCompanyMembershipsRenewals = (membershipId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(membershipsFetching())
      const resp = await membershipsService.getMeCompanyMembershipsRenewals(
        membershipId
      )
      if (resp.data) {
        dispatch(membershipsFetchSuccess())
        dispatch(setMembershipsRenewals(resp.data.content))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(membershipsFetchError(errMessage))
    }
  }
}
