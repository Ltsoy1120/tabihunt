import { AxiosResponse } from "axios"
import {
  GetMembershipRenewalResponse,
  GetMembershipsParameters,
  GetMembershipsResponse,
  MembershipData,
  MembershipDto,
  RenewMembershipData
} from "../models/memberships"
import { VoucherDto } from "../models/vouchers"
import http from "./http.service"

export const membershipsService = {
  async getMeCompanyMemberships(
    payload: GetMembershipsParameters
  ): Promise<AxiosResponse<GetMembershipsResponse>> {
    let url = `companies/me/memberships?page=${payload.page ?? 0}&size=${
      payload.size ?? 10
    }`

    if (payload.fullname) {
      url += `&fullname=${payload.fullname}`
    }

    if (payload.year) {
      url += `&year=${payload.year}`
    }

    return await http.get(url)
  },
  async getMeCompanyMembershipsById(
    membershipId: string
  ): Promise<AxiosResponse<MembershipDto>> {
    return await http.get(`companies/me/memberships/${membershipId}`)
  },
  async createMeCompanyMembership(
    payload: MembershipData
  ): Promise<AxiosResponse<MembershipDto>> {
    return await http.post(`companies/me/memberships`, payload)
  },
  async renewMembership(
    payload: RenewMembershipData,
    id: string
  ): Promise<AxiosResponse<VoucherDto>> {
    return await http.patch(`companies/me/memberships/${id}/renew`, payload)
  },
  async getMeCompanyMembershipsRenewals(
    membershipId: string
  ): Promise<AxiosResponse<GetMembershipRenewalResponse>> {
    return await http.get(`companies/me/memberships/${membershipId}/renewals`)
  },
  async createMeCompanyMembershipFile(
    payload: FormData
  ) {
    return await http.post(`companies/me/memberships/upload`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async getExportMembership(
    payload: GetMembershipsParameters
  ){
    return await http.get('companies/me/memberships/export', {
      params: {
        fullname: payload.fullname,
        year: payload.year
      },
      responseType: 'blob', 
    });
  },
}
