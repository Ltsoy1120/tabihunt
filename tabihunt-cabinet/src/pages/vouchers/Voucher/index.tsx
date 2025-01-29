import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getHuntsmanFullName } from "../../../helpers/common"
import { API_URL } from "../../../services/http.service"
import { useAppDispatch, useAppSelector } from "../../../store"
import { getMeCompanyVoucherById } from "../../../store/actions/vouchersActions"
import VoucherLimitCard from "../components/VoucherAnimalCard"
import "./style.scss"

const Voucher = () => {
  const dispatch = useAppDispatch()
  const { voucherId } = useParams()
  const { voucher } = useAppSelector(state => state.vouchers)

  useEffect(() => {
    voucherId && dispatch(getMeCompanyVoucherById(voucherId))
  }, [voucherId, dispatch])

  const voucherCharacteristicState = [
    {
      title: "Тип путевки",
      value: voucher?.type === "SEASONAL" ? "Сезонная" : "Одноразовая"
    },
    {
      title: "Количество дней",
      value: voucher?.duration
    },
    {
      title: "Посещения в день",
      value: voucher?.dailyLimit
    },
    {
      title: "Правила охотугодья",
      value: (
        <a href={`${import.meta.env.VITE_BASE_URL}/api/files/${voucher?.rulesUrl}`}>
          Скачать
        </a>
      )
    }
  ]

  const voucherPriceState = [
    {
      title: "Стандартная",
      value: voucher?.standardPrice
    },
    {
      title: "Член охотничьего общества",
      value: voucher?.membershipPrice
    },
    {
      title: "Льготная",
      value: voucher?.preferentialPrice
    },
    {
      title: "Специальная",
      value: voucher?.specialPrice
    }
  ]

  const voucherAnimalsState = voucher?.animals
  const voucherHuntsmenState = voucher?.huntsmen

  return (
    <div className="new-voucher-step5">
      <div className="block-wrapper">
        <img src={`${API_URL}files/${voucher?.imageUrl}`} alt="" />
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
          {voucherHuntsmenState?.map(item => (
            <div key={item?.id} className="block__item">
              <span>
                {item?.position === "SENIOR"
                  ? "Старший егерь"
                  : "Младший егерь"}
              </span>
              <p>{item && getHuntsmanFullName(item)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="block-wrapper">
        <h2>Дичь</h2>
        {voucherAnimalsState?.map(animal => (
          <VoucherLimitCard key={animal.id} voucherAnimal={animal} />
        ))}
      </div>
    </div>
  )
}

export default Voucher
