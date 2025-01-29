import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HunterDto, HunterData } from "../../models/hunter"

interface HunterState {
  loading: boolean
  error: any | null
  me: HunterDto | null
  newHunterData: HunterData | null
}

const initialState: HunterState = {
  loading: false,
  error: null,
  me: null,
  newHunterData: null
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
    huntersFetchError(state, action: PayloadAction<any | null>) {
      state.loading = false
      state.error = action.payload
    },
    setMe(state, action: PayloadAction<HunterDto | null>) {
      state.me = action.payload
    },
    setNewHunterData(state, action: PayloadAction<HunterData | null>) {
      state.newHunterData = action.payload
    },
    resetHunter(state) {
      state.error = null
      state.me = null
      state.newHunterData = null
    }
  }
})

export const {
  huntersFetching,
  huntersFetchSuccess,
  huntersFetchError,
  setMe,
  setNewHunterData,
  resetHunter
} = huntersSlice.actions

export default huntersSlice.reducer
