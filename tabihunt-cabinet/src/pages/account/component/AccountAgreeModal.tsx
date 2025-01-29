import { useTranslation } from "react-i18next"
import Modal from "../../../components/UI/Modal"
import Button from "../../../components/UI/buttons/Button"
import '../AccountPage/style.scss'



type Props = {
    show: boolean
    onClose: Function
    title: string
    onClickYes: Function
    onClickNo: Function
}
const AccountAgreeModal = (props: Props) => {
    const { t } = useTranslation()

    return (
        <>
            {!props.show
                ? <></>
                : <Modal close={() => props.onClose()}>
                    <p className="account__settings-modal-title">
                        {props.title}
                    </p>
                    <div className="account__settings-modal account__settings-modal--margin">
                        <div className="account__info-btns">
                            <Button
                                onClick={() => props.onClickNo()}
                                className="account__info-btns-btn account__info-btns-btn--brown"
                            >
                                {t("accountPage.no")}
                            </Button>
                            <Button
                                className="account__info-btns-btn account__info-btns-btn--dark"
                                onClick={() => props.onClickYes()}
                            >
                                {t("accountPage.yes")}
                            </Button>

                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}
export default AccountAgreeModal