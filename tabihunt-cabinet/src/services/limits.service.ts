import { AxiosResponse } from "axios"
import {
  GetLimitsParameters,
  GetLimitsResponse,
  LimitData,
  LimitDto
} from "../models/limits"
import http from "./http.service"

export const limitsService = {
  async getMeCompanyLimits(
    payload: GetLimitsParameters
  ): Promise<AxiosResponse<GetLimitsResponse>> {
    let url = `companies/me/limits?page=${payload.page ?? 0}&size=${
      payload.size ?? 10
    }`

    if (payload.plotId) {
      url += `&plotId=${payload.plotId}`
    }

    if (payload.animalType) {
      url += `&animalType=${payload.animalType}`
    }

    if (payload.name) {
      url += `&name=${payload.name}`
    }

    return await http.get(url)
  },
  async createMeCompanyLimit(
    payload: LimitData
  ): Promise<AxiosResponse<LimitDto>> {
    return await http.post(`companies/me/limits`, payload)
  },
  async getLimitById(id: string): Promise<AxiosResponse<LimitDto>> {
    return await http.get(`companies/me/limits/${id}`)
  },
  async editMeCompanyLimit(
    payload: LimitData,
    id: string
  ): Promise<AxiosResponse<LimitDto>> {
    return await http.patch(`companies/me/limits/${id}`, payload)
  },
  async deleteLimitById(id: string): Promise<AxiosResponse> {
    return await http.delete(`companies/me/limits/${id}`)
  }
}
