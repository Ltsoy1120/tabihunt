import { useEffect, useState } from "react"
import Loader from "../../../../components/UI/loaders/Loader"
import Input from "../../../../components/UI/Input"
import ErrorButton from "../../../../components/UI/buttons/ErrorButton"
import Button from "../../../../components/UI/buttons/Button"
import NotHunterModal from "../../../../components/modals/NotHunterModal"
import { useAppDispatch, useAppSelector } from "../../../../store"
import Select, { Option } from "../../../../components/UI/Select"
import DateSelector from "../../../memberships/components/DateSelector"
import { validateEmail, validateIin } from "../../../../helpers/validate"
import { HunterData } from "../../../../models/hunters"
import "./style.scss"
import { getRegions } from "../../../../store/actions/purchasedVoucherAction"
import usePurchaseVoucherUserState from "../../../../hooks/usePurchasedUsersState"
import {
  getHunterByIin,
  getHunterByPhoneNumber
} from "../../../../store/actions/hunterActions"
import {
  setHunter,
  setNewHunterData
} from "../../../../store/slices/huntersSlice"

export interface ErrorType {
  isInvalid: boolean
  message: string
}
const issuedByOptions = [
  { value: "МВД РК", title: "МВД РК" },
  { value: "МЮ РК", title: "МЮ РК" }
]

