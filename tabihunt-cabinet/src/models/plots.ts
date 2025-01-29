import { AnimalDto } from "./animals"

export interface PlotDto {
  id: string
  coordinates: PlotCoordinateDto[]
  name: string
  createdAt: string
  updatedAt: string
}

export interface PlotCoordinateDto {
  id: string
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
}

export interface GetPlotsResponse {
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
  content: PlotDto[]
  number: number
  sort: SortDto[]
  first: true
  last: true
  empty: true
}

export interface PlotDescriptionData {
  plotId: string
  imageUrl: string
  address: string
  phoneNumber: string
  email: string
  workingHours: WorkingHours
  aboutTranslations: PlotAboutTranslationDto[]
  servicesTranslations: PlotServicesTranslationDto[]
}

export interface PlotDescriptionDto {
  id: string
  plot: PlotDto
  imageUrl: string
  address: string
  phoneNumber: string
  email: string
  workingHours: WorkingHours
  aboutTranslations: PlotAboutTranslationDto[]
  servicesTranslations: PlotServicesTranslationDto[]
  animals: AnimalDto[]
  createdAt: string
  updatedAt: string
}

export interface GetPlotDescriptionsResponse {
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
  content: PlotDescriptionDto[]
  number: number
  sort: SortDto[]
  first: true
  last: true
  empty: true
}

export interface WorkingHours {
  [key: string]: DayHours
}

export interface DayHours {
  start: string
  end: string
}

export interface PlotAboutTranslationDto {
  language: "KK" | "RU"
  about: string
}

export interface PlotServicesTranslationDto {
  language: "KK" | "RU"
  services: string
}

interface SortDto {
  direction: string
  nullHandling: string
  ascending: boolean
  property: string
  ignoreCase: boolean
}
