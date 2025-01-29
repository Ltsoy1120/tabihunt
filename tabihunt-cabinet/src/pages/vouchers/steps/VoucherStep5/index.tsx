import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getHuntsmanFullName } from "../../../../helpers/common"
import { HuntsmanDto } from "../../../../models/huntsmen"
import { PlotDto } from "../../../../models/plots"
import { API_URL } from "../../../../services/http.service"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { getMeCompanyHuntsmanById } from "../../../../store/actions/huntsmenActions"
import { getMeCompanyPlotById } from "../../../../store/actions/plotsActions"
import VoucherAnimalCard from "../../components/VoucherAnimalCard"
import "./style.scss"

const VoucherStep5 = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { voucherId } = useParams()
  const { docFileName, newVoucherData } = useAppSelector(
    state => state.vouchers
  )
  const [plot, setPlot] = useState<PlotDto | null>(null)
  const [huntsmen, setHuntsmen] = useState<HuntsmanDto[]>([])

  useEffect(() => {
    if (!newVoucherData) {
      navigate(
        voucherId ? `/edit-voucher-step1/${voucherId}` : "/new-voucher-step1"
      )
    }
  }, [newVoucherData])

  useEffect(() => {
    const fetchPlot = async () => {
      if (newVoucherData?.plotId) {
        const plot = await dispatch(getMeCompanyPlotById(newVoucherData.plotId))
        plot && setPlot(plot)
      }
    }
    fetchPlot()
  }, [dispatch, newVoucherData?.plotId])

  useEffect(() => {
    const fetchHuntsmen = async () => {
      if (newVoucherData?.huntsmenIds) {
        const huntsmen = await Promise.all(
          newVoucherData.huntsmenIds.map(async (id: string) => {
            const action = await dispatch(getMeCompanyHuntsmanById(id))
            return action || undefined
          })
        )
        setHuntsmen(
          huntsmen.filter(
            (action): action is HuntsmanDto => action !== undefined
          )
        )
      }
    }
    fetchHuntsmen()
  }, [dispatch, newVoucherData?.huntsmenIds])

  const voucherCharacteristicState = [
    {
      title: "Тип путевки",
      value: newVoucherData?.type === "SEASONAL" ? "Сезонная" : "Одноразовая"
    },
    {
      title: "Количество дней",
      value: newVoucherData?.duration
    },
    {
      title: "Участок",
      value: plot?.name
    },
    {
      title: "Посещения в день",
      value: newVoucherData?.dailyLimit
    },
    {
      title: "Правила охотугодья",
      value: docFileName
    }
  ]

  const voucherPriceState = [
    {
      title: "Стандартная",
      value: `${newVoucherData?.standardPrice} ₸`
    },
    {
      title: "Член охотничьего общества",
      value: `${newVoucherData?.membershipPrice} ₸`
    },
    {
      title: "Льготная",
      value: `${newVoucherData?.preferentialPrice} ₸`
    },
    {
      title: "Специальная",
      value: `${newVoucherData?.specialPrice} ₸`
    }
  ]

  const voucherAnimalsState = newVoucherData?.animals

  return (
    <div className="new-voucher-step5">
      <div className="block-wrapper">
        <img
          src={`${API_URL}files/${newVoucherData?.imageUrl}`}
          alt="imageUrl"
        />
        <h2>Характеристика</h2>
        <div className="block">
          {voucherCharacteristicState.map(item => (
            <div key={item.title} className="block__item">
              <span>{item.title}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="block-wrapper">
        <h2>Цена</h2>
        <div className="block">
          {voucherPriceState.map(item => (
            <div key={item.title} className="block__item">
              <span>{item.title}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="block-wrapper">
        <h2>Егеря</h2>
        <div className="block">
          {huntsmen.map(item => (
            <div key={item.id} className="block__item">
              <span>
                {item.position === "SENIOR" ? "Старший егерь" : "Младший егерь"}
              </span>
              <p>{getHuntsmanFullName(item)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="block-wrapper">
        <h2>Дичь</h2>
        {voucherAnimalsState?.map(animal => (
          <VoucherAnimalCard key={animal.animalId} voucherAnimal={animal} />
        ))}
      </div>
    </div>
  )
}

export default VoucherStep5
