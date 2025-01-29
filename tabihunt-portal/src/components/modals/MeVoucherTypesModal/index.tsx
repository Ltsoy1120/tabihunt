import Button from "@/components/UI/buttons/Button"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface MeVoucherTypesModalProps {
  activeVoucherType: string | null
  close: () => void
  onSubmit: (selectedVoucherType: string | null) => void
}

const MeVoucherTypesModal = ({
  activeVoucherType,
  close,
  onSubmit
}: MeVoucherTypesModalProps) => {
  const { t } = useTranslation()
  const voucherTypes = ["ACTUAL", "ARCHIVE"]
  const [selectedVoucherType, setSelectedVoucherType] = useState<string | null>(
    activeVoucherType
  )

  return (
    <Modal size={"360px"} close={close}>
      <div className="voucherTypes-modal">
        <h2 className="voucherTypes-modal__title">
          {t("me-vouchers.modal.title")}
        </h2>
        <div className="voucherTypes-modal__list">
          <Radio
            label={t("me-vouchers.modal.all")}
            checked={!selectedVoucherType}
            onChangeHandler={() => setSelectedVoucherType(null)}
          />
          {voucherTypes.map(voucherType => (
            <Radio
              key={voucherType}
              label={
                voucherType === "ACTUAL"
                  ? t("me-vouchers.modal.actual")
                  : t("me-vouchers.modal.archive")
              }
              checked={voucherType === selectedVoucherType}
              onChangeHandler={() => setSelectedVoucherType(voucherType)}
            />
          ))}
        </div>
        <Button onClick={() => onSubmit(selectedVoucherType ?? null)}>
          {t("me-vouchers.modal.button")}
        </Button>
      </div>
    </Modal>
  )
}

export default MeVoucherTypesModal
