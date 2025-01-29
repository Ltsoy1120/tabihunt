import Button from "@/components/UI/buttons/Button"
import Icon from "@/components/UI/Icon"
import { formatDate } from "@/helpers/common"
import useIsMobile from "@/hooks/useIsMobile"
import { PurchasedVoucherDto } from "@/models/vouchers"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import ReportTable from "../ReportTable"
import "./style.scss"

interface MeReportsListProps {
  voucher: PurchasedVoucherDto
}

const MeReportCard = ({ voucher }: MeReportsListProps) => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const params = useParams()
  const [reportShow, setReportShow] = useState(false)
  return (
    <div className="me-report-card__wrapper">
      <div className="me-report-card">
        <div className="me-report-card__number">
          <span>{t("card.voucher-number")}</span>
          <p>{voucher.slug}</p>
        </div>
        <div className="me-report-card__info">
          <div className="me-voucher-animal">
            {voucher.voucher.animalTypes?.includes("FEATHERED") && (
              <Icon name="feather" size={40} />
            )}
            {voucher.voucher.animalTypes?.includes("UNGULATE") && (
              <Icon name="ungulate" size={40} />
            )}
          </div>
          <div className="me-voucher-info">
            <h3>{voucher.voucher.plot?.name}</h3>
            <span>
              {params.locale === "ru"
                ? `С ${formatDate(voucher.startDate)} По ${formatDate(
                    voucher.endDate
                  )}`
                : `${formatDate(voucher.startDate)} бастап ${formatDate(
                    voucher.endDate
                  )} дейін`}
            </span>
          </div>
        </div>
        <div className="me-report-card__btn">
          {voucher.reportFilled ? (
            <Button
              className="reportFilled"
              endIcon="green-ok"
              onClick={() => setReportShow(!reportShow)}
            >
              {isMobile
                ? t("card.voucher-report-mobile-btn")
                : t("card.voucher-report-btn")}
            </Button>
          ) : (
            <Link
              href={`/${params.locale}/purchased-vouchers/${voucher.id}/report`}
            >
              <Button endIcon="circle-plus">
                {isMobile
                  ? t("card.voucher-report-mobile-btn")
                  : t("card.create-voucher-report-btn")}
              </Button>
            </Link>
          )}
        </div>
      </div>
      {reportShow && <ReportTable voucher={voucher} />}
    </div>
  )
}

export default MeReportCard
