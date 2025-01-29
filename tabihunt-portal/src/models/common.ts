export interface AddressData {
  regionId: string
  city: string
  street: string
  houseNumber: string
  flatNumber?: string
  postalCode?: string
  latitude?: number
  longitude?: number
}

export interface AddressDto {
  id: string
  region: RegionDto
  city: string
  street?: string
  houseNumber?: string
  flatNumber?: string
  postalCode?: string
  latitude?: number
  longitude?: number
  createdAt: string
  updatedAt: string
}

export interface RegionDto {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface PageRegionsDto {
  totalPages: number
  totalElements: number
  pageable: PageableDto
  numberOfElements: number
  size: number
  content: RegionDto[]
  number: number
  sort: SortDto[]
  first: boolean
  last: boolean
  empty: boolean
}

export interface PageableDto {
  paged: boolean
  unpaged: boolean
  pageSize: number
  pageNumber: number
  offset: number
  sort: SortDto[]
}

export interface SortDto {
  direction: string
  nullHandling: string
  ascending: boolean
  property: string
  ignoreCase: boolean
}

export interface FileDto {
  id: string
  fileName: string
  fileType: string
  filePath: string
  createdAt: string
  updatedAt: string
}

export interface WorkingHours {
  [key: string]: DayHours
}

export interface DayHours {
  start: string //^([01]\d|2[0-3]):([0-5]\d)$
  end: string
}
