import { AxiosResponse } from "axios"
import http from "./http.service"

interface FileDto {
  id: string
  fileName: string
  fileType: string
  filePath: string
  createdAt: string
  updatedAt: string
}

export const commonService = {
  async uploadFile(file: FormData): Promise<AxiosResponse<FileDto>> {
    return await http.post(`files`, file, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
  async getFileById(id: string): Promise<AxiosResponse<string>> {
    return await http.get(`files/${id}`)
  }
}
