import { AxiosResponse } from "axios"
import { GetPlotsResponse } from "../models/plots"
import http from "./http.service"

export const plotsService = {
  async getPlots(regionId: string): Promise<AxiosResponse<GetPlotsResponse>> {
    return await http.get(`regions/${regionId}/plots?page=0&size=10`)
  }
}
