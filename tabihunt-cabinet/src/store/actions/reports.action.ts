import { AppDispatch } from ".."
import { GetReportsMembershipParameters, GetReportsStockParameters, GetReportsUsageParameters, GetReportsVoucher } from "../../models/reports"
import { reportsService } from "../../services/reports.service"
import { reportsFetchError, reportsFetching, reportsFetchSuccess, setReportPagination, setReports, setReportsMembership, setReportsStock, setReportsUsage } from "../slices/reportsSlice"


export const getMeCompanyReports = (payload: GetReportsVoucher) => {
    return async (dispatch: AppDispatch) => {
      try {
        const resp = await reportsService.getReportsVoucher(payload)
        dispatch(reportsFetching())
        if (resp.data) {
          dispatch(reportsFetchSuccess())
          dispatch(setReports(resp.data.content))
          dispatch(setReportPagination(resp.data))
          return resp.data
        }
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : String(error)
        dispatch(reportsFetchError(errMessage))
      }
    }
}

export const getStockReports = (payload: GetReportsStockParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await reportsService.getReportsStock(payload)
      dispatch(reportsFetching())
      if (resp.data) {
        dispatch(reportsFetchSuccess())
        dispatch(setReportsStock(resp.data.content))
        dispatch(setReportPagination(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(reportsFetchError(errMessage))
    }
  }
}

export const getUsageReports = (payload: GetReportsUsageParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await reportsService.getUsageReports(payload)
      dispatch(reportsFetching())
      if (resp.data) {
        dispatch(reportsFetchSuccess())       
        dispatch(setReportsUsage(resp.data.content))
        dispatch(setReportPagination(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(reportsFetchError(errMessage))
    }
  }
}


export const getMembershipReports = (payload: GetReportsMembershipParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await reportsService.getReportsMembership(payload)
      dispatch(reportsFetching())
      if (resp.data) {
        dispatch(reportsFetchSuccess())
        dispatch(setReportsMembership(resp.data.content))
        dispatch(setReportPagination(resp.data))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(reportsFetchError(errMessage))
    }
  }
}

// СКАЧИВАНИЕ ОТЧЕТОВ

export const getExportReports = (payload: GetReportsVoucher) => {
    return async (dispatch: AppDispatch) => {
      try {
        const res = await reportsService.getExportReportsVoucher(payload)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Отчет по продаже путевок.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : String(error)
        dispatch(reportsFetchError(errMessage))
      }
    }
  }


  export const getExportReportsStock = (payload: GetReportsVoucher) => {
    return async (dispatch: AppDispatch) => {
      try {
        const res = await reportsService.getExportReportsStock(payload)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Отчет остатка природных ресурсов.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : String(error)
        dispatch(reportsFetchError(errMessage))
      }
    }
  }
  
  export const getExportReportsUsage = (payload: GetReportsVoucher) => {
    return async (dispatch: AppDispatch) => {
      try {
        const res = await reportsService.getExportReportsUsage(payload)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Отчет по использованию животного мира.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : String(error)
        dispatch(reportsFetchError(errMessage))
      }
    }
  }

  export const getExportReportsMembership = (payload: GetReportsVoucher) => {
    return async (dispatch: AppDispatch) => {
      try {
        const res = await reportsService.getExportReportsMembership(payload)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Отчет по членству в охотничьем обществе.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : String(error)
        dispatch(reportsFetchError(errMessage))
      }
    }
  }
  
  