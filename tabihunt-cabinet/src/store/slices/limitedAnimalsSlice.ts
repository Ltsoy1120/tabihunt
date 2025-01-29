import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AnimalDto } from "../../models/animals"

interface LimitsState {
  loading: boolean
  error: string | null
  animals: AnimalDto[]
}

const initialState: LimitsState = {
  loading: false,
  error: null,
  animals: []
}

export const limitedAnimalsSlice = createSlice({
  name: "limitedAnimals",
  initialState,
  reducers: {
    animalsFetching(state) {
      state.loading = true
    },
    animalsFetchSuccess(state) {
      state.loading = false
    },
    animalsFetchError(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload
    },
    setAnimals(state, action: PayloadAction<AnimalDto[]>) {
      state.animals = action.payload
    }
  }
})

export const {
  animalsFetching,
  animalsFetchSuccess,
  animalsFetchError,
  setAnimals
} = limitedAnimalsSlice.actions

export default limitedAnimalsSlice.reducer
