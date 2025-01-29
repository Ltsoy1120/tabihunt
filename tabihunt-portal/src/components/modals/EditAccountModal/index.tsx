import Icon from "@/components/UI/Icon"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import "./style.scss"

interface EditAccountModalProps {
  close: () => void
}

const EditAccountModal = ({ close }: EditAccountModalProps) => {
  const { t } = useTranslation()
  const params = useParams()
  return (
    <Modal size={"330px"} close={close}>
      <div className="edit-account-modal">
        <h2 className="edit-account-modal__title">
          {t("edit-account-modal.title")}
        </h2>
        <div className="edit-account-modal__list">
          <Link href={`/${params.locale}/edit-account/personal-data`}>
            <div className="edit-account-modal__list-item">
              <Icon className="edit-icon" name="personal-info" size={20} />
              <div>
                <p>{t("edit-account-modal.personal-info.title")}</p>
                <span>{t("edit-account-modal.personal-info.text")}</span>
              </div>
              <Icon className="arrow" name="arrow-right" size={16} />
            </div>
          </Link>

          <Link href={`/${params.locale}/edit-account/hunting-license`}>
            <div className="edit-account-modal__list-item">
              <Icon className="edit-icon" name="hunting-license" size={20} />
              <div>
                <p>{t("edit-account-modal.hunting-license.title")}</p>
                <span>{t("edit-account-modal.hunting-license.text")}</span>
              </div>
              <Icon className="arrow" name="arrow-right" size={16} />
            </div>
          </Link>

          <Link href={`/${params.locale}/edit-account/identification`}>
            <div className="edit-account-modal__list-item">
              <Icon className="edit-icon" name="identity-card" size={20} />
              <div>
                <p>{t("edit-account-modal.identity-card.title")}</p>
                <span>{t("edit-account-modal.identity-card.text")}</span>
              </div>
              <Icon className="arrow" name="arrow-right" size={16} />
            </div>
          </Link>
        </div>
      </div>
    </Modal>
  )
}

export default EditAccountModal
