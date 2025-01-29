import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GeneralErrorState {
  status: number | null
  message: string
}
const initialState: GeneralErrorState = {
  status: null,
  message: ""
}

export const generalErrorSlice = createSlice({
  name: "generalError",
  initialState,
  reducers: {
    setErrorMessage(state, action: PayloadAction<GeneralErrorState>) {
      state.status = action.payload.status
      state.message = action.payload.message
    }
  }
})

export const { setErrorMessage } = generalErrorSlice.actions

export default generalErrorSlice.reducer
