import { AxiosResponse } from "axios"
import {
  GetVouchersParameters,
  GetVouchersResponse,
  VoucherData,
  VoucherDto
} from "../models/vouchers"
import http from "./http.service"

export const vouchersService = {
  async getMeCompanyVouchers(
    payload: GetVouchersParameters
  ): Promise<AxiosResponse<GetVouchersResponse>> {
    let url = `companies/me/vouchers?page=${payload.page ?? 0}&size=${
      payload.size ?? 10
    }`

    if (payload.plotId) {
      url += `&plotId=${payload.plotId}`
    }

    if (payload.type) {
      url += `&type=${payload.type}`
    }

    if (payload.animalType) {
      url += `&animalType=${payload.animalType}`
    }

    return await http.get(url)
  },
  async getMeCompanyVoucherById(
    voucherId: string
  ): Promise<AxiosResponse<VoucherDto>> {
    return await http.get(`companies/me/vouchers/${voucherId}`)
  },
  async createMeCompanyVoucher(
    payload: VoucherData
  ): Promise<AxiosResponse<VoucherDto>> {
    return await http.post(`companies/me/vouchers`, payload)
  },
  async editMeCompanyVoucher(
    payload: VoucherData,
    voucherId: string
  ): Promise<AxiosResponse<VoucherDto>> {
    return await http.patch(`companies/me/vouchers/${voucherId}`, payload)
  },
  async archiveMeCompanyVoucher(
    voucherId: string
  ): Promise<AxiosResponse<VoucherDto>> {
    return await http.patch(`companies/me/vouchers/${voucherId}/archive`)
  },
  async unarchiveMeCompanyVoucher(
    voucherId: string
  ): Promise<AxiosResponse<VoucherDto>> {
    return await http.patch(`companies/me/vouchers/${voucherId}/unarchive`)
  }
}
