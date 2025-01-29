import { IUserForAccount } from "./account"
import { CreateUserDto } from "./auth"
import { SortDto } from "./limits"
import { PlotDto } from "./plots"

export interface HuntsmanData {
  user: CreateUserDto
  plotId: string
  firstname: string
  lastname: string
  patronymic?: string
  position: string
  displayInVouchers: boolean
  latitude: number | null // max: 90, min: -90
  longitude: number | null // max: 180, min: -180
}

export interface HuntsmanDto {
  id: string
  user: IUserForAccount
  plot: PlotDto
  firstname: string
  lastname: string
  patronymic?: string
  position: "SENIOR" | "JUNIOR"
  displayInVouchers: boolean
  latitude: number | null
  longitude: number | null
  createdAt: string
  updatedAt: string
}

export interface GetHuntsmenParameters {
  fullname?: string
  plotId?: string
  page?: number
  size?: number
}

export interface GetHuntsmenResponse {
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
  content: HuntsmanDto[]
  number: 0
  sort: SortDto[]
  first: true
  last: true
  empty: true
}
