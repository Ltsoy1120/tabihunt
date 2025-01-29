import Button from "@/components/UI/buttons/Button"
import Modal from "@/components/UI/Modal"
import "./style.scss"

interface ReportSuccessModalProps {
  close: () => void
}

const ReportSuccessModal = ({ close }: ReportSuccessModalProps) => {
  return (
    <Modal size={"430px"} close={close}>
      <div className="report-success-modal">
        <h3 className="report-success-modal__title">
          Отчет успешно отправлен!
        </h3>
        <Button onClick={close}>Перейти к отчетам</Button>
      </div>
    </Modal>
  )
}

export default ReportSuccessModal
