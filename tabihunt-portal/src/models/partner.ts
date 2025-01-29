export interface PartnershipContentDto {
  imageUrl: string
  about: string
  advantages: string
  email: string
  phoneNumber: string
  instagramUrl: string
  whatsappUrl: string
  telegramUrl: string
  facebookUrl: string
}

export interface PartnershipApplyData {
  name: string
  phoneNumber: string
  plotName?: string
  regionId: string
}

export interface PartnershipDto {
  id: string
  name: string
  phoneNumber: string
  plotName?: string
  createdAt: string
  updatedAt: string
}
