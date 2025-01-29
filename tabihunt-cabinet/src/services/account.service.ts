import { AxiosResponse } from "axios"
import http from "./http.service"
import { IGetAccountInfoResult } from "../models/account"

export const accountService = {
    async getMyAccountInfo(
    ): Promise<AxiosResponse<IGetAccountInfoResult>> {
        return await http.get(`companies/me`, {
            // headers: {
            //     "Content-Type": "application/json"
            // }
        })
    },


}
