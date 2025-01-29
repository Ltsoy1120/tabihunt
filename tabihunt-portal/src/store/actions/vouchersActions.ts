import {
  GetPurchasedVouchersParameters,
  PurchaseVoucherData,
  ReportPurchasedVoucherData
} from "@/models/vouchers"
import { AppDispatch } from ".."
import { vouchersService } from "../../services/vouchers.service"
import {
  vouchersFetching,
  vouchersFetchSuccess,
  vouchersFetchError,
  setVoucher,
  setPriceType,
  setPurchasedVoucher,
  setVoucherData,
  setMeVouchers,
  setMeVoucherById
} from "../slices/vouchersSlice"

// Получить путевку по id
export const getVoucherById = (voucherId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.getVoucherById(voucherId)
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

// Получить возможные даты для покупки путевки для авторизованного охотника по id путевки
export const getAvailableDatesVoucherById = (
  voucherId: string,
  startDate: string,
  endDate: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.getAvailableDatesVoucherById(
        voucherId,
        startDate,
        endDate
      )
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

// Получить тип прайса для авторизованного охотника по id путевки
export const getPriceTypeVoucherById = (voucherId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.getPriceTypeVoucherById(voucherId)
      if (resp.data) {
        dispatch(setPriceType(resp.data))
        dispatch(vouchersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}

// Создание путевки (покупка)
export const purchaseVoucherById = (
  payload: PurchaseVoucherData,
  voucherId: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const resp = await vouchersService.purchaseVoucherById(payload, voucherId)
      if (resp.data) {
        dispatch(setPurchasedVoucher(resp.data))
        dispatch(setVoucherData(null))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}

// Получить мои путевки
export const getMePurchasedVouchers = (
  payload?: GetPurchasedVouchersParameters
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.getMePurchasedVouchers(payload ?? {})
      if (resp.data) {
        dispatch(setMeVouchers(resp.data.content))
        dispatch(vouchersFetchSuccess())
        return resp.data.content
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}

// Получить мою путевку по id
export const getMePurchasedVoucherById = (purchasedVoucherId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.getMePurchasedVoucherById(
        purchasedVoucherId
      )
      if (resp.data) {
        dispatch(setMeVoucherById(resp.data))
        dispatch(vouchersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}

// Создать отчет по моей путевке по id
export const reportMePurchasedVoucher = (
  payload: ReportPurchasedVoucherData[],
  purchasedVoucherId: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(vouchersFetching())
      const resp = await vouchersService.reportMePurchasedVoucher(
        payload,
        purchasedVoucherId
      )
      if (resp.data) {
        dispatch(setMeVoucherById(resp.data))
        dispatch(vouchersFetchSuccess())
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(vouchersFetchError(errMessage))
    }
  }
}
