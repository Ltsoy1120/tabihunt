import { AnimalDto, AnimalType } from "./animals"
import { WorkingHours } from "./common"

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

// export interface PlotDescriptionData {
//   plotId: string
//   imageUrl: string
//   address: string
//   phoneNumber: string
//   email: string
//   workingHours: WorkingHours
//   aboutTranslations: PlotAboutTranslationDto[]
//   servicesTranslations: PlotServicesTranslationDto[]
//   animalIds: string[]
// }

export interface PlotDescriptionDto {
  id: string
  plot: PlotDto
  imageUrl: string
  phoneNumber: string
  email: string
  address: string
  workingHours: WorkingHours
  about: string
  services: string
  animals: AnimalDto[]
  createdAt: string
  updatedAt: string
}

export interface GetPlotDescriptionParameters {
  regionId: string
  animalType?: AnimalType
  plotName?: string
  animalIds?: string
  page?: number
  size?: number
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
