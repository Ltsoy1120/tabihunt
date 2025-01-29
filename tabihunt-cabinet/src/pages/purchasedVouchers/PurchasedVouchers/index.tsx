import { useEffect, useState } from "react"
import Empty from "../../../components/Empty"
import AnimalTypesModal from "../../../components/modals/AnimalTypesModal"
import PlotsModal from "../../../components/modals/PlotsModal"
import VoucherTypesModal from "../../../components/modals/VoucherTypesModal"
import Button from "../../../components/UI/buttons/Button"
import TextButton from "../../../components/UI/buttons/TextButton"
import { PlotDto } from "../../../models/plots"
import { useAppDispatch, useAppSelector } from "../../../store"
import PurchasedVoucherCard from "../components/PurchasedCard/PurchasedCard"
import "./style.scss"
import { getMeCompanyPurchasedVouchers } from "../../../store/actions/purchasedVoucherAction"
import {
  clearPurchasedData,
  setPurchasedVoucher
} from "../../../store/slices/PurchaseVoucherSlice"
export interface TypeOptions {
  label: string
  value: string | null
}

const PurchasedVouchers = () => {
  const dispatch = useAppDispatch()
  const checkList = useAppSelector(state => state.company.checklist)
  const { vouchers } = useAppSelector(state => state.purchasedVoucher)
  const [activePlot, setActivePlot] = useState<PlotDto | null>(null)
  const [activeAnimalType, setActiveAnimalType] = useState<TypeOptions>({
    label: "Вид дичи",
    value: null
  })
  const [activeVoucherType, setActiveVoucherType] = useState<TypeOptions>({
    label: "Тип путевки",
    value: null
  })
  const [isOpenPlotsModal, setOpenPlotsModal] = useState(false)
  const [isOpenAnimalTypesModal, setOpenAnimalTypesModal] = useState(false)
  const [isOpenVoucherTypesModal, setOpenVoucherTypesModal] = useState(false)

  const fetchVouchers = () => {
    dispatch(
      getMeCompanyPurchasedVouchers({
        ...(activeAnimalType && { animalType: activeAnimalType.value }),
        ...(activeVoucherType && { type: activeVoucherType.value }),
        ...(activePlot && { plotId: activePlot.id })
      })
    )
  }
  useEffect(() => {
    fetchVouchers()
  }, [activePlot, activeAnimalType, activeVoucherType])

  useEffect(() => {
    dispatch(clearPurchasedData())
    dispatch(setPurchasedVoucher(null))
  }, [])

  return (
    <>
      {checkList?.vouchers ? (
        <>
          {isOpenPlotsModal && (
            <PlotsModal
              activePlot={activePlot}
              setActivePlot={setActivePlot}
              close={() => setOpenPlotsModal(false)}
            />
          )}
          {isOpenAnimalTypesModal && (
            <AnimalTypesModal
              activeAnimalType={activeAnimalType}
              setActiveAnimalType={setActiveAnimalType}
              close={() => setOpenAnimalTypesModal(false)}
            />
          )}
          {isOpenVoucherTypesModal && (
            <VoucherTypesModal
              activeVoucherType={activeVoucherType}
              setActiveVoucherType={setActiveVoucherType}
              close={() => setOpenVoucherTypesModal(false)}
            />
          )}
          <div className="vouchers">
            <div className="vouchers__head">
              <TextButton
                endIcon="arrow-down"
                onClick={() => setOpenPlotsModal(true)}
              >
                {activePlot?.name ?? "Все участки"}
              </TextButton>
              <Button
                endIcon="circle-arrow-down"
                onClick={() => setOpenAnimalTypesModal(true)}
              >
                {activeAnimalType?.label}
              </Button>
              <Button
                endIcon="circle-arrow-down"
                onClick={() => setOpenVoucherTypesModal(true)}
              >
                {activeVoucherType.label}
              </Button>
            </div>
            {vouchers.length > 0 ? (
              vouchers.map(voucher => (
                <PurchasedVoucherCard
                  key={voucher.id}
                  voucher={voucher}
                  fetchVouchers={fetchVouchers}
                />
              ))
            ) : (
              <p>Путевки не найдены</p>
            )}
          </div>
        </>
      ) : (
        <Empty />
      )}
    </>
  )
}

export default PurchasedVouchers
