import { CreateUserDto } from "./auth"
import { AddressData, AddressDto, UserDto } from "./companies"

export interface HunterData {
  user: CreateUserDto
  firstname: string
  lastname: string
  patronymic?: string
  dateOfBirth: string
  iin?: string
  gender: string
  address?: AddressData
  identificationNumber?: string
  identificationIssued?: string
  identificationValid?: string
  identificationIssuedBy?: string
  huntingLicenseNumber?: string
  huntingLicenseIssued?: string
  huntingLicenseValid?: string
}

export interface HunterDto {
  id: string
  user: UserDto
  firstname: string
  lastname: string
  patronymic?: string
  gender: string
  dateOfBirth: string
  iin?: string
  address?: AddressDto
  identificationNumber?: string
  identificationIssued?: string
  identificationValid?: string
  identificationIssuedBy?: string
  huntingLicenseNumber?: string
  huntingLicenseIssued?: string
  huntingLicenseValid?: string
  createdAt: string
  updatedAt: string
}
