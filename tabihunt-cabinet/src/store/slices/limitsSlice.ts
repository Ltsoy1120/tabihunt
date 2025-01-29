import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AnimalDto } from "../../models/animals"
import { LimitData, LimitDto } from "../../models/limits"

interface LimitsState {
  loading: boolean
  error: Error | null
  limits: LimitDto[]
  limit: LimitDto | null
  limitAnimalType: string
  limitAnimal: AnimalDto | null
  newLimitData: LimitData | null
}

const initialState: LimitsState = {
  loading: false,
  error: null,
  limits: [],
  limit: null,
  limitAnimalType: "",
  limitAnimal: null,
  newLimitData: null
}

export const limitsSlice = createSlice({
  name: "limits",
  initialState,
  reducers: {
    limitsFetching(state) {
      state.loading = true
    },
    limitsFetchSuccess(state) {
      state.loading = false
    },
    limitsFetchError(state, action: PayloadAction<Error | null>) {
      state.loading = false
      state.error = action.payload
    },
    setLimits(state, action: PayloadAction<LimitDto[]>) {
      state.limits = action.payload
    },
    setLimit(state, action: PayloadAction<LimitDto | null>) {
      state.limit = action.payload
    },
    setlimitAnimalType(state, action: PayloadAction<string>) {
      state.limitAnimalType = action.payload
    },
    setlimitAnimal(state, action: PayloadAction<AnimalDto>) {
      state.limitAnimal = action.payload
    },
    setNewLimitData(state, action: PayloadAction<LimitData | null>) {
      state.newLimitData = action.payload
    }
  }
})

export const {
  limitsFetching,
  limitsFetchSuccess,
  limitsFetchError,
  setLimits,
  setLimit,
  setlimitAnimalType,
  setlimitAnimal,
  setNewLimitData
} = limitsSlice.actions

export default limitsSlice.reducer
