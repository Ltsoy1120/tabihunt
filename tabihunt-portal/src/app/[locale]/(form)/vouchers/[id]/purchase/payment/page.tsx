"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import { useParams } from "next/navigation";
import Button from "@/components/UI/buttons/Button";
import { purchaseVoucherById } from "@/store/actions/vouchersActions";
import PaymentSuccessModal from "@/components/modals/PaymentSuccessModal";
import { classMerge } from "@/helpers/common";
import Image from "next/image";
import "./style.scss";

const Payment = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { voucher, purchaseVoucherData, purchasedVoucher } = useAppSelector(
    (state) => state.vouchers
  );
  const { me } = useAppSelector((state) => state.hunters);
  const [paymentMethod, setPaymentMethod] = useState<
    "CARD" | "CASH" | "KASPI" | null
  >(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (paymentMethod && purchaseVoucherData && voucher) {
      dispatch(
        purchaseVoucherById(
          {
            ...purchaseVoucherData,
            paymentMethod,
            withQrCode: paymentMethod === "KASPI",
          },
          voucher?.id
        )
      );
    }
  }, [dispatch, paymentMethod, purchaseVoucherData, voucher]);

  useEffect(() => {
    if (purchasedVoucher && paymentMethod === "CARD" && me) {
      let language = "ru-RU";
      const tiptop = window.tiptop;

      var widget = new tiptop.Widget({
        language: language,
      });
      widget.pay(
        "auth", // или "charge"
        {
          //options
          publicId: "pk_c8b2e98d62ba4d7a56db6116ca20e", // id из личного кабинета
          description: "Покупка путевки", // назначение
          amount: purchasedVoucher.purchasedVoucher.totalAmount, // сумма
          currency: "KZT", // валюта
          accountId: me?.id, // идентификатор плательщика (необязательно)
          invoiceId: `voucher:${purchasedVoucher.purchasedVoucher.slug}`, // айдишник purchased voucher  (необязательно)
          email: me.user.email, //email плательщика (необязательно),
          skin: "mini", // дизайн виджета (необязательно)
          autoClose: 3,
        },
        {
          onSuccess: async function (options: any) {
            // success
            console.log("options", options);
            setIsPaymentSuccess(true);
          },
          onFail: function (reason: any, options: any) {
            // fail
            console.log("reason", reason);
            console.log("options", options);

            //действие при неуспешной оплате
          },
          onComplete: function (paymentResult: any, options: any) {
            //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
            //например вызов вашей аналитики Facebook Pixel
            console.log("paymentResult", paymentResult);
            console.log("options", options);
          },
        }
      );
    }
    if (purchasedVoucher?.kaspiPaymentUrl && paymentMethod === "KASPI" && me) {
      window.location.href = purchasedVoucher.kaspiPaymentUrl;
    }
  }, [dispatch, purchasedVoucher, paymentMethod, me]);

  const handleKaspiQRClick = async () => {
    setPaymentMethod("KASPI");
  };

  const cardPay = () => {
    setPaymentMethod("CARD");
  };

  const closeModalHandler = () => {
    setIsPaymentSuccess(false);
    localStorage.setItem("fromPayment", "true"); // Устанавливаем флаг для блокировки "Назад"
    window.location.replace(
      `/${params.locale}/me/vouchers/${purchasedVoucher?.purchasedVoucher.id}`
    );
  };

  return (
    <>
      <div className="payment-page">
        <h2>{t("form.payment.title")}</h2>
        <div className="payment-page__btns">
          <Button
            onClick={cardPay}
            className={paymentMethod === "CARD" ? "active" : ""}
          >
            {t("form.payment.card")}
          </Button>
          <Button
            onClick={handleKaspiQRClick}
            className={classMerge(
              "kaspi-btn",
              paymentMethod === "KASPI" ? "active" : ""
            )}
          >
            <Image
              src="/static/images/kaspi-QR.png"
              alt="kaspi-QR"
              width={142}
              height={36}
            />
          </Button>
        </div>
      </div>
      {isPaymentSuccess && purchasedVoucher && (
        <PaymentSuccessModal
          close={closeModalHandler}
          purchasedVoucher={purchasedVoucher}
        />
      )}
    </>
  );
};

export default Payment;
