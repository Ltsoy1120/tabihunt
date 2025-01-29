export interface IUserForAccount {
  id: string
  email: string
  phoneNumber: string
  role: "HUNTER" | "HUNTSMAN" | "COMPANY" | "ADMIN" | ""
  language: "KK" | "RU"
  createdAt: string | null
  updatedAt: string | null
}
export interface IRegionForAccount {
  id: string
  name: string
  createdAt: string | null
  updatedAt: string | null
}
export interface IAdressForAccount {
  id: string
  region: IRegionForAccount
  street: string
  houseNumber: string
  flatNumber: string | null
  postalCode: string | null
  latitude: number | null
  longitude: number | null
  createdAt: string | null
  updatedAt: string | null
}

export interface IGetAccountInfoResult {
  id: string
  user: IUserForAccount
  name: string
  address: IAdressForAccount
  bin: string
  createdAt: string | null
  updatedAt: string | null
}
