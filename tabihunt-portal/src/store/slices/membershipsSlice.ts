import {  MembershipRenewData, MembershipsRenewResponse } from "@/models/membership"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface MembershipsState {
  loading: boolean
  error: any | null
  membershipRenewData: MembershipRenewData | null
  membershipRenewCost: number
  renewedMembership: MembershipsRenewResponse | null
}

const initialState: MembershipsState = {
  loading: false,
  error: null,
  membershipRenewData: null,
  membershipRenewCost: 0,
  renewedMembership: null
}

export const membershipsSlice = createSlice({
  name: "memberships",
  initialState,
  reducers: {
    huntingSocietiesFetching(state) {
      state.loading = true
    },
    huntingSocietiesFetchSuccess(state) {
      state.loading = false
    },
    huntingSocietiesFetchError(state, action: PayloadAction<any | null>) {
      state.loading = false
      state.error = action.payload
    },
    setMembershipRenewData(
      state,
      action: PayloadAction<MembershipRenewData | null>
    ) {
      state.membershipRenewData = action.payload
    },
    setMembershipRenewCost(state, action: PayloadAction<number>) {
      state.membershipRenewCost = action.payload
    },
    setRenewedMembership(state, action: PayloadAction<MembershipsRenewResponse | null>) {
      state.renewedMembership = action.payload
    }
  }
})

export const {
  huntingSocietiesFetching,
  huntingSocietiesFetchSuccess,
  huntingSocietiesFetchError,
  setMembershipRenewData,
  setMembershipRenewCost,
  setRenewedMembership
} = membershipsSlice.actions

export default membershipsSlice.reducer
