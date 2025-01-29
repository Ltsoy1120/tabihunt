import { UserDto } from "./auth"
import { AddressDto } from "./common"

export interface CompanyDto {
  id: string
  user: UserDto
  name: string
  address: AddressDto
  bin: string
  membershipStandardPrice?: number
  membershipMembershipPrice?: number
  membershipPreferentialPrice?: number
  membershipSpecialPrice?: number
  createdAt: string
  updatedAt: string
}
