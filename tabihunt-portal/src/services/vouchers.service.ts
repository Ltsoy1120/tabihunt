import { AxiosResponse } from "axios"
import http from "./http.service"
import {
  GetPurchasedVouchersParameters,
  GetPurchasedVouchersResponse,
  PurchasedVoucherDto,
  PurchaseVoucherData,
  ReportPurchasedVoucherData,
  VaucherKaspiPayRequest,
  VaucherKaspiPayResponse,
  VoucherAvailableDatesDto,
  VoucherDto,
  VoucherIssuedDto,
  VoucherPriceType
} from "@/models/vouchers"

export const vouchersService = {
  async getVoucherById(voucherId: string): Promise<AxiosResponse<VoucherDto>> {
    return await http.get(`vouchers/${voucherId}`)
  },
  async purchaseVoucherById(
    payload: PurchaseVoucherData,
    voucherId: string
  ): Promise<AxiosResponse<VoucherIssuedDto>> {
    return await http.post(`vouchers/${voucherId}/purchase`, payload)
  },
  async getAvailableDatesVoucherById(
    voucherId: string,
    startDate: string,
    endDate: string
  ): Promise<AxiosResponse<VoucherAvailableDatesDto>> {
    const url = `vouchers/${voucherId}/available-dates`
    const params: { startDate?: string; endDate?: string } = {}

    if (startDate) {
      params.startDate = startDate
    }

    if (endDate) {
      params.endDate = endDate
    }

    return await http.get(url, { params })
  },
  async getAvailableHeadsByAnimalId(animalId: string, plotId: string): Promise<
    AxiosResponse<{
      availableHeads: number
    }>
  > {
    return await http.get(`animals/${animalId}/available?plotId=${plotId}`)
  },
  async getPriceTypeVoucherById(
    voucherId: string
  ): Promise<AxiosResponse<VoucherPriceType>> {
    return await http.get(`vouchers/${voucherId}/pricing-type`)
  },
  // async createVouchersKaspiPay(
  //   payload: VaucherKaspiPayRequest
  // ): Promise<AxiosResponse<VaucherKaspiPayResponse>> {
  //   return await http.post(`/vouchers/kaspi/pay`, payload)
  // },
  async getMePurchasedVouchers(
    payload: GetPurchasedVouchersParameters
  ): Promise<AxiosResponse<GetPurchasedVouchersResponse>> {
    const url = `hunters/me/purchased-vouchers`
    const params: {
      slug?: string
      plotName?: string
      page?: number
      size?: number
    } = {}

    if (payload.page) {
      params.page = payload.page
    }
    if (payload.size) {
      params.size = payload.size
    }
    if (payload.slug) {
      params.slug = payload.slug
    }
    if (payload.plotName) {
      params.plotName = payload.plotName
    }
    return await http.get(url, { params })
  },
  async getMePurchasedVoucherById(
    purchasedVoucherId: string
  ): Promise<AxiosResponse<PurchasedVoucherDto>> {
    return await http.get(`hunters/me/purchased-vouchers/${purchasedVoucherId}`)
  },
  async reportMePurchasedVoucher(
    payload: ReportPurchasedVoucherData[],
    purchasedVoucherId: string
  ): Promise<AxiosResponse<PurchasedVoucherDto>> {
    return await http.patch(
      `hunters/me/purchased-vouchers/${purchasedVoucherId}/report`,
      payload
    )
  }
}
