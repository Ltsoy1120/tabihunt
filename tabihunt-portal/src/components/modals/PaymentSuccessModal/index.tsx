import Button from "@/components/UI/buttons/Button";
import Modal from "@/components/UI/Modal";
import { VoucherIssuedDto } from "@/models/vouchers";
import { API_URL } from "@/services/http.service";
import { useAppSelector } from "@/store";
import { useTranslation } from "react-i18next";
import "./style.scss";

interface PaymentSuccessModalProps {
  close: () => void;
  purchasedVoucher?: VoucherIssuedDto;
}

const PaymentSuccessModal = ({
  close,
  purchasedVoucher,
}: PaymentSuccessModalProps) => {
  const { t } = useTranslation();
  const { me } = useAppSelector((state) => state.hunters);
  return (
    <Modal size={"570px"} close={close}>
      <div className="report-success-modal">
        <h3 className="report-success-modal__title">
          {t("form.payment.payment-success-modal.title")}
        </h3>
        <p className="report-success-modal__text">
          {t("form.payment.payment-success-modal.text")}{" "}
          {purchasedVoucher && <span>{me?.user.email}</span>}
        </p>
        {purchasedVoucher && (
          <a
            href={`${API_URL}files/${purchasedVoucher?.purchasedVoucher.id}`}
            download
          >
            {t("form.payment.payment-success-modal.download")}
          </a>
        )}
        <Button onClick={close}>
          {t("form.payment.payment-success-modal.redirect")}
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentSuccessModal;
