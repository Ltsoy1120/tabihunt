"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useParams } from "next/navigation";
import Button from "@/components/UI/buttons/Button";
import { renewHunterMembership } from "@/store/actions/membershipsActions";
import { useTranslation } from "react-i18next";
import PaymentSuccessModal from "@/components/modals/PaymentSuccessModal";
import { classMerge } from "@/helpers/common";
import Image from "next/image";
import "./style.scss";

const Payment = () => {
  const { t } = useTranslation("common");
  const params = useParams();
  const dispatch = useAppDispatch();
  const { membershipRenewData, membershipRenewCost, renewedMembership } =
    useAppSelector((state) => state.memberships);
  const { me } = useAppSelector((state) => state.hunters);
  const [paymentMethod, setPaymentMethod] = useState<
    "CARD" | "CASH" | "KASPI" | null
  >(null);
  const membershipId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (membershipRenewData && membershipId && paymentMethod) {
      dispatch(
        renewHunterMembership(
          { ...membershipRenewData, paymentMethod },
          membershipId
        )
      );
    }
  }, [dispatch, paymentMethod, membershipId, membershipRenewData]);

  useEffect(() => {
    if (membershipId && me && paymentMethod === "CARD" && membershipRenewCost) {
      let language = "ru-RU";
      const tiptop = window.tiptop;

      var widget = new tiptop.Widget({
        language: language,
      });
      if (renewedMembership?.membershipRenewal.id) {
        widget.pay(
          "auth", // или "charge"
          {
            //options
            publicId: "pk_c8b2e98d62ba4d7a56db6116ca20e", // id из личного кабинета
            description: "Продление членства", // назначение
            amount: membershipRenewCost, // сумма
            currency: "KZT", // валюта
            accountId: me?.id, // идентификатор плательщика (необязательно)
            invoiceId: `membership:${renewedMembership?.membershipRenewal.id}`, // айдишник членства для продления
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
    }

    if (renewedMembership?.kaspiPaymentUrl && paymentMethod === "KASPI" && me) {
      window.location.href = renewedMembership.kaspiPaymentUrl;
    }
  }, [
    dispatch,
    membershipId,
    paymentMethod,
    me,
    renewedMembership,
    membershipRenewCost,
  ]);

  const handleKaspiQRClick = async () => {
    setPaymentMethod("KASPI");
    // const result =
    //   voucher &&
    //   (await dispatch(
    //     createVouchersKaspiPay({ InvoiceId: voucher?.id, WithQR: true })
    //   ))
    // if (result) {
    //   window.location.href = result.redirectUrl
    // }
  };

  const cardPay = () => {
    setPaymentMethod("CARD");
  };

  const closeModalHandler = () => {
    setIsPaymentSuccess(false);
    localStorage.setItem("fromPayment", "true"); // Устанавливаем флаг для блокировки "Назад"
    window.location.replace(`/${params.locale}/account`);
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
      {isPaymentSuccess && <PaymentSuccessModal close={closeModalHandler} />}
    </>
  );
};

export default Payment;
