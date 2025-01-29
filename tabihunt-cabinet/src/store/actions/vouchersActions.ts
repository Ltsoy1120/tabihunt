import { AppDispatch } from ".."
import { GetHuntsmenParameters } from "../../models/huntsmen"
import { VoucherData } from "../../models/vouchers"
import { vouchersService } from "../../services/vouchers.service"
import {
  vouchersFetching,
  vouchersFetchSuccess,
  vouchersFetchError,
  setVouchers,
  setVoucher,
  setNewVoucherData
} from "../slices/vouchersSlice"

// Получить путевки текущей компании (СОХ)
export const getMeCompanyVouchers = (payload: GetHuntsmenParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.getMeCompanyVouchers(payload)
      if (resp.data) {
        dispatch(vouchersFetchSuccess())
        dispatch(setVouchers(resp.data.content))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}

export const getMeCompanyVoucherById = (voucherId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.getMeCompanyVoucherById(voucherId)
      if (resp.data) {
        dispatch(setVoucher(resp.data))
        dispatch(vouchersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}

export const createMeCompanyVoucher = (payload: VoucherData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.createMeCompanyVoucher(payload)
      if (resp.data) {
        dispatch(setNewVoucherData(null))
        dispatch(vouchersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}

export const editMeCompanyVoucher = (
  payload: VoucherData,
  voucherId: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.editMeCompanyVoucher(
        payload,
        voucherId
      )
      if (resp.data) {
        dispatch(setNewVoucherData(null))
        dispatch(vouchersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}

export const archiveMeCompanyVoucher = (voucherId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.archiveMeCompanyVoucher(voucherId)
      if (resp.data) {
        dispatch(vouchersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}

export const unarchiveMeCompanyVoucher = (voucherId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.unarchiveMeCompanyVoucher(voucherId)
      if (resp.data) {
        dispatch(vouchersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}
