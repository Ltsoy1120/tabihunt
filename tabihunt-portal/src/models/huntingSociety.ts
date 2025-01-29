import { SortDto, WorkingHours } from "./common"

export interface HuntingSocietyDto {
  id: string
  name: string
  imageUrl: string
  phoneNumber: string
  email: string
  address: string
  workingHours: WorkingHours
  about: string
  instructions: string
  isMember: boolean
  membershipMembershipPrice: number
  membershipPreferentialPrice: number
  membershipSpecialPrice: number
  membershipStandardPrice: number
  createdAt: string
  updatedAt: string
}

export interface GetHuntingSocietiesResponse {
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
  content: HuntingSocietyDto[]
  number: number
  sort: SortDto[]
  first: true
  last: true
  empty: true
}

export interface GetHuntingSocietiesParameters {
  name?: string
  page?: number
  size?: number
}
