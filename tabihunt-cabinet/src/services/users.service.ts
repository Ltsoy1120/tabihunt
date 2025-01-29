import axios, {AxiosResponse} from "axios"
import {UserData} from "../models/companies";

export const UsersService = {
  async getUsersExists(payload: UserData): Promise<AxiosResponse> {
    const url = 'users/exists';

    const params: { email?: string; phoneNumber?: string } = {};

    if (payload.email) {
      params.email = payload.email;
    }

    if (payload.phoneNumber) {
      params.phoneNumber = payload.phoneNumber;
    }

    return await axios.get(url, { params });
  }
}
