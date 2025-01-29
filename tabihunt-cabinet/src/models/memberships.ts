import { HunterDto } from "./hunters";
import { SortDto } from "./limits";

export interface MembershipData {
  hunterId: string;
  priceType: "STANDARD" | "MEMBERSHIP" | "PREFERENTIAL" | "SPECIAL" | "";
  years: number;
}

export interface MembershipDto {
  id: string;
  hunter: HunterDto;
  membershipNumber: string;
  membershipIssued: string;
  membershipExpiry: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMembershipsParameters {
  fullname?: string;
  year?: number;
  page?: number;
  size?: number;
}

export interface GetMembershipsResponse {
  totalPages: number;
  totalElements: number;
  pageable: {
    paged: true;
    unpaged: true;
    pageSize: number;
    pageNumber: number;
    offset: number;
    sort: SortDto[];
  };
  numberOfElements: number;
  size: number;
  content: MembershipDto[];
  number: 0;
  sort: SortDto[];
  first: true;
  last: true;
  empty: true;
}

export interface RenewMembershipData {
  years: number;
  priceType: "STANDARD" | "MEMBERSHIP" | "PREFERENTIAL" | "SPECIAL" | "";
}

export interface MembershipRenewalDto {
  id: string;
  renewalYears: number;
  priceType: "STANDARD" | "MEMBERSHIP" | "PREFERENTIAL" | "SPECIAL";
  createdAt: string;
  expiryDate: string;
  updatedAt: string;
}

export interface GetMembershipRenewalResponse {
  totalPages: number;
  totalElements: number;
  pageable: {
    paged: true;
    unpaged: true;
    pageSize: number;
    pageNumber: number;
    offset: number;
    sort: SortDto[];
  };
  numberOfElements: number;
  size: number;
  content: MembershipRenewalDto[];
  number: 0;
  sort: SortDto[];
  first: true;
  last: true;
  empty: true;
}
