import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  PurchaseUserVoucherData,
  regionsData,
  sellVoucherDto,
  VoucherIssuedDto
} from "../../models/purchasedVoucher"
import { RegionDto } from "../../models/companies"
import { VoucherData, VoucherDto } from "../../models/vouchers"
import { CartItem } from "../../pages/purchasedVouchers/steps/PurchasedVoucherStep3"

interface PlotsState {
  loading: boolean
  error: string | null
  vouchers: VoucherDto[]
  hunter: PurchaseUserVoucherData | null
  regionsData: regionsData[]
  voucherData: VoucherData | null
  sellVoucherData: sellVoucherDto | null
  cartAnimalData: CartItem[]
  purchasedVoucher: VoucherIssuedDto | null
}

const initialState: PlotsState = {
  loading: false,
  error: null,
  hunter: null,
  sellVoucherData: null,
  regionsData: [],
  vouchers: [],
  voucherData: null,
  cartAnimalData: [],
  purchasedVoucher: null
}

export const PurchaseVoucherSlice = createSlice({
  name: "purchaseVoucher",
  initialState,
  reducers: {
    huntingFetching(state) {
      state.loading = true
    },
    huntingFetchSuccess(state) {
      state.loading = false
    },
    huntingFetchError(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload
    },

    setHunterUserData(
      state,
      action: PayloadAction<PurchaseUserVoucherData | null>
    ) {
      state.hunter = action.payload
    },
    setVoucherData(state, action: PayloadAction<VoucherData | null>) {
      state.voucherData = action.payload
    },
    setRegionsData(state, action: PayloadAction<RegionDto[]>) {
      const result = action.payload.map(item => ({
        title: item.name,
        value: item.id
      }))
      state.regionsData = result
    },
    setPurchasedVouchers(state, action: PayloadAction<VoucherDto[]>) {
      state.vouchers = action.payload
    },
    setPurchasedVoucher(state, action: PayloadAction<VoucherIssuedDto | null>) {
      state.purchasedVoucher = action.payload
    },
    setSellVoucher(state, action: PayloadAction<sellVoucherDto | null>) {
      state.sellVoucherData = action.payload
    },
    setCartAnimal(state, action: PayloadAction<CartItem[]>) {
      state.cartAnimalData = action.payload
    },
    clearPurchasedData(state) {
      state.hunter = null
      state.sellVoucherData = null
      state.cartAnimalData = []
    }
  }
})
export const {
  huntingFetching,
  huntingFetchSuccess,
  huntingFetchError,
  setRegionsData,
  setHunterUserData,
  setPurchasedVouchers,
  setVoucherData,
  setSellVoucher,
  setCartAnimal,
  clearPurchasedData,
  setPurchasedVoucher
} = PurchaseVoucherSlice.actions
export default PurchaseVoucherSlice.reducer
