import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {GetreportPaginationData, GetReportsMembershipParameters, GetReportsStockParameters, GetReportsUsageParameters, GetReportsVoucher, MembershipReportDto, ReportsDto, StockReportsDto, UsageReportDto} from "../../models/reports"

interface ReportsState {
    loading: boolean
    error: string | null
    reportsData: ReportsDto[]
    reportsStockData:StockReportsDto[]
    reportsMembershipData: MembershipReportDto[]
    reportsUsageData: UsageReportDto[]
    exportReportData: GetReportsVoucher
    exportReportsStockData:GetReportsStockParameters
    exportReportsMembershipData: GetReportsUsageParameters
    exportReportsUsageData: GetReportsMembershipParameters
    reportPagination:GetreportPaginationData
  }

const initialState: ReportsState = {
    loading: false,
    error: null,
    exportReportData: {},
    reportsData: [],
    reportsUsageData:[],
    reportsStockData:[],
    reportsMembershipData:[],
    exportReportsStockData: {},
    exportReportsMembershipData: {},
    exportReportsUsageData: {},
    reportPagination:{}
  }

  export const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
      reportsFetching(state) {
        state.loading = true
      },
      reportsFetchSuccess(state) {
        state.loading = false
      },
      reportsFetchError(state, action: PayloadAction<string | null>) {
        state.loading = false
        state.error = action.payload
      },
      setReports(state, action: PayloadAction<ReportsDto[]>) {
        state.reportsData = action.payload
      },
      setReportsStock(state, action: PayloadAction<StockReportsDto[]>) {
        state.reportsStockData = action.payload
      },
      setReportsMembership(state, action: PayloadAction<MembershipReportDto[]>) {
        state.reportsMembershipData = action.payload
      },
      setReportsUsage(state, action: PayloadAction<UsageReportDto[]>) {
        state.reportsUsageData = action.payload
      },
      setExportDataReports(state, action: PayloadAction<GetReportsVoucher>) {
        state.exportReportData = action.payload
      },
      setExportReportsStockData(state, action: PayloadAction<GetReportsStockParameters>) {
        state.exportReportsStockData = action.payload
      },
      setExportReportsMembershipData(state, action: PayloadAction<GetReportsMembershipParameters>) {
        state.exportReportsMembershipData = action.payload
      },
      setExportReportsUsageData(state, action: PayloadAction<GetReportsUsageParameters>) {
        state.exportReportsUsageData = action.payload
      },
      setReportPagination(state, action: PayloadAction<GetreportPaginationData>) {
        state.reportPagination = action.payload
      },
      clearData(state) {
        state.reportsData = []
        state.reportsUsageData = []
        state.reportsStockData = []
        state.reportsMembershipData = []
        state.reportPagination = {}
      }
    }
  })

  export const {
    reportsFetching,
    reportsFetchSuccess,
    reportsFetchError,
    setReports,
    setExportDataReports,
    setReportsStock,
    setReportsMembership,
    clearData,
    setReportsUsage,
    setExportReportsStockData,
    setExportReportsMembershipData,
    setExportReportsUsageData,
    setReportPagination
  } = reportsSlice.actions
  
  export default reportsSlice.reducer