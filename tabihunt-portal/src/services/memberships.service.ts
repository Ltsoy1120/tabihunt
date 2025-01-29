import {
  MembershipsRenewResponse,
  MembershipRenewData,
} from "@/models/membership";
import { AxiosResponse } from "axios";
import http from "./http.service";

export const membershipsService = {
  async renewHunterMembership(
    payload: MembershipRenewData,
    membershipId: string
  ): Promise<AxiosResponse<MembershipsRenewResponse>> {
    return await http.patch(
      `hunters/me/memberships/${membershipId}/renew`,
      payload
    );
  },
};
