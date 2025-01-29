import { useState, useEffect } from "react"
import { PlotDto } from "../../../../models/plots"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { getMeCompanyPlotById } from "../../../../store/actions/plotsActions"
import "./style.scss"

const NewHuntsmanStep4 = () => {
  const dispatch = useAppDispatch()
  const { newHuntsmanData } = useAppSelector(state => state.huntsmen)
  const [plotById, setPlotById] = useState<PlotDto>()

  useEffect(() => {
    const getPlotById = async (plotId: string) => {
      const plot = await dispatch(getMeCompanyPlotById(plotId))
      if (plot) {
        setPlotById(plot)
      }
    }
    if (newHuntsmanData?.plotId) {
      getPlotById(newHuntsmanData?.plotId)
    }
  }, [newHuntsmanData?.plotId, dispatch])

  const huntsmanState = [
    { title: "ФИО", value: newHuntsmanData?.firstname },
    {
      title: "Должность",
      value:
        newHuntsmanData?.position === "SENIOR"
          ? "Старший егерь"
          : "Младший егерь"
    },
    {
      title: "Показать в путевке",
      value: newHuntsmanData?.displayInVouchers ? "Да" : "Нет"
    },
    {
      title: "Номер",
      value: newHuntsmanData?.user.phoneNumber
    }
  ]

  const locationState = [
    { title: "Участок", value: plotById?.name },
    {
      title: "Домик",
      value: `${newHuntsmanData?.latitude}, ${newHuntsmanData?.longitude}`
    }
  ]

  const loginDataState = [
    { title: "Почта", value: newHuntsmanData?.user.email },
    { title: "Пароль", value: newHuntsmanData?.user.password }
  ]

  return (
    <div className="new-huntsman-step4">
      <div className="block-wrapper">
        <h2>Егерь</h2>
        <div className="block">
          {huntsmanState.map(item => (
            <div key={item.title} className="block__item">
              <span>{item.title}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="block-wrapper">
        <h2>Месторасположение</h2>
        <div className="block">
          {locationState.map(item => (
            <div key={item.title} className="block__item">
              <span>{item.title}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="block-wrapper">
        <h2>Данные для входа в приложение</h2>
        <div className="block">
          {loginDataState.map(item => (
            <div key={item.title} className="block__item">
              <span>{item.title}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewHuntsmanStep4
