import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { VoucherData, VoucherAnimalData } from "../models/vouchers"
import {
  setNewVoucherData,
  setVoucherAnimals
} from "../store/slices/vouchersSlice"
import { useAppDispatch, useAppSelector } from "../store"
import { getMeCompanyVoucherById } from "../store/actions/vouchersActions"

const useVoucherState = () => {
  const { voucherId } = useParams()
  const dispatch = useAppDispatch()
  const { newVoucherData, voucher } = useAppSelector(state => state.vouchers)
  const voucherAnimalsData: VoucherAnimalData[] = (voucher?.animals ?? []).map(
    animal => ({
      id:animal.id,
      animal: animal.animal,
      animalId: animal.animal.id,
      huntingStartDate: animal.huntingStartDate.slice(0, 10),
      huntingEndDate: animal.huntingStartDate.slice(0, 10),
      limitHeads: animal.limitHeads,
      standardPrice: animal.standardPrice,
      membershipPrice: animal.membershipPrice,
      preferentialPrice: animal.preferentialPrice,
      specialPrice: animal.specialPrice
    })
  )

  const huntsmenIdsData: string[] = (voucher?.huntsmen ?? []).map(
    huntsman => huntsman.id
  )

  const [state, setState] = useState<VoucherData>({
    type: newVoucherData?.type ?? voucher?.type ?? "ONE_TIME",
    huntsmen:newVoucherData?.huntsmen?? voucher?.huntsmen??[],
    plotId: newVoucherData?.plotId ?? "",
    huntsmenIds: newVoucherData?.huntsmenIds ?? huntsmenIdsData ?? [],
    animals: newVoucherData?.animals ?? voucherAnimalsData ?? [],
    duration: newVoucherData?.duration ?? voucher?.duration ?? 0,
    standardPrice: newVoucherData?.standardPrice ?? voucher?.standardPrice ?? 0,
    membershipPrice:
      newVoucherData?.membershipPrice ?? voucher?.membershipPrice ?? 0,
    preferentialPrice:
      newVoucherData?.preferentialPrice ?? voucher?.preferentialPrice ?? 0,
    specialPrice: newVoucherData?.specialPrice ?? voucher?.specialPrice ?? 0,
    dailyLimit: newVoucherData?.dailyLimit ?? voucher?.dailyLimit ?? 0,
    imageUrl: newVoucherData?.imageUrl ?? voucher?.imageUrl ?? "",
    rulesUrl: newVoucherData?.rulesUrl ?? voucher?.rulesUrl ?? ""
  })

  useEffect(() => {
    const getVoucher = async (voucherId: string) => {
      const voucher = await dispatch(getMeCompanyVoucherById(voucherId))
      if (voucher) {
        dispatch(setVoucherAnimals(voucher.animals))
        const voucherAnimalsData: VoucherAnimalData[] = (
          voucher?.animals ?? []
        ).map(animal => ({
          id: animal.id,
          animal:animal.animal,
          animalId: animal.animal.id,
          huntingStartDate: animal.huntingStartDate.slice(0, 10),
          huntingEndDate: animal.huntingEndDate.slice(0, 10),
          limitHeads: animal.limitHeads,
          standardPrice: animal.standardPrice,
          membershipPrice: animal.membershipPrice,
          preferentialPrice: animal.preferentialPrice,
          specialPrice: animal.specialPrice
        }))

        const huntsmenData: string[] = (voucher?.huntsmen ?? []).map(
          huntsman => huntsman.id
        )

        setState({
          type: newVoucherData?.type ?? voucher?.type ?? "ONE_TIME",
          plotId: newVoucherData?.plotId ?? voucher?.plot?.id ?? "",
          huntsmen:newVoucherData?.huntsmen?? voucher?.huntsmen??[],
          huntsmenIds: newVoucherData?.huntsmenIds ?? huntsmenData ?? [],
          animals: newVoucherData?.animals ?? voucherAnimalsData ?? [],
          duration: newVoucherData?.duration ?? voucher?.duration ?? 0,
          standardPrice:
            newVoucherData?.standardPrice ?? voucher?.standardPrice ?? 0,
          membershipPrice:
            newVoucherData?.membershipPrice ?? voucher?.membershipPrice ?? 0,
          preferentialPrice:
            newVoucherData?.preferentialPrice ??
            voucher?.preferentialPrice ??
            0,
          specialPrice:
            newVoucherData?.specialPrice ?? voucher?.specialPrice ?? 0,
          dailyLimit: newVoucherData?.dailyLimit ?? voucher?.dailyLimit ?? 0,
          imageUrl: newVoucherData?.imageUrl ?? voucher?.imageUrl ?? "",
          rulesUrl: newVoucherData?.rulesUrl ?? voucher?.rulesUrl ?? ""
        })
      }
    }
    if (voucherId) {
      getVoucher(voucherId)
    }
  }, [voucherId, dispatch])

  useEffect(() => {
    state && dispatch(setNewVoucherData(state))
  }, [state, dispatch])

  return [state, setState] as const
}

export default useVoucherState
