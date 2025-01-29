import Button from "@/components/UI/buttons/Button"
import Icon from "@/components/UI/Icon"
import { useAppDispatch, useAppSelector } from "@/store"
import { editMeHunter } from "@/store/actions/hunterActions"
import { setShowBasket } from "@/store/slices/vouchersSlice"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import React from "react"
import { useTranslation } from "react-i18next"
import FormHeader from "../FormHeader"

interface VoucherFormHeaderProps {
  isMobile: boolean
}
const VoucherFormHeader = ({ isMobile }: VoucherFormHeaderProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const { purchaseVoucherData, isAgreeWithHuntingRules } = useAppSelector(
    state => state.vouchers
  )
  const { newHunterData } = useAppSelector(state => state.hunters)

  const stages = [
    { path: `/purchase/stage1`, title: t("form-header.voucher.stage1") },
    { path: `/purchase/stage2`, title: t("form-header.voucher.stage2") },
    { path: `/purchase/stage3`, title: t("form-header.voucher.stage3") },
    { path: `/purchase/stage4`, title: t("form-header.voucher.stage4") },
    { path: `/purchase/stage5`, title: t("form-header.voucher.stage5") }
  ]

  const onHunterSubmit = async () => {
    if (newHunterData) {
      const result = await dispatch(editMeHunter(newHunterData))
      if (result) {
        router.push(`/${params.locale}/vouchers/${params.id}/purchase/stage4`)
      }
    }
  }

  const onHunterLicenseSubmit = async () => {
    if (newHunterData) {
      const result = await dispatch(editMeHunter(newHunterData))
      if (result) {
        router.push(`/${params.locale}/vouchers/${params.id}/purchase/stage5`)
      }
    }
  }

  const showBasket = () => {
    dispatch(setShowBasket(true))
  }

  const getFormButton = () => {
    switch (true) {
      case pathname.includes("/purchase/stage1"):
        return (
          <Link
            href={`/${params.locale}/vouchers/${params.id}/purchase/stage2`}
          >
            <Button
              disabled={
                !purchaseVoucherData?.startDate && !purchaseVoucherData?.endDate
              }
            >
              {t("form-header.voucher.continue-btn")}
            </Button>
          </Link>
        )
      case pathname.includes("/purchase/stage2"):
        return isMobile ? (
          <div className="basket-icon">
            <Icon name="busket-mobile" size={48} onClick={showBasket} />
            {purchaseVoucherData?.animals.length ? (
              <span>
                {purchaseVoucherData.animals.reduce(
                  (sum, animal) => sum + animal.heads,
                  0
                )}
              </span>
            ) : null}
          </div>
        ) : (
          <Link
            href={`/${params.locale}/vouchers/${params.id}/purchase/stage3`}
          >
            <Button disabled={!purchaseVoucherData?.animals.length}>
              {t("form-header.voucher.continue-btn")}
            </Button>
          </Link>
        )
      case pathname.includes("/purchase/stage3"):
        return (
          <Button disabled={!newHunterData} onClick={onHunterSubmit}>
            {t("form-header.voucher.continue-btn")}
          </Button>
        )
      case pathname.includes("/purchase/stage4"):
        return (
          <Button disabled={!newHunterData} onClick={onHunterLicenseSubmit}>
            {t("form-header.voucher.continue-btn")}
          </Button>
        )
      case pathname.includes("/purchase/stage5"):
        return isMobile ? (
          <div className="basket-icon">
            <Icon name="busket-mobile" size={48} />
            {purchaseVoucherData?.animals.length ? (
              <span>
                {purchaseVoucherData.animals.reduce(
                  (sum, animal) => sum + animal.heads,
                  0
                )}
              </span>
            ) : null}
          </div>
        ) : (
          <Link
            href={`/${params.locale}/vouchers/${params.id}/purchase/payment`}
          >
            <Button
              disabled={
                !purchaseVoucherData?.animals[0] ||
                !purchaseVoucherData?.startDate ||
                !purchaseVoucherData?.endDate ||
                !isAgreeWithHuntingRules
              }
            >
              {t("form-header.voucher.payment-btn")}
            </Button>
          </Link>
        )

      default:
        break
    }
  }

  return (
    <>
      {pathname.includes("/purchase/stage") && (
        <FormHeader stages={stages} getFormButton={getFormButton} />
      )}
      {pathname.includes("/purchase/payment") && (
        <FormHeader
          titlePage={t("form-header.voucher.payment")}
          titlePageMobile={t("form-header.voucher.payment")}
          getFormButton={getFormButton}
        />
      )}
    </>
  )
}

export default VoucherFormHeader
