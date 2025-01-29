"use client"
import { useParams } from "next/navigation"
import "./style.scss"

const Loader = () => {
  const params = useParams()

  return (
    <div className="loader">
      <div className="loader__icon-wrapper">
        <div className="loader__icon"></div>
      </div>

      <p>
        {params.locale === "ru"
          ? "Подождите, идет загрузка данных"
          : "Күте тұрыңыз, деректер жүктелуде"}
      </p>
    </div>
  )
}

export default Loader
