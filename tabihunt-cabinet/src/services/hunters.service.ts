import { AxiosResponse } from "axios"
import { HunterData, HunterDto } from "../models/hunters"
import http from "./http.service"

export const huntersService = {
  async createMeCompanyHunter(
    payload: HunterData
  ): Promise<AxiosResponse<HunterDto>> {
    return await http.post(`companies/me/hunters`, payload)
  },
  async editMeCompanyHunter(
    payload: HunterData,
    hunterId: string
  ): Promise<AxiosResponse<HunterDto>> {
    return await http.patch(`companies/me/hunters/${hunterId}`, payload)
  },
  async getHunterByIin(hunterIin: string): Promise<AxiosResponse<HunterDto>> {
    return await http.get(`companies/me/hunters?iin=${hunterIin}`)
  },
  async getHunterByPhoneNumber(
    phoneNumber: string
  ): Promise<AxiosResponse<HunterDto>> {
    const url = `companies/me/hunters`
    const params: { phoneNumber?: string } = {}

    if (phoneNumber) {
      params.phoneNumber = phoneNumber
    }

    return await http.get(url, { params })
  },
  async getMeCompanyHunterById(
    hunterId: string
  ): Promise<AxiosResponse<HunterDto>> {
    return await http.get(`companies/me/hunters/${hunterId}`)
  }
}
