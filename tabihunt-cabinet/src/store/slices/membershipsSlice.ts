import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  MembershipData,
  MembershipDto,
  MembershipRenewalDto,
  RenewMembershipData
} from "../../models/memberships"

interface MembershipsState {
  loading: boolean
  error: string | null
  memberships: MembershipDto[]
  membership: MembershipDto | null
  membershipsRenewals: MembershipRenewalDto[]
  newMembershipData: MembershipData | null
  renewMembershipData: RenewMembershipData | null
}

const initialState: MembershipsState = {
  loading: false,
  error: null,
  memberships: [],
  membership: null,
  newMembershipData: null,
  membershipsRenewals: [],
  renewMembershipData: null
}

export const membershipsSlice = createSlice({
  name: "memberships",
  initialState,
  reducers: {
    membershipsFetching(state) {
      state.loading = true
    },
    membershipsFetchSuccess(state) {
      state.loading = false
    },
    membershipsFetchError(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload
    },
    setMemberships(state, action: PayloadAction<MembershipDto[]>) {
      state.memberships = action.payload
    },
    setMembership(state, action: PayloadAction<MembershipDto | null>) {
      state.membership = action.payload
    },
    setNewMembershipData(state, action: PayloadAction<MembershipData | null>) {
      state.newMembershipData = action.payload
    },
    setRenewMembershipData(
      state,
      action: PayloadAction<RenewMembershipData | null>
    ) {
      state.renewMembershipData = action.payload
    },
    setMembershipsRenewals(
      state,
      action: PayloadAction<MembershipRenewalDto[]>
    ) {
      state.membershipsRenewals = action.payload
    }
  }
})

export const {
  membershipsFetching,
  membershipsFetchSuccess,
  membershipsFetchError,
  setMemberships,
  setMembership,
  setNewMembershipData,
  setRenewMembershipData,
  setMembershipsRenewals
} = membershipsSlice.actions

export default membershipsSlice.reducer
