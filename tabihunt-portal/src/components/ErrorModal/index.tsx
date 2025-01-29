import Modal from "../UI/Modal"

interface ErrorModalProps {
  error: any
  closeHandler: () => void
}
const ErrorModal = ({ error, closeHandler }: ErrorModalProps) => {
  const modalError = (
    <div>
      <h3>Ошибка</h3>
      <p>{error?.response?.data.message ?? error.message}</p>
    </div>
  )

  return <>{error && <Modal close={closeHandler}>{modalError}</Modal>}</>
}

export default ErrorModal
