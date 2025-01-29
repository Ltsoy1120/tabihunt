import { IRegionForAccount } from "./account"
import { AnimalDto } from "./animals"
import { CreateUserDto } from "./auth"
import { LimitDto } from "./limits"
import { VoucherDto } from "./vouchers"

interface AddressUser {
  regionId: string
  city: string
  street: string
  houseNumber?: string
  flatNumber?: string
  postalCode?: string
  latitude?: number
  longitude?: number
  region?: IRegionForAccount
}

export interface PurchaseUserVoucherData {
  user: CreateUserDto
  id: string
  firstname: string
  lastname: string
  patronymic?: string
  dateOfBirth: string
  purchasedVoucher?: { id: string }
  iin?: string
  gender: string
  address: AddressUser
  identificationNumber?: string
  identificationIssued?: string
  identificationValid?: string
  identificationIssuedBy?: string
  huntingLicenseNumber?: string
  huntingLicenseIssued?: string
  huntingLicenseValid?: string
}

interface purchasedVoucherAnimalArray {
  voucherAnimalId: string
  heads: number
}
export interface purchasedVoucherData {
  animals: purchasedVoucherAnimalArray[]
  startDate: string
  endDate: string
  paymentMethod: string
  priceType: string
  hunterId: string
}

export interface regionsData {
  value: string
  title: string
}

export interface Animal {
  id: string
  animal: AnimalDto
  standardPrice: number
  membershipPrice: number
  preferentialPrice: number
  specialPrice: number
  limitHeads?: number
  huntingStartDate: string
  huntingEndDate: string
}

interface limitVoucher {
  id: string
  animal: AnimalDto
  actualHeads: number
}
export interface limitsData {
  id: string
  limit: limitVoucher
}

export interface VoucherData {
  standardPrice: number
  membershipPrice: number
  preferentialPrice: number
  specialPrice: number
  animals: Animal[]
  limits: limitsData[]
}

interface sellVoucherAnimal {
  voucherAnimalId: string
  heads: number
  priceType: string
}

export interface sellVoucherDto {
  animals: sellVoucherAnimal[]
  startDate: string
  endDate: string
  paymentMethod: string
  priceType: string
  hunterId: string
  withQrCode: boolean
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

export interface PurchasedVoucherLimitDto {
  id: string
  limit: LimitDto
  actualHeads: number
  heads: number
  amount: number
  createdAt: string
  updatedAt: string
}
