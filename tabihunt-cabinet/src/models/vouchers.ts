import { HuntsmanDto } from "./huntsmen"
import { SortDto } from "./limits"
import { PlotDto } from "./plots"
import {AnimalDto} from "./animals";


export interface VoucherData {
  type: "SEASONAL" | "ONE_TIME" | string
  plotId: string
  plot?:PlotDto
  huntsmenIds: string[]
  animals: VoucherAnimalData[]
  startDate?: string
  endDate?: string
  duration: number
  huntsmen:HuntsmanDto[]
  standardPrice: number
  membershipPrice: number
  preferentialPrice: number
  specialPrice: number
  dailyLimit: number
  imageUrl: string
  rulesUrl: string
}

export interface VoucherAnimalData {
  id?:string
  animalId: string
  animal?:AnimalDto
  huntingStartDate: string
  huntingEndDate: string
  limitHeads: number
  standardPrice: number
  membershipPrice: number
  preferentialPrice: number
  specialPrice: number
}

export interface VoucherAnimalDto {
  id: string
  animal: AnimalDto
  huntingStartDate: string
  huntingEndDate: string
  standardPrice: number
  membershipPrice: number
  preferentialPrice: number
  specialPrice: number
  limitHeads: number
  createdAt: string
  updatedAt: string
}

type AnimalType = "FEATHERED" | "UNGULATE"

export interface VoucherDto {
  id: string
  plot: PlotDto
  type: "SEASONAL" | "ONE_TIME"
  animalTypes: AnimalType[]
  huntsmen: HuntsmanDto[]
  animals: VoucherAnimalDto[]
  startDate?: string
  endDate?: string
  isArchived: boolean
  duration: number
  standardPrice: number
  membershipPrice: number
  preferentialPrice?: number
  specialPrice: number
  dailyLimit: number
  imageUrl: string
  rulesUrl: string
  createdAt: string
  updatedAt: string
}

export interface GetVouchersParameters {
  animalType?: string
  type?: string
  plotId?: string
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
