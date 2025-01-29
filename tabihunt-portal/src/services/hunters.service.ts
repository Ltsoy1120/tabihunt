import { AxiosResponse } from "axios";
import { TokenResponseDto, UserData } from "@/models/auth";
import { HunterData, HunterDto } from "../models/hunter";
import http from "./http.service";

export const huntersService = {
  // async createHunterMe(payload: HunterData): Promise<AxiosResponse<HunterDto>> {
  //   return await http.post(`hunters/me`, payload)
  // },
  // async getHunterByIin(hunterIin: string): Promise<AxiosResponse<HunterDto>> {
  //   return await http.get(`companies/me/hunters?iin=${hunterIin}`)
  // },
  async registerWithEmail(
    payload: HunterData
  ): Promise<AxiosResponse<TokenResponseDto>> {
    return await http.post(`hunters/register/email`, payload);
  },
  async registerWithPhone(
    payload: HunterData
  ): Promise<AxiosResponse<TokenResponseDto>> {
    return await http.post(`hunters/register/phone`, payload);
  },
  async getUsersExists(payload: UserData): Promise<AxiosResponse> {
    const url = "users/exists";

    const params: { email?: string; phoneNumber?: string } = {};

    if (payload.email) {
      params.email = payload.email;
    }

    if (payload.phoneNumber) {
      params.phoneNumber = payload.phoneNumber;
    }

    return await http.get(url, { params });
  },
  async getMeHunter(): Promise<AxiosResponse<HunterDto>> {
    return await http.get(`hunters/me`);
  },
  async editMeHunter(payload: HunterData): Promise<AxiosResponse<HunterDto>> {
    return await http.patch(`/hunters/me`, payload);
  },
};
