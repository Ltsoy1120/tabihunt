import Button from "@/components/UI/buttons/Button"
import TextButton from "@/components/UI/buttons/TextButton"
import Modal from "@/components/UI/Modal"
import useIsMobile from "@/hooks/useIsMobile"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface VoucherPurchaseWarningProps {
  close: () => void
  loginClickHandler: () => void
}
const VoucherPurchaseWarning = ({
  close,
  loginClickHandler
}: VoucherPurchaseWarningProps) => {
  const { t } = useTranslation()
  const params = useParams()
  const isMobile = useIsMobile()

  return (
    <Modal size={isMobile ? "100%" : "530px"} close={close}>
      <div className="warning-modal">
        <h3 className="warning-modal__title">{t("page.warning.title")}</h3>
        <div className="warning-modal__text">{t("page.warning.text")}</div>
        <div className="warning-modal__actions">
          <Link href={`/${params.locale}/register`}>
            <Button>{t("page.warning.register-button")}</Button>
          </Link>
          <span>
            {t("page.warning.has-account")}{" "}
            {/* <Link href={`/${params.locale}/login`}> */}
            <TextButton onClick={loginClickHandler}>
              {t("page.warning.login-button")}
            </TextButton>
            {/* </Link> */}
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default VoucherPurchaseWarning
