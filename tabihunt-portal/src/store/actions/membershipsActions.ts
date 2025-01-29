import { MembershipRenewData } from "@/models/membership"
import { membershipsService } from "@/services/memberships.service"
import { AppDispatch } from ".."
import {
  setMembershipRenewData,
  setRenewedMembership
} from "../slices/membershipsSlice"

export const renewHunterMembership = (
  payload: MembershipRenewData,
  voucherId: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await membershipsService.renewHunterMembership(
        payload,
        voucherId
      )
      if (resp.data) {
        dispatch(setRenewedMembership(resp.data))
        dispatch(setMembershipRenewData(null))
        return resp.data
      }
    } catch (error) {}
  }
}
