import { AxiosResponse } from "axios";
import http from "./http.service";
import {
  GetHuntingSocietiesParameters,
  GetHuntingSocietiesResponse,
  HuntingSocietyDto,
} from "@/models/huntingSociety";
import { MembershipPriceType } from "@/models/membership";

export const huntingSocietiesService = {
  async getMeHuntingSocieties(
    payload?: GetHuntingSocietiesParameters
  ): Promise<AxiosResponse<GetHuntingSocietiesResponse>> {
    let url = `hunters/me/hunting-societies?page=${payload?.page ?? 0}&size=${
      payload?.size ?? 10
    }`;
    return await http.get(url);
  },
  async getHuntingSocietyById(
    huntingSocietiesId: string
  ): Promise<AxiosResponse<HuntingSocietyDto>> {
    return await http.get(`hunting-societies/${huntingSocietiesId}`);
  },
  async getMeHuntingSocietyPricingType(
    huntingSocietiesId: string
  ): Promise<AxiosResponse<MembershipPriceType>> {
    return await http.get(
      `hunters/me/hunting-societies/${huntingSocietiesId}/pricing-type`
    );
  },
};
