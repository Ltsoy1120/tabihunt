import { RegionDto } from "@/models/common"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CommonState {
  loading: boolean
  error: string | null
  regions: RegionDto[]
  version: string
}

const initialState: CommonState = {
  loading: false,
  error: null,
  regions: [],
  version: ""
}

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    commonFetching(state) {
      state.loading = true
    },
    commonFetchSuccess(state) {
      state.loading = false
    },
    commonFetchError(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload
    },
    setRegions(state, action: PayloadAction<RegionDto[]>) {
      state.regions = action.payload
    },
    setVersion(state, action: PayloadAction<{ version: string }>) {
      state.version = action.payload.version
    }
  }
})

export const {
  commonFetching,
  commonFetchSuccess,
  commonFetchError,
  setRegions,
  setVersion
} = commonSlice.actions

export default commonSlice.reducer
