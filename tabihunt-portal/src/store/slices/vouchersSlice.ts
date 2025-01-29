import {
  PurchasedVoucherDto,
  PurchaseVoucherData,
  ReportPurchasedVoucherData,
  VoucherDto,
  VoucherIssuedDto,
  VoucherPriceType
} from "@/models/vouchers"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface VoucherState {
  loading: boolean
  error: any | null
  purchaseVoucherData: PurchaseVoucherData | null
  voucher: VoucherDto | null
  priceType: VoucherPriceType | null
  isAgreeWithHuntingRules: boolean
  purchasedVoucher: VoucherIssuedDto | null
  meVouchers: PurchasedVoucherDto[]
  meVoucherById: PurchasedVoucherDto | null
  reportPurchasedVoucherData: ReportPurchasedVoucherData[] | null
  isShowBasket: boolean
}

const initialState: VoucherState = {
  loading: false,
  error: null,
  purchaseVoucherData: null,
  voucher: null,
  priceType: null,
  isAgreeWithHuntingRules: false,
  purchasedVoucher: null,
  meVouchers: [],
  meVoucherById: null,
  reportPurchasedVoucherData: null,
  isShowBasket: false
}

export const vouchersSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {
    vouchersFetching(state) {
      state.loading = true
    },
    vouchersFetchSuccess(state) {
      state.loading = false
    },
    vouchersFetchError(state, action: PayloadAction<any | null>) {
      state.loading = false
      state.error = action.payload
    },
    setVoucherData(state, action: PayloadAction<PurchaseVoucherData | null>) {
      state.purchaseVoucherData = action.payload
    },
    setVoucher(state, action: PayloadAction<VoucherDto | null>) {
      state.voucher = action.payload
    },
    setPriceType(state, action: PayloadAction<VoucherPriceType | null>) {
      state.priceType = action.payload
    },
    setAgreeWithHuntingRules(state, action: PayloadAction<boolean>) {
      state.isAgreeWithHuntingRules = action.payload
    },
    setPurchasedVoucher(state, action: PayloadAction<VoucherIssuedDto>) {
      state.purchasedVoucher = action.payload
    },
    setMeVouchers(state, action: PayloadAction<PurchasedVoucherDto[]>) {
      state.meVouchers = action.payload
    },
    setMeVoucherById(state, action: PayloadAction<PurchasedVoucherDto | null>) {
      state.meVoucherById = action.payload
    },
    setReportPurchasedVoucherData(
      state,
      action: PayloadAction<ReportPurchasedVoucherData[] | null>
    ) {
      state.reportPurchasedVoucherData = action.payload
    },
    setShowBasket(state, action: PayloadAction<boolean>) {
      state.isShowBasket = action.payload
    }
  }
})

export const {
  vouchersFetching,
  vouchersFetchSuccess,
  vouchersFetchError,
  setVoucherData,
  setVoucher,
  setPriceType,
  setAgreeWithHuntingRules,
  setPurchasedVoucher,
  setMeVouchers,
  setMeVoucherById,
  setReportPurchasedVoucherData,
  setShowBasket
} = vouchersSlice.actions

export default vouchersSlice.reducer
