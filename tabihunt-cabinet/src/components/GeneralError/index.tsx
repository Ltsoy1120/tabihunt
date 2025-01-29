import { useAppDispatch, useAppSelector } from "../../store"
import { setErrorMessage } from "../../store/slices/generalErrorSlice"
import Modal from "../UI/Modal"

const GeneralError = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.generalError)
  const closeHandler = () => {
    dispatch(
      setErrorMessage({
        status: null,
        message: ""
      })
    )
  }

  const modalError = (
    <div>
      <h3>{error.status}</h3>
      <p>{error.message}</p>
    </div>
  )

  return (
    <>{error.message && <Modal close={closeHandler}>{modalError}</Modal>}</>
  )
}

export default GeneralError
