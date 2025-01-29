import { useState, useEffect } from "react"
import Select, { Option } from "../../../../components/UI/Select"
import "./style.scss"
import Button from "../../../../components/UI/buttons/Button"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { PriceType } from "../PurchasedVoucherStep3"
import { AnimalCartCard } from "../../components/animalCartCard"
import {
  setCartAnimal,
  setSellVoucher
} from "../../../../store/slices/PurchaseVoucherSlice"
import usePurchaseVoucherState from "../../../../hooks/usePurchasedVoucherState"
import { CreateSellData } from "../../../../store/actions/purchasedVoucherAction"
import { useNavigate, useParams } from "react-router-dom"
import Modal from "../../../../components/UI/Modal"

const paymentArray = [
  // { title: "Банковская карта", value: "CARD" },
  { title: "QR-код", value: "KASPI" },
  { title: "Наличный расчет", value: "CASH" }
]

const priceObject = {
  membershipPrice: "Член охотничьего общества",
  preferentialPrice: "Льготная",
  standardPrice: "Стандарная",
  specialPrice: "Специальная"
}

const PurchasedVoucherStep4 = () => {
  const [paymentMethod, setPaymentMethod] = useState({
    title: "Выберите способ оплаты",
    value: ""
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { purchasedId } = useParams()
  const { sellVoucherData, voucherData, cartAnimalData, purchasedVoucher } =
    useAppSelector(state => state.purchasedVoucher)
  const { hunter } = useAppSelector(state => state.hunters)
  const [__, setState] = usePurchaseVoucherState()
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    // if (purchasedVoucher && paymentMethod.value === "CARD" && hunter) {
    //   let language = "ru-RU"
    //   const tiptop = window.tiptop

    //   var widget = new tiptop.Widget({
    //     language: language
    //   })
    //   widget.pay(
    //     "auth", // или "charge"
    //     {
    //       //options
    //       publicId: "pk_c8b2e98d62ba4d7a56db6116ca20e", // id из личного кабинета
    //       description: "Покупка путевки", // назначение
    //       amount: purchasedVoucher.purchasedVoucher.totalAmount, // сумма
    //       currency: "KZT", // валюта
    //       accountId: hunter?.id, // идентификатор плательщика (необязательно)
    //       invoiceId: `voucher:${purchasedVoucher.purchasedVoucher.slug}`, // айдишник purchased voucher  (необязательно)
    //       email: hunter.user.email, //email плательщика (необязательно),
    //       skin: "mini", // дизайн виджета (необязательно)
    //       autoClose: 3
    //     },
    //     {
    //       onSuccess: async function (options: any) {
    //         // success
    //         console.log("options", options)
    //         setModal(true)
    //       },
    //       onFail: function (reason: any, options: any) {
    //         // fail
    //         console.log("reason", reason)
    //         console.log("options", options)

    //         //действие при неуспешной оплате
    //       },
    //       onComplete: function (paymentResult: any, options: any) {
    //         //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
    //         //например вызов вашей аналитики Facebook Pixel
    //         console.log("paymentResult", paymentResult)
    //         console.log("options", options)
    //       }
    //     }
    //   )
    // }
    if (
      purchasedVoucher?.kaspiPaymentUrl &&
      paymentMethod.value === "KASPI" &&
      hunter
    ) {
      window.location.href = purchasedVoucher.kaspiPaymentUrl
    }
    if (purchasedVoucher && paymentMethod.value === "CASH") {
      setModal(true)
    }
  }, [dispatch, purchasedVoucher, paymentMethod, hunter])

  const reverseDate = (date: string) => {
    return date.replace(/-/g, ".").split(".").reverse().join(".")
  }

  const priceType = (sellVoucherData?.priceType?.toLowerCase() +
    "Price") as PriceType
  const price = priceType && voucherData ? voucherData[priceType] : 0

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartAnimalData.filter((_, i) => i !== index)
    dispatch(setCartAnimal(updatedCart))
  }

  const handleQuantityChange = (index: number, change: number) => {
    const updatedCart = cartAnimalData
      .map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + change } : item
      )
      .filter(item => item.quantity > 0)

    const newQuantity = updatedCart[index].quantity
    if (newQuantity > 0) {
      dispatch(setCartAnimal(updatedCart))
      setState(prevState => ({
        ...prevState,
        animals: updatedCart.map(item => {
          return {
            voucherAnimalId: item.animal.id,
            priceType: item.priceType,
            heads: item.quantity
          }
        })
      }))
    }
  }

  const onChangePayment = (e: Option) => {
    setPaymentMethod(e)
    setState(prevState => ({
      ...prevState,
      paymentMethod: e.value
    }))
  }

  const createSell = () => {
    if (purchasedId && sellVoucherData && hunter) {
      const updatedSellVoucherData = {
        ...sellVoucherData,
        withQrCode: sellVoucherData.paymentMethod === "KASPI",
        hunterId: hunter.id
      }

      dispatch(CreateSellData(purchasedId, updatedSellVoucherData))
    }
  }

  const closeHandler = () => {
    setModal(false)
    navigate({ pathname: "/purchased-vouchers" })
    dispatch(setSellVoucher(null))
  }

  return (
    <>
      {modal ? (
        <Modal close={closeHandler}>
          <div>
            <h1>Оплата проведена успешно!</h1>
            <span>
              Благодарим за использование нашего сервиса. Мы отправили
              подтверждение оплаты и информацию о заказе на Ваш адрес
              электронной почты.{" "}
            </span>
            <div className="AcceptButtonPayment">
              <a
                href={`${import.meta.env.VITE_BASE_URL}/api/files/${
                  purchasedVoucher?.purchasedVoucher.id
                }`}
              >
                <Button
                  onClick={() => navigate({ pathname: "/purchased-vouchers" })}
                >
                  Скачать
                </Button>
              </a>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
      <div className="new-purchased-voucher-step4">
        <div className="hunterBlock">
          <h2>Охотник</h2>
          <div className="hunterInfoWrapper">
            <div>
              <span>ФИО</span>
              <h4>{`${hunter?.lastname || ""} ${hunter?.firstname || ""} ${
                hunter?.patronymic || ""
              }`}</h4>
            </div>
            <div>
              <span>Номер охотничьего удостоверения</span>
              <h4>{hunter?.huntingLicenseNumber || "Не указано"}</h4>
            </div>
            <div>
              <span>Выдано</span>
              <h4>
                {hunter?.huntingLicenseIssued
                  ? reverseDate(hunter.huntingLicenseIssued)
                  : "Не указано"}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="new-purchased-voucher-step4">
        <div className="hunterBlock">
          <h2>Характеристика</h2>
          <div className="hunterInfoWrapper">
            <div>
              <span>Тип путевки</span>
              <h4>
                {voucherData?.type === "ONE_TIME" ? "Разовая" : "Сезонная"}
              </h4>
            </div>
            <div>
              <span>Начало</span>
              <h4>
                {sellVoucherData?.startDate
                  ? reverseDate(sellVoucherData.startDate)
                  : "Не указано"}
              </h4>
            </div>
            <div>
              <span>Конец</span>
              <h4>
                {sellVoucherData?.endDate
                  ? reverseDate(sellVoucherData.endDate)
                  : "Не указано"}
              </h4>
            </div>
            <div>
              <span>Участок</span>
              <h4>{voucherData?.plot?.name || "Не указано"}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="new-purchased-voucher-step4">
        <div className="hunterBlock">
          <h2>Егеря</h2>
          <div className="hunterInfoWrapper">
            {voucherData?.huntsmen.map(item => (
              <div key={item.id}>
                <span>
                  {item.position === "SENIOR"
                    ? "Старший егерь"
                    : "Младший егерь"}
                </span>
                <h4>{`${item.firstname} ${item.lastname} ${item.patronymic}`}</h4>
              </div>
            )) || "Нет егерей"}
          </div>
        </div>
      </div>
      <div className="new-purchased-voucher-step4">
        <div className="hunterBlock">
          <h2>Цена</h2>
          <div className="hunterInfoWrapper">
            <div>
              <span>{priceObject[priceType]}</span>
              <h4>{price} ₸</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="new-purchased-voucher-step4">
        <div className="hunterBlock">
          <h2>Дичь</h2>
          <div className="hunterInfoWrapper">
            {cartAnimalData.map((cartItem, index) => {
              const priceType = (cartItem?.priceType?.toLowerCase() +
                "Price") as PriceType
              const price = priceType ? cartItem.animal[priceType] : 0
              return (
                <AnimalCartCard
                  className="animalCart"
                  key={cartItem.animal.id}
                  huntingStartDate={cartItem.huntingStartDate}
                  huntingEndDate={cartItem.huntingEndDate}
                  name={cartItem.animal.animal.name}
                  price={price ? price.toString() : price.toString()}
                  quantity={cartItem.quantity}
                  actualHeads={cartItem.animal.limitHeads!}
                  removeItem={() => handleRemoveItem(index)}
                  minusFunc={() => handleQuantityChange(index, -1)}
                  plusFunc={() => handleQuantityChange(index, 1)}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className="new-purchased-voucher-step4">
        <div className="selectPayment">
          <h2>Способ оплаты</h2>
          <Select
            options={paymentArray}
            selected={paymentMethod}
            onChange={e => onChangePayment(e)}
          />
        </div>
        {paymentMethod.value !== "" && (
          <div className="AcceptButtonPayment">
            <Button onClick={createSell}>Подтвердите оплату</Button>
          </div>
        )}
      </div>
    </>
  )
}

export default PurchasedVoucherStep4
