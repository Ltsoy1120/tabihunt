import { AppDispatch } from ".."
import { GetHuntsmenParameters } from "../../models/huntsmen"
import { sellVoucherDto } from "../../models/purchasedVoucher"
import { purchasedVouchersService } from "../../services/purchasedVoucher.service"
import {
  setPurchasedVoucher,
  setPurchasedVouchers,
  setRegionsData,
  setVoucherData
} from "../slices/PurchaseVoucherSlice"
import { vouchersFetchError } from "../slices/vouchersSlice"

export const getMeCompanyPurchasedVouchers = (
  payload: GetHuntsmenParameters
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await purchasedVouchersService.getMeCompanyVouchers(payload)
      if (resp.data) {
        dispatch(setPurchasedVouchers(resp.data.content))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}
export const getRegions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await purchasedVouchersService.getRegions()
      if (resp.data && resp.data.content) {
        dispatch(setRegionsData(resp.data.content))
        return resp.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getPurchasedData = (VoucherId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await purchasedVouchersService.getPurchasedData(VoucherId)
      if (resp.data) {
        dispatch(setVoucherData(resp.data))
        return resp.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const CreateSellData = (VoucherId: string, data: sellVoucherDto) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await purchasedVouchersService.createSell(VoucherId, data)
      if (resp.data) {
        dispatch(setPurchasedVoucher(resp.data))
        return resp.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}
