import Icon from "../Icon"
import "./style.scss"

interface ModalProps {
  children: React.ReactNode
  size?: string
  close: () => void
  className?:string
}

const Modal = ({ children, size, close, className}: ModalProps) => {
  return (
    <div className={"modal"}>
      <div className="modal__backdrop" onClick={close}></div>
      <div className="modal__paper" style={{ width: size }}>
        <div className={className?`modal__container ${className}`:"modal__container"}>{children}</div>
        <Icon name="close" className="modal__close" size={20} onClick={close} />
      </div>
    </div>
  )
}

export default Modal
