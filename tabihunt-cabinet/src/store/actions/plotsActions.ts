import { AppDispatch } from ".."
import { PlotDescriptionData } from "../../models/plots"
import { plotsService } from "../../services/plots.service"
import {
  plotsFetching,
  plotsFetchSuccess,
  plotsFetchError,
  setPlots,
  setPlotDescriptions,
  setPlotDescription,
  setPlotDescriptionData
} from "../slices/plotsSlice"

export const getMeCompanyPlots = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(plotsFetching())
      const resp = await plotsService.getMeCompanyPlots()
      if (resp.data && resp.data.content) {
        dispatch(plotsFetchSuccess())
        dispatch(setPlots(resp.data.content))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(plotsFetchError(errMessage))
    }
  }
}

export const getMeCompanyPlotById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(plotsFetching())
      const resp = await plotsService.getMeCompanyPlotById(id)
      if (resp.data) {
        dispatch(plotsFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(plotsFetchError(errMessage))
    }
  }
}

export const getMeCompanyPlotDescriptions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(plotsFetching())
      const resp = await plotsService.getMeCompanyPlotDescriptions()
      if (resp.data && resp.data.content) {
        dispatch(plotsFetchSuccess())
        dispatch(setPlotDescriptions(resp.data.content))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(plotsFetchError(errMessage))
    }
  }
}

export const getMeCompanyPlotDescriptionById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(plotsFetching())
      const resp = await plotsService.getMeCompanyPlotDescriptionById(id)
      if (resp.data) {
        dispatch(plotsFetchSuccess())
        dispatch(setPlotDescription(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(plotsFetchError(errMessage))
    }
  }
}

export const createMeCompanyPlotDescription = (
  payload: PlotDescriptionData
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(plotsFetching())
      const resp = await plotsService.createMeCompanyPlotDescription(payload)
      if (resp.data) {
        dispatch(plotsFetchSuccess())
        dispatch(setPlotDescriptionData(null))

        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(plotsFetchError(errMessage))
    }
  }
}

export const editMeCompanyPlotDescription = (
  payload: PlotDescriptionData,
  id: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(plotsFetching())
      const resp = await plotsService.editMeCompanyPlotDescription(payload, id)
      if (resp.data) {
        dispatch(plotsFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(plotsFetchError(errMessage))
    }
  }
}

export const deleteMeCompanyPlotDescription = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(plotsFetching())
      const resp = await plotsService.deleteMeCompanyPlotDescription(id)
      if (resp) {
        dispatch(plotsFetchSuccess())
        dispatch(getMeCompanyPlotDescriptions())
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(plotsFetchError(errMessage))
    }
  }
}
