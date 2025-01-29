"use client"
import Button from "@/components/UI/buttons/Button"
import Icon from "@/components/UI/Icon"
import { groupWorkingHours } from "@/helpers/common"
import { PlotDescriptionDto } from "@/models/plots"
import { API_URL } from "@/services/http.service"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface PlotDescriptionCardProps {
  plotDescription: PlotDescriptionDto
}

const PlotDescriptionCard = ({ plotDescription }: PlotDescriptionCardProps) => {
  const { t } = useTranslation()
  const params = useParams()
  return (
    <div className="plotDescription-card">
      <div className="plotDescription-card__img">
        <Image
          src={`${API_URL}files/${plotDescription.imageUrl}`}
          alt="plot-description-img"
          fill
          priority
          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 25vw"
        />
      </div>
      <div className="plotDescription-card__info">
        <div className="plotDescription-card__head">
          <h3>{plotDescription.plot.name}</h3>
          <p>{plotDescription.about}</p>
        </div>
        <h4>{t("card.contacts-title")}</h4>
        <div className="plotDescription__contacts">
          <div className="col" style={{ width: "max-content" }}>
            <a
              href={`mailto:${plotDescription.email}`}
              className="plotDescription__contacts-item"
            >
              <Icon name="email" size={20} />
              {plotDescription.email}
            </a>
            <a
              href={`tel:${plotDescription.phoneNumber}`}
              className="plotDescription__contacts-item"
            >
              <Icon name="phone" size={20} />
              {plotDescription.phoneNumber}
            </a>
          </div>
          <div className="col" style={{ width: "50%" }}>
            <a
              href="mailto:info@poymay.kz"
              className="plotDescription__contacts-item"
            >
              <Icon name="geo" size={20} />
              <p>{plotDescription.address}</p>
            </a>
            <div className="plotDescription__contacts-item">
              <Image
                src={"/static/images/icons/close.png"}
                alt="close-icon"
                width={20}
                height={20}
              />
              <div className="col" style={{ gap: "5px" }}>
                {plotDescription &&
                  groupWorkingHours(plotDescription?.workingHours)
                    .split(", ")
                    .map((item, index) => <p key={index}>{item}</p>)}
              </div>
            </div>
          </div>
          <div
            className="col"
            style={{ width: "max-content", textAlign: "end" }}
          >
            <Link
              href={`/${params.locale}/plot-descriptions/${plotDescription.id}`}
            >
              <Button>{t("card.button")}</Button>
            </Link>
            <Link
              href={`/${params.locale}/vouchers?plotId=${plotDescription.plot.id}`}
            >
              <Button>{t("page.purchase-voucher-btn")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlotDescriptionCard
