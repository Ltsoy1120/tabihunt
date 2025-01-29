import { HuntingSocietyData } from "../../models/huntingSociety";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PlotsState {
    loading: boolean
    error: string | null
    isEditing: boolean
    huntingDescription: HuntingSocietyData | null
    huntingDescriptions: HuntingSocietyData[]
    huntingDescriptionData: HuntingSocietyData | null
}

const initialState: PlotsState = {
    loading: false,
    error: null,
    isEditing: false,
    huntingDescription: null,
    huntingDescriptions: [],
    huntingDescriptionData: null
}

export const huntingSocietySlice = createSlice({
    name: "huntingSociety",
    initialState,
    reducers: {
        huntingFetching(state) {
            state.loading = true
        },
        huntingFetchSuccess(state) {
            state.loading = false
        },
        huntingFetchError(state, action: PayloadAction<string | null>) {
            state.loading = false
            state.error = action.payload
        },
        setHuntingDescription(state, action: PayloadAction<HuntingSocietyData>) {
            state.huntingDescription = action.payload
        },
        setHuntingDescriptionData(state,action: PayloadAction<HuntingSocietyData | null>) {
            state.huntingDescriptionData = action.payload
        },
        setEditState(state, action) {
            state.isEditing = action.payload
        },
    }
})
export const {
    huntingFetching,
    huntingFetchSuccess,
    huntingFetchError,
    setHuntingDescriptionData,
    setHuntingDescription,
    setEditState,
} = huntingSocietySlice.actions
export default huntingSocietySlice.reducer
