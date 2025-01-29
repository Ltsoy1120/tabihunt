"use client"
import Button from "@/components/UI/buttons/Button"
import Icon from "@/components/UI/Icon"
import { groupWorkingHours } from "@/helpers/common"
import { HuntingSocietyDto } from "@/models/huntingSociety"
import { API_URL } from "@/services/http.service"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface HuntingSocietyCardProps {
  huntingSociety: HuntingSocietyDto
}

const HuntingSocietyCard = ({ huntingSociety }: HuntingSocietyCardProps) => {
  const { t } = useTranslation()
  const params = useParams()
  return (
    <div className="huntingSociety-card">
      <div className="huntingSociety-card__img">
        <Image
          src={`${API_URL}files/${huntingSociety.imageUrl}`}
          alt="huntingSociety-img"
          width={250}
          height={250}
        />
      </div>
      <div className="huntingSociety-card__info">
        <div className="huntingSociety-card__head">
          <h3>{huntingSociety.name}</h3>
          <div
            className="about"
            dangerouslySetInnerHTML={{ __html: huntingSociety.about }}
          />
        </div>
        <h4>{t("card.contacts-title")}</h4>
        <div className="huntingSociety-card__contacts">
          <div className="col" style={{ width: "40%" }}>
            <a
              href={`mailto:${huntingSociety.email}`}
              className="huntingSociety-card__contacts-item"
            >
              <Icon name="email" size={20} />
              {huntingSociety.email}
            </a>
            <a
              href={`tel:${huntingSociety.phoneNumber}`}
              className="huntingSociety-card__contacts-item"
            >
              <Icon name="phone" size={20} />
              {huntingSociety.phoneNumber}
            </a>
          </div>
          <div className="col" style={{ width: "40%" }}>
            <a
              href="mailto:info@poymay.kz"
              className="huntingSociety-card__contacts-item"
            >
              <Icon name="geo" size={20} />
              {huntingSociety.address}
            </a>
            <div className="huntingSociety-card__contacts-item">
              <Image
                src={"/static/images/icons/close.png"}
                alt="close-icon"
                width={20}
                height={20}
              />
              <div className="col" style={{ gap: "5px" }}>
                {huntingSociety &&
                  groupWorkingHours(huntingSociety?.workingHours)}
              </div>
            </div>
          </div>
          <Link
            href={`/${params.locale}/hunting-societies/${huntingSociety.id}`}
          >
            <Button>{t("card.button")}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HuntingSocietyCard
