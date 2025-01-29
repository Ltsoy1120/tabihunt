"use client"
import Icon from "@/components/UI/Icon"
import { VoucherAnimalDto } from "@/models/vouchers"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface VoucherAnimalCardProps {
  voucherAnimal: VoucherAnimalDto
}
const VoucherAnimalCard = ({ voucherAnimal }: VoucherAnimalCardProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const voucherAnimalPrices = [
    {
      title: t("page.voucher-prices.standardPrice"),
      value: voucherAnimal?.standardPrice
    },
    {
      title: t("page.voucher-prices.membershipPrice"),
      value: voucherAnimal?.membershipPrice
    },
    {
      title: t("page.voucher-prices.preferentialPrice"),
      value: voucherAnimal?.preferentialPrice
    }
  ]

  return (
    <div className="voucher-animal-card">
      <h3>{voucherAnimal?.animal.name}</h3>
      <div className="voucher-animal-card__select">
        <div className="voucher-animal-card__select-btn">
          <span>{t("page.voucher-prices.headPrice")}</span>
          <span className="circle" onClick={() => setIsOpen(!isOpen)}>
            <Icon name="arrow-down" size={12} />
          </span>
        </div>
        {isOpen && (
          <div className="voucherAnimalPrices__list">
            {voucherAnimalPrices.map(item => (
              <div key={item.title} className="voucherAnimalPrices__list-item">
                <span>{item.title}</span>
                <p>{item.value} ₸</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VoucherAnimalCard
