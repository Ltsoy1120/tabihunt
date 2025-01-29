import { PartnershipApplyData, PartnershipDto } from "@/models/partner"
import { AxiosResponse } from "axios"
import http from "./http.service"

export const partnersService = {
  async sendPartnerShipApply(
    payload: PartnershipApplyData
  ): Promise<AxiosResponse<PartnershipDto>> {
    return await http.post(`partnerships/apply`, payload)
  }
}
