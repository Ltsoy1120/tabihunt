import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { VoucherData, VoucherDto, VoucherAnimalDto } from "../../models/vouchers"

interface VouchersState {
  loading: boolean
  error: string | null
  vouchers: VoucherDto[]
  voucher: VoucherDto | null
  voucherAnimals: VoucherAnimalDto[] | null
  newVoucherData: VoucherData | null
  docFileName: string
}

const initialState: VouchersState = {
  loading: false,
  error: null,
  vouchers: [],
  voucher: null,
  voucherAnimals: null,
  newVoucherData: null,
  docFileName: ""
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
    vouchersFetchError(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload
    },
    setVouchers(state, action: PayloadAction<VoucherDto[]>) {
      state.vouchers = action.payload
    },
    setVoucher(state, action: PayloadAction<VoucherDto | null>) {
      state.voucher = action.payload
    },
    setVoucherAnimals(state, action: PayloadAction<VoucherAnimalDto[] | null>) {
      state.voucherAnimals = action.payload
    },
    setNewVoucherData(state, action: PayloadAction<VoucherData | null>) {
      state.newVoucherData = action.payload
    },
    setDocFileName(state, action: PayloadAction<string>) {
      state.docFileName = action.payload
    }
  }
})

export const {
  vouchersFetching,
  vouchersFetchSuccess,
  vouchersFetchError,
  setVouchers,
  setVoucher,
  setVoucherAnimals,
  setNewVoucherData,
  setDocFileName
} = vouchersSlice.actions

export default vouchersSlice.reducer
