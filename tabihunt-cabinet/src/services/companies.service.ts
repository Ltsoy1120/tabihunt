import { AxiosResponse } from "axios"
import {
  ChecklistDto,
  CompanyData,
  CompanyDto,
  UpdateCurrentCompanyData
} from "../models/companies"

import http from "./http.service"

export const companiesService = {
  async createCompany(
    payload: CompanyData
  ): Promise<AxiosResponse<CompanyDto>> {
    return await http.post(`companies`, payload)
  },
  async getMeCompany(): Promise<AxiosResponse<CompanyDto>> {
    return await http.get(`companies/me`)
  },
  async getMeCompaniesChecklist(): Promise<AxiosResponse<ChecklistDto>> {
    return await http.get(`companies/me/checklist`)
  },
  async updateMeCompanyMembership(
    payload: UpdateCurrentCompanyData
  ): Promise<AxiosResponse<CompanyDto>> {
    return await http.patch(`companies/me`, payload)
  }
}
