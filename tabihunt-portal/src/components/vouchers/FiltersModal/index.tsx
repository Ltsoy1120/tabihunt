import Button from "@/components/UI/buttons/Button"
import { AnimalType } from "@/models/animals"
import { VoucherType } from "@/models/vouchers"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import "./style.scss"

interface FiltersModalProps {
  activeVoucherType: VoucherType
  setActiveVoucherType: Dispatch<SetStateAction<VoucherType>>
  setOpenVoucherTypesModal: () => void
  activeAnimalType: AnimalType
  setActiveAnimalType: Dispatch<SetStateAction<AnimalType>>
  setOpenAnimalTypesModal: () => void
  close: () => void
}

const FiltersModal = ({
  activeVoucherType,
  setActiveVoucherType,
  activeAnimalType,
  setActiveAnimalType,
  setOpenVoucherTypesModal,
  setOpenAnimalTypesModal,
  close
}: FiltersModalProps) => {
  const { t } = useTranslation()
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const resetActiveVoucherType = () => {
    setActiveVoucherType(null)
    const params = new URLSearchParams(searchParams)
    params.delete("type")
    replace(`${pathname}?${params.toString()}`)
  }

  const resetActiveAnimalType = () => {
    setActiveAnimalType(null)
    const params = new URLSearchParams(searchParams)
    params.delete("animalType")
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Modal size={"360px"} close={close}>
      <div className="filters-modal">
        <h2 className="filters-modal__title">
          {t("main.filter-select-title")}
        </h2>
        <div className="filters-modal__list">
          <Button
            endIcon={activeVoucherType ? "close" : "arrow-right"}
            onClick={
              activeVoucherType
                ? resetActiveVoucherType
                : setOpenVoucherTypesModal
            }
            className={activeVoucherType ? "active" : ""}
          >
            {activeVoucherType === "SEASONAL"
              ? t("main.voucher-type-select.seasonal")
              : activeVoucherType === "ONE_TIME"
              ? t("main.voucher-type-select.one-time")
              : t("main.voucher-type-select.title")}
          </Button>
          <Button
            endIcon={activeAnimalType ? "close" : "arrow-right"}
            onClick={
              activeAnimalType ? resetActiveAnimalType : setOpenAnimalTypesModal
            }
            className={activeAnimalType ? "active" : ""}
          >
            {activeAnimalType === "FEATHERED"
              ? t("main.animal-type-select.feathered")
              : activeAnimalType === "UNGULATE"
              ? t("main.animal-type-select.ungulate")
              : t("main.animal-type-select.title")}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default FiltersModal
