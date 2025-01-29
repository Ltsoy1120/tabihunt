"use client"
import { declensionOfHeads } from "@/helpers/common"
import { PurchasedVoucherLimitDto, VoucherPriceType } from "@/models/vouchers"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface MeVoucherAnimalCardProps {
  limit: PurchasedVoucherLimitDto
  priceType: VoucherPriceType | null
}
const MeVoucherAnimalCard = ({
  limit,
  priceType
}: MeVoucherAnimalCardProps) => {
  const { t } = useTranslation()
  const getLimitPrice = (priceType: VoucherPriceType) => {
    switch (priceType) {
      case VoucherPriceType.STANDARD:
        return t("page.voucher-prices.standardPrice")
      case VoucherPriceType.MEMBERSHIP:
        return t("page.voucher-prices.membershipPrice")
      case VoucherPriceType.PREFERENTIAL:
        return t("page.voucher-prices.preferentialPrice")
      case VoucherPriceType.SPECIAL:
        return t("page.voucher-prices.specialPrice")
      default:
        break
    }
  }
  return (
    <div className="voucher-animal-card">
      <div className="voucher-animal-info">
        <h3>{limit?.limit.animal.name}</h3>
        <p>{declensionOfHeads(limit?.heads)}</p>
      </div>

      <span>{t("page.voucher-prices.headPrice")}</span>
      <div className="voucher-animal-price">
        <span>{priceType && getLimitPrice(priceType)}</span>
        <p>{limit?.amount}</p>
      </div>
    </div>
  )
}

export default MeVoucherAnimalCard
