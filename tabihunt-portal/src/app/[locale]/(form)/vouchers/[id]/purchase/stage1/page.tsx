"use client";
import Input from "@/components/UI/Input";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import { kk } from "date-fns/locale";
import { setVoucherData } from "@/store/slices/vouchersSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { getFormattedDate } from "@/helpers/common";
import { useParams, useRouter } from "next/navigation";
import {
  getAvailableDatesVoucherById,
  getMePurchasedVouchers,
  getVoucherById,
} from "@/store/actions/vouchersActions";
import WarningModal from "@/components/modals/WarningModal";
import { useTranslation } from "react-i18next";
import "./style.scss";
import Button from "@/components/UI/buttons/Button";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";

const PurchaseVoucherStage1 = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const { me, newHunterData } = useAppSelector((state) => state.hunters);
  const { purchaseVoucherData, voucher, meVouchers } = useAppSelector(
    (state) => state.vouchers
  );
  const [startDate, setStartDate] = useState<Date | null>(
    purchaseVoucherData?.startDate
      ? new Date(purchaseVoucherData?.startDate)
      : null
  );
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [isVoucherDateError, setVoucherDateError] = useState<boolean>(false);
  const voucherId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!me && !newHunterData && !purchaseVoucherData) {
      router.push(`/${params.locale}/vouchers/${params.id}`);
    }
  }, [me, newHunterData, purchaseVoucherData, router, params]);

  useEffect(() => {
    if (!voucher && voucherId) {
      dispatch(getVoucherById(voucherId));
    }
  }, [dispatch, voucher, voucherId]);

  useEffect(() => {
    dispatch(getMePurchasedVouchers());
  }, [dispatch]);

  useEffect(() => {
    if (voucherId) {
      const today = new Date();
      const oneMonthLater = new Date(today);
      oneMonthLater.setMonth(today.getMonth() + 1);

      const fetchAvailableDates = async () => {
        const availableDates = await dispatch(
          getAvailableDatesVoucherById(
            voucherId,
            getFormattedDate(today),
            getFormattedDate(oneMonthLater)
          )
        );

        const availableDateObjects = availableDates?.dates?.map(
          (date) => new Date(date)
        );

        const allDatesInRange = [];
        let currentDate = new Date(today);

        while (currentDate <= oneMonthLater) {
          allDatesInRange.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        const unavailableDates = allDatesInRange.filter(
          (date) =>
            !availableDateObjects?.some(
              (availableDate) =>
                date.toDateString() === availableDate.toDateString()
            )
        );

        setUnavailableDates(unavailableDates);
      };

      fetchAvailableDates();
    }
  }, [dispatch, voucherId]);

  useEffect(() => {
    if (voucher && startDate) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + voucher.duration);
      dispatch(
        setVoucherData({
          animals: [],
          startDate: getFormattedDate(startDate),
          endDate: getFormattedDate(endDate),
          paymentMethod: null,
        })
      );
    }
  }, [dispatch, startDate, voucher]);

  useEffect(() => {
    if (
      startDate &&
      meVouchers.find(
        (voucher) => voucher.startDate === getFormattedDate(startDate)
      )
    ) {
      setVoucherDateError(true);
    } else {
      setVoucherDateError(false);
    }
  }, [startDate, meVouchers]);

  const formatDate = () => {
    return startDate ? startDate.toLocaleDateString() : "Выберите дату";
  };

  const closeWarningModalHandler = () => {
    setStartDate(null);
    setVoucherDateError(false);
  };

  return (
    <>
      <div className="purchase-voucher-stage1">
        <h2>{t("form.stage1.title")}</h2>
        <div className="date-input">
          <Input
            placeholder={t("form.stage1.placeholder")}
            value={formatDate()}
            readOnly
            endIcon="calendar"
          />
          <div className="date-picker-dropdown">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              locale={params.locale === "ru" ? ru : kk}
              dateFormat="dd/MM/yyyy"
              placeholderText={t("form.stage1.placeholder")}
              minDate={new Date()}
              excludeDates={unavailableDates}
              inline
            />
          </div>
          {unavailableDates.length > 0 && (
            <div className="disabledDate">
              <span className="disabledDate__bg"></span>
              <p>— {t("form.stage1.limit-info")}</p>
            </div>
          )}
          {isMobile && (
            <Link
              href={`/${params.locale}/vouchers/${params.id}/purchase/stage2`}
            >
              <Button
                disabled={
                  !purchaseVoucherData?.startDate &&
                  !purchaseVoucherData?.endDate
                }
              >
                {t("form.stage1.mobile-btn")}
              </Button>
            </Link>
          )}
        </div>
      </div>
      {isVoucherDateError && (
        <WarningModal
          title={t("form.stage1.date-warning.title")}
          text={t("form.stage1.date-warning.text")}
          button={t("form.stage1.date-warning.button")}
          close={closeWarningModalHandler}
        />
      )}
    </>
  );
};

export default PurchaseVoucherStage1;
