import { UserDto } from "./auth"
import { AddressData, AddressDto } from "./common"
import { HuntingSocietyDto } from "./huntingSociety"

export interface HunterData {
  phoneNumber?: string
  email?: string
  password?: string
  otp?: string
  firstname: string
  lastname: string
  patronymic?: string
  imageUrl?: string
  dateOfBirth: string
  gender: "MALE" | "FEMALE"
  iin?: string
  address: AddressData
  identificationNumber?: string
  identificationIssued?: string
  identificationValid?: string
  identificationIssuedBy: string
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
  imageUrl?: string
  dateOfBirth: string
  gender: "MALE" | "FEMALE"
  iin?: string
  address: AddressDto
  identificationNumber?: string
  identificationIssued?: string
  identificationValid?: string
  identificationIssuedBy?: string
  huntingLicenseNumber?: string
  huntingLicenseIssued?: string
  huntingLicenseValid?: string
  memberships?: HunterMembershipDto[]
  createdAt: string
  updatedAt: string
}

export interface HunterMembershipDto {
  id: string
  // company: CompanyDto
  huntingSociety: HuntingSocietyDto
  city: string
  membershipNumber: string
  membershipIssued: string
  membershipExpiry: string
  createdAt: string
  updatedAt: string
}
