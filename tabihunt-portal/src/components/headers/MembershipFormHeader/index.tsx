import Button from "@/components/UI/buttons/Button"
import { useAppSelector } from "@/store"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React from "react"
import { useTranslation } from "react-i18next"
import FormHeader from "../FormHeader"

const MembershipFormHeader = () => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const params = useParams()
  const { membershipRenewData } = useAppSelector(state => state.memberships)

  const stages = [
    { path: `/renew/stage1`, title: t("form-header.membership-renew.stage1") },
    { path: `/renew/stage2`, title: t("form-header.membership-renew.stage2") },
    { path: `/renew/stage3`, title: t("form-header.membership-renew.stage3") }
  ]

  const getFormButton = () => {
    switch (true) {
      case pathname.includes("/renew/stage1"):
        return (
          <Link
            href={`/${params.locale}/memberships/${params.id}/renew/stage2`}
          >
            <Button>{t("form-header.membership-renew.continue-btn")}</Button>
          </Link>
        )
      case pathname.includes("/renew/stage2"):
        return (
          <Link
            href={`/${params.locale}/memberships/${params.id}/renew/stage3`}
          >
            <Button disabled={!membershipRenewData?.years}>
              {t("form-header.membership-renew.continue-btn")}
            </Button>
          </Link>
        )
      case pathname.includes("/renew/stage3"):
        return (
          <Link
            href={`/${params.locale}/memberships/${params.id}/renew/payment`}
          >
            <Button>{t("form-header.membership-renew.renew-btn")}</Button>
          </Link>
        )

      default:
        break
    }
  }

  return (
    <>
      {pathname.includes("/renew/stage") && (
        <FormHeader stages={stages} getFormButton={getFormButton} />
      )}
      {pathname.includes("/renew/payment") && (
        <FormHeader
          titlePage={t("form-header.membership-renew.payment")}
          titlePageMobile={t("form-header.membership-renew.payment")}
        />
      )}
    </>
  )
}

export default MembershipFormHeader
