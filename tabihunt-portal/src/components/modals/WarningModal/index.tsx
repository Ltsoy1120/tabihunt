import Button from "@/components/UI/buttons/Button";
import Modal from "@/components/UI/Modal";
import "./style.scss";

interface WarningModalProps {
  title: string;
  text: string;
  button: string;
  close: () => void;
}

const WarningModal = ({ title, text, button, close }: WarningModalProps) => {
  return (
    <Modal size={"530px"} close={close}>
      <div className="warning-modal">
        <h3 className="warning-modal__title">{title}</h3>
        <div className="warning-modal__text">{text}</div>
        <Button onClick={close}>{button}</Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
