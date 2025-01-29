import { AxiosResponse } from "axios"
import { GetReportsVoucher, getReportsStock, GetReportsStockParameters, getReportsVoucher, GetReportsMembershipParameters, getReportsMembership, GetReportsUsageParameters, getReportsUsage } from "../models/reports"
import http from "./http.service"

export const reportsService = {
    async getReportsVoucher(
      payload: GetReportsVoucher
    ): Promise<AxiosResponse<getReportsVoucher>> {
    let url = `reports/voucher?page=${payload.page ?? 0}&size=${
        payload.size ?? 10
    }`
        if(payload.startPeriod) url += `&startPeriod=${payload.startPeriod}`
        if(payload.endPeriod) url += `&endPeriod=${payload.endPeriod}`
        if(payload.voucherType) url += `&voucherType=${payload.voucherType}`
        if(payload.plotId) url += `&plotId=${payload.plotId}`
        if(payload.animalType) url += `&animalType=${payload.animalType}`
    return await http.get(url)
    },
      async getReportsStock(
        payload: GetReportsStockParameters
      ): Promise<AxiosResponse<getReportsStock>> {
        return await http.get('reports/stock', {
          params: {
            page: payload.page ?? 0,
            plotId:payload.plotId,
            limitId: payload.limitId,
            animalType: payload.animalType,
          },
        });
      },

      async getUsageReports(
        payload: GetReportsUsageParameters
      ): Promise<AxiosResponse<getReportsUsage>> {
        return await http.get('reports/usage', {
          params: {
            page: payload.page?? 0,
            plotId:payload.plotId,
            animalType: payload.animalType,
            limitNumber: payload.limitNumber,
          },
        });
      },

      async getReportsMembership(
        payload: GetReportsMembershipParameters
      ): Promise<AxiosResponse<getReportsMembership>> {
      let url = `reports/membership?page=${payload.page ?? 0}&size=${
          payload.size ?? 10
      }`
          if(payload.startDate) url += `&startDate=${payload.startDate}`
          if(payload.endDate) url += `&endDate=${payload.endDate}`
          if(payload.fullname) url += `&fullname=${payload.fullname}`
          if(payload.year) url += `&year=${payload.year}`
      return await http.get(url)
      },

      async getExportReportsVoucher(payload: GetReportsVoucher) {
        return await http.get('reports/voucher/export', {
          params: {
            startPeriod: payload.startPeriod,
            endPeriod: payload.endPeriod,
            voucherType: payload.voucherType,
            plotId: payload.plotId,
            animalType: payload.animalType,
          },
          responseType: 'blob', 
        });
    },
    async getExportReportsUsage(payload: GetReportsUsageParameters) {
        return await http.get('reports/usage/export', {
          params: {
            plotId: payload.plotId,
            limitNumber: payload.limitNumber,
            animalType: payload.animalType,
          },
          responseType: 'blob', 
        });
    },
    async getExportReportsStock(
      payload: GetReportsStockParameters
    ){
      return await http.get('reports/stock/export', {
        params: {
          plotId: payload.plotId,
          limitNumber: payload.limitId,
          animalType: payload.animalType,
        },
        responseType: 'blob', 
      });
    },
    async getExportReportsMembership(
      payload: GetReportsMembershipParameters
    ){
      return await http.get('reports/membership/export', {
        params: {
          startDate: payload.startDate,
          endDate: payload.endDate,
          fullname: payload.fullname,
          year: payload.year
        },
        responseType: 'blob', 
      });
    },
}

