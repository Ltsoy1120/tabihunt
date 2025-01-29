export interface CompanyData {
  user: UserData
  address: AddressData
  name: string
  bin: string
}

export interface CompanyDto {
  id: string
  user: UserDto
  address: AddressDto
  name: string
  bin: string
  membershipStandardPrice?: number
  membershipMembershipPrice?: number
  membershipPreferentialPrice?: number
  membershipSpecialPrice?: number
  createdAt: string
  updatedAt: string
}

export interface UpdateCurrentCompanyData {
  membershipStandardPrice: number
  membershipMembershipPrice: number
  membershipPreferentialPrice: number
  membershipSpecialPrice: number
}

export interface UserData {
  email: string
  phoneNumber: string
  password: string
}

export interface UserDto {
  id: string
  email?: string
  phoneNumber?: string
  role: string
  language: string
  createdAt: string
  updatedAt: string
}

export interface AddressData {
  regionId?: string
  street?: string
  city?: string
  houseNumber?: string
  flatNumber?: string
  postalCode?: string
  latitude?: number // широта (-90, 90)
  longitude?: number // долгота (-180, 180)
}

export interface AddressDto {
  id: string
  region: RegionDto
  street?: string
  city?: string
  houseNumber?: string
  flatNumber?: string
  postalCode?: string
  latitude?: number // широта (-90, 90)
  longitude?: number // долгота (-180, 180)
  createdAt: string
  updatedAt: string
}

export interface RegionDto {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface ChecklistDto {
  vouchers: boolean
  limits: boolean
  huntsmen: boolean
}
