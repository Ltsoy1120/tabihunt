import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  PlotDescriptionData,
  PlotDescriptionDto,
  PlotDto
} from "../../models/plots"

interface PlotsState {
  loading: boolean
  error: string | null
  plots: PlotDto[]
  plot: PlotDto | null
  plotDescription: PlotDescriptionDto | null
  plotDescriptions: PlotDescriptionDto[]
  plotDescriptionData: PlotDescriptionData | null
}

const initialState: PlotsState = {
  loading: false,
  error: null,
  plots: [],
  plot: null,
  plotDescription: null,
  plotDescriptions: [],
  plotDescriptionData: null
}

export const plotsSlice = createSlice({
  name: "plots",
  initialState,
  reducers: {
    plotsFetching(state) {
      state.loading = true
    },
    plotsFetchSuccess(state) {
      state.loading = false
    },
    plotsFetchError(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload
    },
    setPlots(state, action: PayloadAction<PlotDto[]>) {
      state.plots = action.payload
    },
    setPlot(state, action: PayloadAction<PlotDto | null>) {
      state.plot = action.payload
    },
    setPlotDescriptions(state, action: PayloadAction<PlotDescriptionDto[]>) {
      state.plotDescriptions = action.payload
    },
    setPlotDescriptionData(
      state,
      action: PayloadAction<PlotDescriptionData | null>
    ) {
      state.plotDescriptionData = action.payload
    },
    setPlotDescription(
      state,
      action: PayloadAction<PlotDescriptionDto | null>
    ) {
      state.plotDescription = action.payload
    }
  }
})

export const {
  plotsFetching,
  plotsFetchSuccess,
  plotsFetchError,
  setPlots,
  setPlot,
  setPlotDescriptions,
  setPlotDescriptionData,
  setPlotDescription
} = plotsSlice.actions

export default plotsSlice.reducer