const PurchasedVoucherStep1 = () => {
  const [loading] = useState(false)
  const dispatch = useAppDispatch()
  const { regionsData } = useAppSelector(state => state.purchasedVoucher)
  const [state, setState] = usePurchaseVoucherUserState()
  const [emailError, setEmailError] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState({
    title: "Выберите область",
    value: ""
  })
  const [searchByIin, setSearchByIin] = useState("")
  const [searchByPhone, setSearchByPhone] = useState("")
  const [iinError, setIinError] = useState<ErrorType>({
    isInvalid: false,
    message: ""
  })
  const [isOpenModal, setOpenModal] = useState(false)

  useEffect(() => {
    dispatch(getRegions())
  }, [dispatch])

  useEffect(() => {
    const getHunter = async (phoneNumber: string) => {
      const result = await dispatch(getHunterByPhoneNumber(phoneNumber))
      if (result?.address) {
        setSelectedRegion({
          title: result?.address?.region?.name ?? "",
          value: result?.address?.region?.id ?? ""
        })
      }
    }
    state.user.phoneNumber.length === 12 && getHunter(state.user.phoneNumber)
  }, [dispatch, state.user.phoneNumber])

  const searchHunterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetHunter()

    setIinError({
      isInvalid: false,
      message: ""
    })
    const { name, value } = event.target

    const filteredValue = value.replace(/\D/g, "")

    if (name === "iin") {
      setSearchByPhone("")
      if (filteredValue.length > 12) {
        return
      }
      const textError = validateIin(filteredValue)?.message
      textError &&
        setIinError({
          isInvalid: true,
          message: textError
        })
      setSearchByIin(value)
    }

    if (name === "phoneNumber") {
      setSearchByIin("")
      setSearchByPhone(`+${value.replace(/\D/g, "")}`)
    }
  }

  const resetHunter = () => {
    setState({
      user: {
        email: "",
        phoneNumber: "",
        password: ""
      },
      firstname: "",
      lastname: "",
      patronymic: "",
      gender: "",
      dateOfBirth: "",
      iin: "",
      address: {
        regionId: "",
        city: "",
        street: "",
        houseNumber: "",
        flatNumber: "",
        postalCode: "",
        latitude: undefined,
        longitude: undefined
      },
      identificationNumber: "",
      identificationIssued: "",
      identificationValid: "",
      identificationIssuedBy: "",
      huntingLicenseNumber: "",
      huntingLicenseIssued: "",
      huntingLicenseValid: ""
    })
    dispatch(setNewHunterData(null))
    dispatch(setHunter(null))
  }

  const searchHunterOnSubmit = async () => {
    let result
    if (searchByIin) {
      result = await dispatch(getHunterByIin(searchByIin))
    }
    if (searchByPhone) {
      result = await dispatch(getHunterByPhoneNumber(searchByPhone))
    }
    if (!result) {
      setOpenModal(true)
    }
    if (result?.address) {
      setSelectedRegion({
        title: result?.address?.region?.name ?? "",
        value: result?.address?.region?.id ?? ""
      })
    }
  }

  const handleGenderChange = (gender: { value: string; title: string }) => {
    setState(prev => ({ ...prev, gender: gender.value }))
  }

  const dateHandler = (year: string, month: string, day: string) => {
    setState(prevState => ({
      ...prevState,
      dateOfBirth: `${year}-${month}-${day}`
    }))
  }

  const genderOptions = [
    { value: "MALE", title: "Мужчина" },
    { value: "FEMALE", title: "Женщина" }
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByPhone("")
    setSearchByIin("")
    const { name, value } = event.target
    if (name === "phoneNumber") {
      setState(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          phoneNumber: `+${value.replace(/\D/g, "")}`
        }
      }))
    } else if (name === "email") {
      setEmailError(false)
      if (!validateEmail(value)) {
        setEmailError(true)
      }
      setState(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          email: value
        }
      }))
    } else if (name === "city") {
      setState(prevState => ({
        ...prevState,
        address: {
          ...prevState.address,
          city: value
        }
      }))
    } else if (name === "street") {
      setState(prevState => ({
        ...prevState,
        address: {
          ...prevState.address,
          street: value
        }
      }))
    } else {
      setState(prevState => ({ ...prevState, [name]: value }))
    }
  }

  const handleIinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIinError({
      isInvalid: false,
      message: ""
    })
    const { name, value } = event.target
    const filteredValue = value.replace(/\D/g, "")
    if (filteredValue.length > 12) {
      return
    }
    const textError = validateIin(filteredValue)?.message
    textError &&
      setIinError({
        isInvalid: false,
        message: textError
      })

    setState(prevState => ({
      ...prevState,
      [name]: filteredValue
    }))
  }

  const handleDateChange = (
    field: keyof HunterData,
    year: string,
    month: string,
    day: string
  ) => {
    setState(prevState => ({
      ...prevState,
      [field]: `${year}-${month}-${day}`
    }))
  }

  const handleIdentificationIssuedByChange = (option: Option) => {
    setState(prevState => ({
      ...prevState,
      identificationIssuedBy: option.value
    }))
  }

  const handleAddressChange = (option: Option) => {
    setState(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        regionId: option.value
      }
    }))
    setSelectedRegion(option)
  }

  return (
    <>
      {isOpenModal && (
        <NotHunterModal
          isIin={!!searchByIin}
          isPhone={!!searchByPhone || !!state.user.phoneNumber}
          close={() => setOpenModal(false)}
        />
      )}
      {!loading ? (
        <>
          <div className="new-purchased-voucher-step1 purchased-hunter">
            <h2>Охотник</h2>
            {/* <div className="search-hunter-block">
              <h3>ИИН</h3>
              <span>Введите иин для автоматического заполнения данных</span>
              <Input
                placeholder="Не обязательно"
                value={searchIin}
                onChange={searchHunterHandler}
                isInvalid={iinError?.isInvalid ?? true}
              />
              {iinError.isInvalid ? (
                <ErrorButton text={iinError.message} />
              ) : (
                <Button disabled={!searchIin} onClick={hunterByIinHandler}>
                  Поиск
                </Button>
              )}
            </div> */}
            <div className="search-hunter-block">
              <h3>Для автоматического заполнения данных:</h3>
              <div className="row">
                <Input
                  placeholder="Введите иин"
                  name="iin"
                  value={searchByIin}
                  onChange={searchHunterHandler}
                  isInvalid={iinError?.isInvalid ?? true}
                />
                <p>или</p>
                <Input
                  placeholder="Введите номер телефона"
                  name="phoneNumber"
                  type="tel"
                  value={searchByPhone}
                  onChange={searchHunterHandler}
                />
              </div>

              {iinError.isInvalid ? (
                <ErrorButton text={iinError.message} />
              ) : (
                <Button
                  disabled={!searchByIin && !searchByPhone}
                  onClick={searchHunterOnSubmit}
                >
                  Поиск
                </Button>
              )}
            </div>
            <div className="form">
              <h3>Фамилия</h3>
              <Input
                placeholder="Обязательно"
                name="lastname"
                value={state.lastname}
                onChange={handleChange}
              />
              <h3>Имя</h3>
              <Input
                placeholder="Обязательно"
                name="firstname"
                value={state.firstname}
                onChange={handleChange}
              />
              <h3>Отчество</h3>
              <Input
                placeholder="Не обязательно"
                name="patronymic"
                value={state.patronymic ?? ""}
                onChange={handleChange}
              />
              <h3>Пол</h3>
              <Select
                options={genderOptions}
                label="Обязательно"
                selected={{
                  value: state.gender,
                  title:
                    state.gender === "MALE"
                      ? "Мужчина"
                      : state.gender === "FEMALE"
                      ? "Женщина"
                      : ""
                }}
                onChange={handleGenderChange}
              />
              <h3>Дата рождения</h3>
              <DateSelector
                currentDate={state.dateOfBirth}
                dateHandler={dateHandler}
                startOffset={90}
                endOffset={0}
              />
              <h3>Номер телефона</h3>
              <Input
                placeholder="Обязательно"
                name="phoneNumber"
                type="tel"
                value={state.user.phoneNumber}
                onChange={handleChange}
              />
              <h3>Почта</h3>
              <Input
                placeholder="Обязательно"
                name="email"
                value={state.user.email ?? ""}
                onChange={handleChange}
                isInvalid={emailError}
              />
            </div>
          </div>
          <div className="new-purchased-voucher-step1 purchased-address">
            <h2>Адрес</h2>
            <div className="form">
              <h3>Область</h3>
              <Select
                options={regionsData}
                label="Обязательно"
                selected={selectedRegion}
                onChange={handleAddressChange}
              />
              <h3>Город</h3>
              <Input
                placeholder="Обязательно"
                name="city"
                value={state.address?.city ?? ""}
                onChange={handleChange}
              />
              <h3>Улица/Микрорайон</h3>
              <Input
                placeholder="Обязательно"
                name="street"
                value={state.address?.street ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="new-purchased-voucher-step1 purchased-identify">
            <h2>Удостоверение личности</h2>
            <div className="form">
              <h3>ИИН</h3>
              <Input
                placeholder="Обязательно"
                name="iin"
                value={state.iin ?? ""}
                onChange={handleIinChange}
                isInvalid={iinError.isInvalid}
              />
              <h3>Номер удостоверения личности</h3>
              <Input
                placeholder="Не обязательно"
                name="identificationNumber"
                type="number"
                value={state.identificationNumber ?? ""}
                onChange={handleChange}
              />
              <h3>Выдано</h3>
              <DateSelector
                currentDate={state.identificationIssued}
                startOffset={25}
                endOffset={0}
                dateHandler={(year, month, day) =>
                  handleDateChange("identificationIssued", year, month, day)
                }
              />
              <h3>Годен до</h3>
              <DateSelector
                currentDate={state.identificationValid}
                startOffset={0}
                endOffset={25}
                dateHandler={(year, month, day) =>
                  handleDateChange("identificationValid", year, month, day)
                }
              />
              <h3>Кем</h3>
              <Select
                options={issuedByOptions}
                selected={
                  issuedByOptions.find(
                    option => option.value === state.identificationIssuedBy
                  ) || { value: "", title: "Выберите из списка" }
                }
                label="Выберите из списка"
                onChange={handleIdentificationIssuedByChange}
              />
            </div>
          </div>
          <div className="new-purchased-voucher-step1 purchased-identifyHunter">
            <h2>Охотничье удостоверение</h2>
            <div className="form">
              <h3>Номер</h3>
              <Input
                placeholder="Обязательно"
                name="huntingLicenseNumber"
                value={state.huntingLicenseNumber ?? ""}
                onChange={handleChange}
              />
              <h3>Выдано</h3>
              <DateSelector
                currentDate={state.huntingLicenseIssued}
                startOffset={10}
                endOffset={0}
                dateHandler={(year, month, day) =>
                  handleDateChange("huntingLicenseIssued", year, month, day)
                }
              />
              <h3>Годен до</h3>
              <DateSelector
                currentDate={state.huntingLicenseValid}
                startOffset={0}
                endOffset={10}
                dateHandler={(year, month, day) =>
                  handleDateChange("huntingLicenseValid", year, month, day)
                }
              />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
export default PurchasedVoucherStep1
