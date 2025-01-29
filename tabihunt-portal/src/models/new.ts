import { PageableDto, SortDto } from "./common"

export interface NewsDto {
  id: string
  imageUrl: string
  url?: string
  title: string
  description: string
  views: number
  createdAt: string
  updatedAt: string
}

export interface GetNewsResponse {
  totalPages: number
  totalElements: number
  pageable: PageableDto
  numberOfElements: number
  size: number
  content: NewsDto[]
  number: 0
  sort: SortDto[]
  first: true
  last: true
  empty: true
}
