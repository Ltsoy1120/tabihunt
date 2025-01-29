import { AxiosResponse } from "axios"
import {
  GetHuntsmenParameters,
  GetHuntsmenResponse,
  HuntsmanData,
  HuntsmanDto
} from "../models/huntsmen"
import http from "./http.service"

export const huntsmenService = {
  async getMeCompanyHuntsmen(
    payload: GetHuntsmenParameters
  ): Promise<AxiosResponse<GetHuntsmenResponse>> {
    let url = `companies/me/huntsmen?page=${payload.page ?? 0}&size=${
      payload.size ?? 10
    }`

    if (payload.plotId) {
      url += `&plotId=${payload.plotId}`
    }

    if (payload.fullname) {
      url += `&fullname=${payload.fullname}`
    }

    return await http.get(url)
  },
  async getMeCompanyHuntsmanById(
    huntsmanId: string
  ): Promise<AxiosResponse<HuntsmanDto>> {
    return await http.get(`companies/me/huntsmen/${huntsmanId}`)
  },
  async createMeCompanyHuntsman(
    payload: HuntsmanData
  ): Promise<AxiosResponse<HuntsmanDto>> {
    return await http.post(`companies/me/huntsmen`, payload)
  },
  async editMeCompanyHuntsman(
    payload: HuntsmanData,
    huntsmanId: string
  ): Promise<AxiosResponse<HuntsmanDto>> {
    return await http.patch(`companies/me/huntsmen/${huntsmanId}`, payload)
  },
  async deleteMeCompanyHuntsman(
    huntsmanId: string
  ): Promise<AxiosResponse<HuntsmanDto>> {
    return await http.delete(`companies/me/huntsmen/${huntsmanId}`)
  }
}
