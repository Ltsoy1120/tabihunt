export interface MembershipRenewData {
  years: number;
  paymentMethod: "CARD" | "CASH" | "KASPI" | null;
}

export interface MembershipsRenewResponse {
  kaspiPaymentUrl: string;
  membershipRenewal: MembershipRenewalDto;
}

export interface MembershipRenewalDto {
  id: string;
  priceType: string;
  renewalYears: number;
  createdAt: string;
  updatedAt: string;
}

export enum MembershipPriceType {
  STANDARD = "STANDARD", // стандартная
  MEMBERSHIP = "MEMBERSHIP", // с членством
  PREFERENTIAL = "PREFERENTIAL", // для пенсионера
  SPECIAL = "SPECIAL", // для особых лиц
}
