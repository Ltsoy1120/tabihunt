import { AxiosResponse } from "axios"
import { GetAnimalsParameters, GetAnimalsResponse } from "../models/animals"
import http from "./http.service"

export const animalsService = {
  async getAnimals(
    payload: GetAnimalsParameters
  ): Promise<AxiosResponse<GetAnimalsResponse>> {
    let url = `animals?type=${payload.animalType}&page=${
      payload.page ?? 0
    }&size=${payload.size ?? 100}`

    if (payload.name) {
      url += `&name=${payload.name}`
    }

    return await http.get(url)
  },

  async getLimitedAnimals(
      payload: GetAnimalsParameters
  ): Promise<AxiosResponse<GetAnimalsResponse>> {
    let url = `companies/me/limited-animals?type=${payload.animalType}&page=${
        payload.page ?? 0
    }&size=${payload.size ?? 100}`

    if (payload.name) {
      url += `&name=${payload.name}`
    }

    return await http.get(url)
  }
}
