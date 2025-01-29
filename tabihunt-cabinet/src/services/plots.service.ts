import { AxiosResponse } from "axios"
import {
  GetPlotDescriptionsResponse,
  GetPlotsResponse,
  PlotDescriptionData,
  PlotDescriptionDto,
  PlotDto
} from "../models/plots"
import http from "./http.service"

export const plotsService = {
  async getMeCompanyPlots(): Promise<AxiosResponse<GetPlotsResponse>> {
    return await http.get(`companies/me/plots`)
  },
  async getMeCompanyPlotById(id: string): Promise<AxiosResponse<PlotDto>> {
    return await http.get(`companies/me/plots/${id}`)
  },
  async getMeCompanyPlotDescriptions(): Promise<
    AxiosResponse<GetPlotDescriptionsResponse>
  > {
    return await http.get(`companies/me/plot-descriptions`)
  },
  async getMeCompanyPlotDescriptionById(
    id: string
  ): Promise<AxiosResponse<PlotDescriptionDto>> {
    return await http.get(`companies/me/plot-descriptions/${id}`)
  },
  async createMeCompanyPlotDescription(
    payload: PlotDescriptionData
  ): Promise<AxiosResponse<PlotDescriptionDto>> {
    return await http.post(`companies/me/plot-descriptions`, payload)
  },
  async editMeCompanyPlotDescription(
    payload: PlotDescriptionData,
    id: string
  ): Promise<AxiosResponse<PlotDescriptionDto>> {
    return await http.patch(`companies/me/plot-descriptions/${id}`, payload)
  },
  async deleteMeCompanyPlotDescription(
    id: string
  ): Promise<AxiosResponse<PlotDescriptionDto>> {
    return await http.delete(`companies/me/plot-descriptions/${id}`)
  }
}
