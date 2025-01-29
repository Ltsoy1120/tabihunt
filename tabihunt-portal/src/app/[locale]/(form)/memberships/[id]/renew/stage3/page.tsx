"use client"
import Button from "@/components/UI/buttons/Button"
import useIsMobile from "@/hooks/useIsMobile"
import { useAppSelector } from "@/store"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"

const MembershipRenewStage3 = () => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const params = useParams()
  const { me } = useAppSelector(state => state.hunters)
  const { membershipRenewData, membershipRenewCost } = useAppSelector(
    state => state.memberships
  )
  const membership = me?.memberships?.find(
    membership => membership.id === params.id
  )

  return (
    <div className="membershipRenew-stage3">
      <div className="membershipRenew">
        <h2>{t("form.stage3.title")}</h2>
        <div className="membershipRenew__card">
          <h3>{membership?.huntingSociety?.name}</h3>
          <div className="membershipRenew__card__row">
            <div className="membershipRenew__card__row-item">
              <span>{t("form.stage3.operation")}</span>
              <p>{t("form.stage3.membership-renew")}</p>
            </div>
            <div className="membershipRenew__card__row-item">
              <span>{t("form.stage3.period")}</span>
              <p>
                {membershipRenewData?.years}{" "}
                {membershipRenewData &&
                  `${
                    membershipRenewData?.years === 1
                      ? t("form.stage3.year")
                      : t("form.stage3.years")
                  }`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="membershipRenew__cost">
        <p>{t("form.stage3.payment-amount")}</p>
        <p className="cost">
          {membershipRenewCost.toLocaleString("ru-RU").replace(/,/g, " ")} ₸
        </p>
      </div>
      {isMobile && (
        <Link href={`/${params.locale}/memberships/${params.id}/renew/payment`}>
          <Button>{t("form.stage3.btn")}</Button>
        </Link>
      )}
    </div>
  )
}

export default MembershipRenewStage3
