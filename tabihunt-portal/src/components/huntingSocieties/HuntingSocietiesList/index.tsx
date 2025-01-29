"use client"
import { HuntingSocietyDto } from "@/models/huntingSociety"
import { useTranslation } from "react-i18next"
import HuntingSocietyCard from "../HuntingSocietyCard"
import "./style.scss"

interface HuntingSocietiesListProps {
  huntingSocieties: HuntingSocietyDto[]
}

const HuntingSocietiesList = ({
  huntingSocieties
}: HuntingSocietiesListProps) => {
  const { t } = useTranslation()
  return (
    <div className="huntingSocieties-list">
      {huntingSocieties.length > 0 ? (
        huntingSocieties.map(huntingSociety => (
          <HuntingSocietyCard
            key={huntingSociety.id}
            huntingSociety={huntingSociety}
          />
        ))
      ) : (
        <p>{t("empty")}</p>
      )}
    </div>
  )
}

export default HuntingSocietiesList
