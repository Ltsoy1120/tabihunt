import Button from "@/components/UI/buttons/Button"
import Modal from "@/components/UI/Modal"
import "./style.scss"

interface SuccessModalProps {
  close: () => void
}

const SuccessModal = ({ close }: SuccessModalProps) => {
  return (
    <Modal size={"530px"} close={close}>
      <div className="warning-modal">
        <h3 className="warning-modal__title">Ваша заявка успешно отправлена</h3>
        {/* <div className="warning-modal__text">{text}</div> */}
        <Button onClick={close}>Понятно</Button>
      </div>
    </Modal>
  )
}

export default SuccessModal
