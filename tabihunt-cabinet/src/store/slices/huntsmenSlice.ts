import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HuntsmanData, HuntsmanDto } from "../../models/huntsmen"

interface HuntsmenState {
  loading: boolean
  error: string | null
  huntsmen: HuntsmanDto[]
  huntsman: HuntsmanDto | null
  newHuntsmanData: HuntsmanData | null
}

const initialState: HuntsmenState = {
  loading: false,
  error: null,
  huntsmen: [],
  huntsman: null,
  newHuntsmanData: null
}

export const huntsmenSlice = createSlice({
  name: "huntsmen",
  initialState,
  reducers: {
    huntsmenFetching(state) {
      state.loading = true
    },
    huntsmenFetchSuccess(state) {
      state.loading = false
    },
    huntsmenFetchError(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload
    },
    setHuntsmen(state, action: PayloadAction<HuntsmanDto[]>) {
      state.huntsmen = action.payload
    },
    setHuntsman(state, action: PayloadAction<HuntsmanDto>) {
      state.huntsman = action.payload
    },
    setNewHuntsmanData(state, action: PayloadAction<HuntsmanData | null>) {
      state.newHuntsmanData = action.payload
    }
  }
})

export const {
  huntsmenFetching,
  huntsmenFetchSuccess,
  huntsmenFetchError,
  setHuntsmen,
  setHuntsman,
  setNewHuntsmanData
} = huntsmenSlice.actions

export default huntsmenSlice.reducer
