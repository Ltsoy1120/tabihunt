import { SortDto } from "./limits"

export interface GetReportsVoucher {
    startPeriod?: string
    endPeriod?: string
    voucherType?: string
    animalType?:string
    plotId?: string
    size?: number
    page?:number
  }

  export interface GetReportsResponse {
    id:number
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
    number: 0
    sort: SortDto[]
    first: true
    last: true
    empty: true
  }

  export interface GetReportsStockParameters {
    animalType?:string
    limitId?:string
    plotId?: string
    size?: number
    page?:number
  }

  export interface GetReportsUsageParameters {
    animalType?:string
    limitNumber?:string
    plotId?: string
    size?: number
    page?:number
  }

  export interface GetReportsMembershipParameters {
    startDate?:string
    endDate?:string
    fullname?: string
    year?:number
    size?: number
    page?:number
  }

  export interface GetreportPaginationData {
    last?: boolean
    first?: boolean
    number?:number
    totalPages?: number
  }

  export interface ReportsDto {
    id:number
    voucherSlug: string,
    purchaseDate: string,
    plot: string,
    hunterFullname: string,
    hunterAddress: string,
    animalTypes: string,
    animals: string,
    voucherType: string,
    huntingPeriod: string,
    totalAmount: string
  }

  export interface StockReportsDto {
    plot: string,
    animalType: string,
    animal: string,
    limitNumber: string,
    originalHeads: string,
    soldHeads: string,
    remainingHeads: string
  }
  export interface MembershipReportDto {
    expiryDate:string
    fullName: string
    issueDate:string
    membershipNumber:string
  }
  export interface UsageReportDto {
      plot: string
      animalType: string,
      animal: string,
      limitNumber: string
      originalHeads: string,
      soldHeads: string
  }
  export interface getReportsVoucher extends GetReportsResponse {
    content: ReportsDto[]
  }
  export interface getReportsStock extends GetReportsResponse {
    content: StockReportsDto[]
  }
  
  export interface getReportsMembership extends GetReportsResponse {
    content: MembershipReportDto[]
  }
  export interface getReportsUsage extends GetReportsResponse {
    content: UsageReportDto[]
  }