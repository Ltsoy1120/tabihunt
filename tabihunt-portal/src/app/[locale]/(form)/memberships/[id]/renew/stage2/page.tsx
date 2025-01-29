"use client";
import Button from "@/components/UI/buttons/Button";
import Radio from "@/components/UI/Radio";
import useIsMobile from "@/hooks/useIsMobile";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setMembershipRenewCost,
  setMembershipRenewData,
} from "@/store/slices/membershipsSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { getMeHuntingSocietyPricingType } from "@/store/actions/huntingSocietiesActions";
import { MembershipPriceType } from "@/models/membership";

const MembershipRenewStage2 = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.hunters);
  const { meHuntingSocietyPricingType } = useAppSelector(
    (state) => state.huntingSocieties
  );
  const { membershipRenewData } = useAppSelector((state) => state.memberships);
  const [activeYear, setActiveYear] = useState<{
    value: number;
    title: string;
  } | null>(
    membershipRenewData
      ? {
          value: membershipRenewData.years,
          title:
            membershipRenewData?.years === 1
              ? t("form.stage2.year")
              : t("form.stage2.years"),
        }
      : null
  );

  const membership = me?.memberships?.find(
    (membership) => membership.id === params.id
  );

  const years = [
    { value: 1, title: t("form.stage2.1year") },
    { value: 2, title: t("form.stage2.2year") },
    { value: 3, title: t("form.stage2.3year") },
  ];

  useEffect(() => {
    if (membership?.huntingSociety.id) {
      dispatch(getMeHuntingSocietyPricingType(membership?.huntingSociety.id));
    }
  }, [dispatch, membership?.huntingSociety.id]);

  const getMembershipRenewPrice = (
    meHuntingSocietyPricingType: MembershipPriceType
  ): number => {
    switch (meHuntingSocietyPricingType) {
      case MembershipPriceType.MEMBERSHIP:
        return membership?.huntingSociety.membershipMembershipPrice ?? 0;
      case MembershipPriceType.PREFERENTIAL:
        return membership?.huntingSociety.membershipPreferentialPrice ?? 0;
      case MembershipPriceType.SPECIAL:
        return membership?.huntingSociety.membershipSpecialPrice ?? 0;
      case MembershipPriceType.STANDARD:
        return membership?.huntingSociety.membershipStandardPrice ?? 0;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (activeYear) {
      console.log("activeYear", activeYear);
      const price = getMembershipRenewPrice(meHuntingSocietyPricingType);
      if (price > 0) {
        dispatch(
          setMembershipRenewData({
            years: activeYear.value,
            paymentMethod: null,
          })
        );
        const membershipRenewCost = price * activeYear.value;
        dispatch(setMembershipRenewCost(membershipRenewCost));
      }
    }
  }, [dispatch, activeYear, membership]);

  const getMembershipPriceWithYear = (year: number) => {
    const price = getMembershipRenewPrice(meHuntingSocietyPricingType);
    return (price * year).toLocaleString("ru-RU").replace(/,/g, " ");
  };

  return (
    <div className="membershipsRenew-stage2">
      <h2>{t("form.stage2.title")}</h2>
      <div className="years-select">
        <h3 className="years-select__title">
          {activeYear?.title ?? t("form.stage2.select-title")}
        </h3>
        {membership && (
          <div className="years-select__list">
            {years.map((year) => (
              <Radio
                key={year.value}
                label={
                  <div>
                    <p>{year.title}</p>
                    <span>{getMembershipPriceWithYear(year.value)}₸</span>
                  </div>
                }
                value={year.title}
                checked={year.value === activeYear?.value}
                onChangeHandler={() => setActiveYear(year)}
              />
            ))}
          </div>
        )}
      </div>
      {isMobile && (
        <Link href={`/${params.locale}/memberships/${params.id}/renew/stage3`}>
          <Button disabled={!membershipRenewData?.years}>
            {t("form.stage2.btn")}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default MembershipRenewStage2;
