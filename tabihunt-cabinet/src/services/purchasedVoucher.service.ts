import { AxiosResponse } from "axios"
import http from "./http.service"
import { sellVoucherDto, VoucherIssuedDto } from "../models/purchasedVoucher"
import { GetVouchersParameters, GetVouchersResponse } from "../models/vouchers"

export const purchasedVouchersService = {
  async getRegions() {
    return await http.get(`regions`)
  },
  async getMeCompanyVouchers(
    payload: GetVouchersParameters
  ): Promise<AxiosResponse<GetVouchersResponse>> {
    return await http.get("companies/me/vouchers", {
      params: {
        page: payload.page ?? 0,
        plotId: payload.plotId,
        animalType: payload.animalType,
        type: payload.type
      }
    })
  },
  async getPurchasedData(VoucherId: string) {
    return await http.get(`companies/me/vouchers/${VoucherId}`)
  },
  async createSell(
    id: string,
    data: sellVoucherDto
  ): Promise<AxiosResponse<VoucherIssuedDto>> {
    return await http.post(`companies/me/vouchers/${id}/sell`, data)
  }
}
