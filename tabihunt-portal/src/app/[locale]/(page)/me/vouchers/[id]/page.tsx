"use client";
import Loader from "@/components/loaders/Loader";
import Button from "@/components/UI/buttons/Button";
import MeVoucherAnimalCard from "@/components/vouchers/MeVoucherAnimalCard";
import { PurchasedVoucherDto, VoucherPriceType } from "@/models/vouchers";
import { API_URL } from "@/services/http.service";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getMePurchasedVoucherById,
  getPriceTypeVoucherById,
} from "@/store/actions/vouchersActions";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

const MeVoucherPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { meVoucherById, priceType } = useAppSelector(
    (state) => state.vouchers
  );
  const voucherId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!meVoucherById) {
      dispatch(getMePurchasedVoucherById(voucherId));
    }
    if (!priceType && meVoucherById) {
      dispatch(getPriceTypeVoucherById(meVoucherById?.voucher.id));
    }
  }, [dispatch, meVoucherById, priceType, voucherId]);

  const voucherCharacteristicState = [
    {
      title: t("page.voucher-info.voucherType.title"),
      value:
        meVoucherById?.voucher?.type === "SEASONAL"
          ? t("page.voucher-info.voucherType.seasonal")
          : t("page.voucher-info.voucherType.one-time"),
    },
    {
      title: t("page.voucher-info.animalTypes.title"),
      value:
        meVoucherById?.voucher.animalTypes.includes("FEATHERED") &&
        meVoucherById?.voucher.animalTypes.includes("UNGULATE")
          ? t("page.voucher-info.animalTypes.all")
          : meVoucherById?.voucher.animalTypes.includes("FEATHERED")
          ? t("page.voucher-info.animalTypes.feathered")
          : meVoucherById?.voucher.animalTypes.includes("UNGULATE")
          ? t("page.voucher-info.animalTypes.ungulate")
          : t("page.voucher-info.animalTypes.empty"),
    },
    {
      title: t("page.voucher-info.plot"),
      value: meVoucherById?.voucher?.plot.name,
    },
    {
      title: t("page.voucher-info.startDate"),
      value: meVoucherById?.startDate,
    },
    {
      title: t("page.voucher-info.endDate"),
      value: meVoucherById?.endDate,
    },
  ];

  const getPurchasedVoucherPrice = (
    priceType: VoucherPriceType,
    meVoucherById: PurchasedVoucherDto
  ) => {
    switch (priceType) {
      case VoucherPriceType.STANDARD:
        return meVoucherById.voucher.standardPrice
          .toLocaleString("ru-RU")
          .replace(/,/g, " ");
      case VoucherPriceType.MEMBERSHIP:
        return meVoucherById.voucher.membershipPrice
          .toLocaleString("ru-RU")
          .replace(/,/g, " ");
      case VoucherPriceType.PREFERENTIAL:
        return meVoucherById.voucher.preferentialPrice
          .toLocaleString("ru-RU")
          .replace(/,/g, " ");
      case VoucherPriceType.SPECIAL:
        return meVoucherById.voucher.specialPrice
          .toLocaleString("ru-RU")
          .replace(/,/g, " ");
      default:
        break;
    }
  };

  return (
    <>
      {meVoucherById ? (
        <div className="me-voucher-page">
          <div className="me-voucher__info">
            <div className="me-voucher__info-img">
              <Image
                src={`${API_URL}files/${meVoucherById?.voucher?.imageUrl}`}
                alt="voucher-img"
                priority
                width={410}
                height={410}
              />
            </div>
            <div className="me-voucher__info-description">
              <h2>{t("page.voucher-info.title")}</h2>
              <div className="description-block">
                {voucherCharacteristicState.map((item) => (
                  <div key={item.title} className="description-block__item">
                    <span>{item.title}</span>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="me-voucher__animals">
            <h2>{t("page.me-voucher-animals.title")}</h2>
            <div className="voucher__animals-list">
              {meVoucherById.limits.length ? (
                meVoucherById.limits.map((limit) => (
                  <MeVoucherAnimalCard
                    key={limit.id}
                    limit={limit}
                    priceType={priceType}
                  />
                ))
              ) : (
                <div className="no-results">
                  {t("page.me-voucher-animals.empty")}
                </div>
              )}
            </div>
          </div>
          <div className="me-voucher__prices">
            <h2>{t("page.me-voucher-prices.title")}</h2>
            <div className="me-voucher__prices-list">
              <div className="me-voucher__prices-item">
                <p>{t("page.me-voucher-prices.voucher-price")}</p>
                <p>
                  {priceType &&
                    getPurchasedVoucherPrice(priceType, meVoucherById)}{" "}
                  ₸
                </p>
              </div>
              <div className="me-voucher__prices-item">
                <p>{t("page.me-voucher-prices.total-amount")}</p>
                <h3>
                  {meVoucherById.totalAmount
                    .toLocaleString("ru-RU")
                    .replace(/,/g, " ")}{" "}
                  ₸
                </h3>
              </div>
            </div>
          </div>
          <a href={`${API_URL}files/${meVoucherById?.id}`} download>
            <Button>{t("form.payment.payment-success-modal.download")}</Button>
          </a>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MeVoucherPage;
