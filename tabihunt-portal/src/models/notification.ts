import { PageableDto, SortDto } from "./common"

export interface PageNotificationDto {
  totalPages: number
  totalElements: number
  pageable: PageableDto
  numberOfElements: number
  size: number
  content: NotificationDto[]
  number: number
  sort: SortDto[]
  first: boolean
  last: boolean
  empty: boolean
}

export interface NotificationDto {
  id: string
  subject: string
  body: string
  isViewed: string
  createdAt: string
  updatedAt: string
}

export interface GetPageParameters {
  page?: number
  size?: number
}
