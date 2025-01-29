import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CreateUserDto } from "../../models/auth"
import { HunterData, HunterDto } from "../../models/hunters"

interface HunterState {
  loading: boolean
  error: string | null
  hunter: HunterDto | null
  newHunterData: HunterData | null
  newHunterUserData: CreateUserDto | null
}

const initialState: HunterState = {
  loading: false,
  error: null,
  hunter: null,
  newHunterData: null,
  newHunterUserData: null
}

export const huntersSlice = createSlice({
  name: "hunters",
  initialState,
  reducers: {
    huntersFetching(state) {
      state.loading = true
    },
    huntersFetchSuccess(state) {
      state.loading = false
    },
    huntersFetchError(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload
    },
    setHunter(state, action: PayloadAction<HunterDto | null>) {
      state.hunter = action.payload
    },
    setNewHunterData(state, action: PayloadAction<HunterData | null>) {
      state.newHunterData = action.payload
    },
    setNewHunterUserData(state, action: PayloadAction<CreateUserDto>) {
      state.newHunterUserData = action.payload
    }
  }
})

export const {
  huntersFetching,
  huntersFetchSuccess,
  huntersFetchError,
  setHunter,
  setNewHunterData,
  setNewHunterUserData
} = huntersSlice.actions

export default huntersSlice.reducer
