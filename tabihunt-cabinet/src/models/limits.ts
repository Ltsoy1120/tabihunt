import { AnimalDto } from "./animals"
import { PlotDto } from "./plots"

export interface LimitStateData {
  animalType: string
  animal: AnimalDto
  plot: PlotDto
  number: string
  availableHeads: number
  reservedHeads: number
  huntingStartDate: string
  huntingEndDate: string
}

export interface LimitData {
  animalId: string
  plotId: string
  number: string
  availableHeads: number
  soldHeads: number
  reservedHeads: number
}

export interface GetLimitsParameters {
  name?: string
  plotId?: string
  animalType?: string
  page?: number
  size?: number
}

export interface GetLimitsResponse {
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
  content: LimitDto[]
  number: 0
  sort: SortDto[]
  first: true
  last: true
  empty: true
}

export interface SortDto {
  direction: string
  nullHandling: string
  ascending: boolean
  property: string
  ignoreCase: boolean
}

export interface LimitDto {
  id: string
  animal: AnimalDto
  plot: PlotDto
  number: string
  availableHeads: number
  soldHeads: number
  reservedHeads: number
  createdAt: string
  updatedAt: string
}
