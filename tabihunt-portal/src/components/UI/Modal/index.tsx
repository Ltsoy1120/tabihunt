import Icon from "../Icon";
import "./style.scss";

interface ModalProps {
  children: React.ReactNode;
  size?: string;
  hasScroll?: boolean;
  close: () => void;
}

const Modal = ({ children, size, close, hasScroll }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={close}></div>
      <div className="modal__paper" style={{ width: size }}>
        <div
          className="modal__container"
          style={{ marginRight: hasScroll ? "10px" : "20px" }}
        >
          {children}
        </div>
        <Icon name="close" className="modal__close" size={20} onClick={close} />
      </div>
    </div>
  );
};

export default Modal;
