import { SortDto } from "./limits"

export interface GetAnimalsParameters {
  name?: string
  animalType: string
  page?: number
  size?: number
}

export interface AnimalDto {
  id: string
  name: string
  type: string
  createdAt: string
  updatedAt: string
}

export interface GetAnimalsResponse {
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
  content: AnimalDto[]
  number: 0
  sort: SortDto[]
  first: true
  last: true
  empty: true
}
