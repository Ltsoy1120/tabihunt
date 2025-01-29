import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { sellVoucherDto } from "../models/purchasedVoucher"
import { setSellVoucher } from "../store/slices/PurchaseVoucherSlice"

const usePurchaseVoucherState = () => {
  const dispatch = useAppDispatch()
  const { sellVoucherData } = useAppSelector(state => state.purchasedVoucher)

  const [state, setState] = useState<sellVoucherDto>({
    startDate: sellVoucherData?.startDate ?? "",
    endDate: sellVoucherData?.endDate ?? "",
    priceType: sellVoucherData?.priceType ?? "",
    paymentMethod: sellVoucherData?.paymentMethod ?? "",
    hunterId: sellVoucherData?.hunterId ?? "",
    animals: sellVoucherData?.animals ?? [],
    withQrCode: sellVoucherData?.withQrCode ?? false
  })

  useEffect(() => {
    dispatch(setSellVoucher(state))
  }, [state, dispatch])

  return [state, setState] as const
}

export default usePurchaseVoucherState
