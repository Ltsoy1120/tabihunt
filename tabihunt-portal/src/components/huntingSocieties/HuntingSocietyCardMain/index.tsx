"use client"
import { useTranslation } from "react-i18next"
import Image from "next/image"
import { calculateWidth } from "@/helpers/common"
import { HuntingSocietyDto } from "@/models/huntingSociety"
import { API_URL } from "@/services/http.service"
import Link from "next/link"
import Button from "@/components/UI/buttons/Button"
import "./style.scss"
import { useParams } from "next/navigation"

interface HuntingSocietyCardMainProps {
  huntingSociety: HuntingSocietyDto
  index: number
}

const HuntingSocietyCardMain = ({
  huntingSociety,
  index
}: HuntingSocietyCardMainProps) => {
  const { t } = useTranslation()
  const params = useParams()
  return (
    <Link
      href={`/${params.locale}/hunting-societies/${huntingSociety.id}`}
      className="huntingSociety-card-main"
      style={{
        width: index ? calculateWidth(index + 2) : "100%"
      }}
    >
      <Image
        src={`/static/images/huntingSociety${index}.png`}
        alt="huntingSociety-img"
        fill
        priority
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 40vw"
      />

      <div className="huntingSociety-card-main__content">
        <div className="huntingSociety__logo">
          <Image
            src={`${API_URL}files/${huntingSociety.imageUrl}`}
            alt="huntingSociety-logo"
            width={100}
            height={100}
          />
        </div>
        <div className="huntingSociety__info">
          <h3>{huntingSociety.name}</h3>
          <Button>{t("hunting-societies.card.button")}</Button>
        </div>
      </div>
    </Link>
  )
}

export default HuntingSocietyCardMain
