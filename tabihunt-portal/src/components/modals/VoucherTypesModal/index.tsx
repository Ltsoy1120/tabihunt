import Button from "@/components/UI/buttons/Button"
import { VoucherType } from "@/models/vouchers"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface VoucherTypesModalProps {
  activeVoucherType: VoucherType
  selectVoucherType: (voucherType: VoucherType) => void
  close: () => void
  onSubmit: () => void
}

const VoucherTypesModal = ({
  activeVoucherType,
  selectVoucherType,
  close,
  onSubmit
}: VoucherTypesModalProps) => {
  const { t } = useTranslation()
  const voucherTypes: VoucherType[] = ["SEASONAL", "ONE_TIME"]

  return (
    <Modal size={"360px"} close={close}>
      <div className="voucherTypes-modal">
        <h2 className="voucherTypes-modal__title">
          {t("main.voucher-type-select.title")}
        </h2>
        <div className="voucherTypes-modal__list">
          <Radio
            label={t("main.voucher-type-select.modal.all")}
            checked={!activeVoucherType}
            onChangeHandler={() => selectVoucherType(null)}
          />
          {voucherTypes.map(voucherType => (
            <Radio
              key={voucherType}
              label={
                voucherType === "SEASONAL"
                  ? t("main.voucher-type-select.seasonal")
                  : t("main.voucher-type-select.one-time")
              }
              checked={voucherType === activeVoucherType}
              onChangeHandler={() => selectVoucherType(voucherType)}
            />
          ))}
        </div>
        <Button onClick={onSubmit}>
          {t("main.voucher-type-select.modal.button")}
        </Button>
      </div>
    </Modal>
  )
}

export default VoucherTypesModal
