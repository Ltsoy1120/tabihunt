"use client"
import { useTranslation } from "react-i18next"
import Button from "@/components/UI/buttons/Button"
import { PlotDescriptionDto } from "@/models/plots"
import { API_URL } from "@/services/http.service"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import "./style.scss"
import { useParams } from "next/navigation"

interface PlotDescriptionCardMainProps {
  plotDescription: PlotDescriptionDto
}

const PlotDescriptionCardMain = ({
  plotDescription
}: PlotDescriptionCardMainProps) => {
  const { t } = useTranslation()
  const params = useParams()
  return (
    <div className="plot-description-card-main">
      <div className="plot-description__img">
        <Image
          src={`${API_URL}files/${plotDescription.imageUrl}`}
          alt="plot-description-img"
          fill
          priority
          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 25vw"
        />
      </div>
      <div className="plot-description__info">
        <h3>{plotDescription.plot.name}</h3>
        <p>{plotDescription.about}</p>
        <Link
          href={`/${params.locale}/plot-descriptions/${plotDescription.id}`}
        >
          <Button>{t("plot-description.card.button")}</Button>
        </Link>
      </div>
    </div>
  )
}

export default PlotDescriptionCardMain
