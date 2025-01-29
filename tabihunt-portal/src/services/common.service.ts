import { GetAnimalsParameters, GetAnimalsResponse } from "@/models/animals"
import { FileDto, PageRegionsDto } from "@/models/common"
import { AxiosResponse } from "axios"
import http from "./http.service"

export const commonService = {
  async getRegions(): Promise<AxiosResponse<PageRegionsDto>> {
    return await http.get(`regions?page=0&size=10`)
  },
  async uploadFile(file: FormData): Promise<AxiosResponse<FileDto>> {
    return await http.post(`files`, file, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
  async getFileById(id: string): Promise<AxiosResponse<string>> {
    return await http.get(`files/${id}`)
  },
  async getAnimals(
    payload: GetAnimalsParameters
  ): Promise<AxiosResponse<GetAnimalsResponse>> {
    let url = `animals?page=${payload.page ?? 0}&size=${payload.size ?? 100}`

    if (payload.animalType) {
      url += `&type=${payload.animalType}`
    }

    if (payload.name) {
      url += `&name=${payload.name}`
    }

    return await http.get(url)
  },
  async getVersion(): Promise<
    AxiosResponse<{
      version: string
    }>
  > {
    return await http.get(`contents/version`)
  }
}
