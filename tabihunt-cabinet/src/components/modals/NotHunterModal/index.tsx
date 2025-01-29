import Modal from "../../UI/Modal"
import "./style.scss"

interface PlotsModalProps {
  close: () => void
  isIin?: boolean
  isPhone?: boolean
}

const NotHunterModal = ({ close, isIin, isPhone }: PlotsModalProps) => {
  return (
    <Modal size={"360px"} close={close}>
      <div className="not-hunter-modal">
        <h2 className="not-hunter-modal__title">Охотник не найден</h2>
        <p className="not-hunter-modal__text">
          Не найдено совпадений по введеному {isIin && "ИИН"}
          {isPhone && "номеру телефона"}. Попробуйте ввести заново.
        </p>
      </div>
    </Modal>
  )
}

export default NotHunterModal
