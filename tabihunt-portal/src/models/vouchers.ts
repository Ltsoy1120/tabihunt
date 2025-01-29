import { AnimalDto, AnimalType } from "./animals"
import { SortDto } from "./common"
import { LimitDto } from "./limits"
import { PlotDto } from "./plots"

export interface VoucherDto {
  id: string
  plot: PlotDto
  type: VoucherType
  startDate?: string
  endDate?: string
  duration: number
  dailyLimit: number
  standardPrice: number
  membershipPrice: number
  preferentialPrice: number
  specialPrice: number
  rulesUrl: string
  imageUrl: string
  animalTypes: AnimalType[]
  animals: VoucherAnimalDto[]
  createdAt: string
  updatedAt: string
}

export interface PurchaseVoucherData {
  animals: PurchaseVoucherAnimalData[]
  startDate: string
  endDate: string
  paymentMethod: "CARD" | "CASH" | "KASPI" | null
  withQrCode?: boolean
}

export interface PurchaseVoucherAnimalData {
  voucherAnimalId: string
  heads: number
}

export interface VoucherIssuedDto {
  purchasedVoucher: PurchasedVoucherDto
  kaspiPaymentUrl?: string
  kaspiPaymentQrCode?: string // Base64
}

export interface PurchasedVoucherDto {
  id: string
  slug: string
  voucher: VoucherDto
  startDate: string
  endDate: string
  totalAmount: number
  limits: PurchasedVoucherLimitDto[]
  reportFilled: boolean
  createdAt: string
  updatedAt: string
}

export interface GetPurchasedVouchersResponse {
  totalPages: number
  totalElements: number
  pageable: {
    paged: true
    unpaged: true
    pageSize: number
    pageNumber: number
    offset: number
    sort: SortDto[]
  }
  numberOfElements: number
  size: number
  content: PurchasedVoucherDto[]
  number: 0
  sort: SortDto[]
  first: true
  last: true
  empty: true
}

export interface PurchasedVoucherLimitDto {
  id: string
  limit: LimitDto
  actualHeads: number
  heads: number
  amount: number
  createdAt: string
  updatedAt: string
}

export interface VoucherAnimalDto {
  id: string
  animal: AnimalDto
  standardPrice: number
  membershipPrice: number
  preferentialPrice: number
  specialPrice: number
  limitHeads: number
  huntingStartDate: string
  huntingEndDate: string
  createdAt: string
  updatedAt: string
}

export type VoucherType = "SEASONAL" | "ONE_TIME" | null

export interface GetVouchersParameters {
  regionId: string
  animalType?: AnimalType
  type?: VoucherType
  plotId?: string
  animalName?: string
  page?: number
  size?: number
}

export interface GetVouchersResponse {
  totalPages: number
  totalElements: number
  pageable: {
    paged: true
    unpaged: true
    pageSize: number
    pageNumber: number
    offset: number
    sort: SortDto[]
  }
  numberOfElements: number
  size: number
  content: VoucherDto[]
  number: 0
  sort: SortDto[]
  first: true
  last: true
  empty: true
}

export enum VoucherPriceType {
  STANDARD = "STANDARD", // стандартная
  MEMBERSHIP = "MEMBERSHIP", // с членством
  PREFERENTIAL = "PREFERENTIAL", // для пенсионера
  SPECIAL = "SPECIAL" // для особых лиц
}

export interface VoucherAvailableDatesDto {
  dates: string[]
}

export interface VaucherKaspiPayRequest {
  InvoiceId: string
  WithQR: boolean
}

export interface VaucherKaspiPayResponse {
  code: number
  redirectUrl: string
  message: string
  qrCodeImage: string
}

export interface ReportPurchasedVoucherData {
  animalLimitId: string
  actualHeads: number
}

export interface GetPurchasedVouchersParameters {
  plotName?: string
  slug?: string
  page?: number
  size?: number
}
