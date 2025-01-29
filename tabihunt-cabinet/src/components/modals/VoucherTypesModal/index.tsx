import { Dispatch, SetStateAction } from "react"
import { TypeOptions } from "../../../pages/vouchers/Vouchers"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface VoucherTypesModalProps {
  activeVoucherType: TypeOptions
  setActiveVoucherType: Dispatch<SetStateAction<TypeOptions>>
  close: () => void
}

const VoucherTypesModal = ({
  activeVoucherType,
  setActiveVoucherType,
  close
}: VoucherTypesModalProps) => {
  const voucherTypes = [
    { label: "Все", value: null },
    { label: "Разовая", value: "ONE_TIME" },
    { label: "Сезонная", value: "SEASONAL" }
  ]

  return (
    <Modal size={"360px"} close={close}>
      <div className="voucher-type-modal">
        <h2 className="voucher-type-modal__title">Тип путевки</h2>
        <div className="voucher-type-modal__list">
          {voucherTypes.map(type => (
            <Radio
              key={type.label}
              label={type.label}
              checked={type.value === activeVoucherType.value}
              onChangeHandler={() => setActiveVoucherType(type)}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default VoucherTypesModal
