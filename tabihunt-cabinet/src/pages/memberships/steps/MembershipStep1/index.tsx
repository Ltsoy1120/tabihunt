import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NotHunterModal from "../../../../components/modals/NotHunterModal"
import Button from "../../../../components/UI/buttons/Button"
import ErrorButton from "../../../../components/UI/buttons/ErrorButton"
import Input from "../../../../components/UI/Input"
import Loader from "../../../../components/UI/loaders/Loader"
import { validateIin, validateEmail } from "../../../../helpers/validate"
import useMembershipState from "../../../../hooks/useMembershipState"
import { useAppDispatch } from "../../../../store"
import {
  getHunterByIin,
  getHunterByPhoneNumber
} from "../../../../store/actions/hunterActions"
import DateSelector from "../../components/DateSelector"
import "./style.scss"
import Select from "../../../../components/UI/Select"
import {
  setHunter,
  setNewHunterData
} from "../../../../store/slices/huntersSlice"

export interface ErrorType {
  isInvalid: boolean
  message: string
}

const MembershipStep1 = () => {
  const dispatch = useAppDispatch()
  const { membershipId } = useParams()
  const [state, setState] = useMembershipState()
  const [emailError, setEmailError] = useState(false)

  const [searchByIin, setSearchByIin] = useState("")
  const [searchByPhone, setSearchByPhone] = useState("")
  const [iinError, setIinError] = useState<ErrorType>({
    isInvalid: false,
    message: ""
  })
  const [isOpenModal, setOpenModal] = useState(false)

  useEffect(() => {
    const getHunter = async (phoneNumber: string) => {
      await dispatch(getHunterByPhoneNumber(phoneNumber))
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
    } else {
      setState(prevState => ({ ...prevState, [name]: value }))
    }
  }

  // const handleIinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchByIin("")
  //   setIinError({
  //     isInvalid: false,
  //     message: ""
  //   })
  //   const { name, value } = event.target

  //   const filteredValue = value.replace(/\D/g, "")

  //   if (filteredValue.length > 12) {
  //     return
  //   }
  //   const textError = validateIin(filteredValue)?.message
  //   textError &&
  //     setIinError({
  //       isInvalid: true,
  //       message: textError
  //     })

  //   setState(prevState => ({
  //     ...prevState,
  //     [name]: filteredValue
  //   }))
  // }

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
  }

  return (
    <div className="new-hunter-step1">
      {isOpenModal && (
        <NotHunterModal
          isIin={!!searchByIin}
          isPhone={!!searchByPhone || !!state.user.phoneNumber}
          close={() => setOpenModal(false)}
        />
      )}
      <h2>Контактная информация</h2>
      {!membershipId && (
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
      )}
      {membershipId && !state ? (
        <Loader />
      ) : (
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
          {/* <h3>ИИН</h3>
          <Input
            placeholder="Обязательно"
            name="iin"
            type="number"
            value={state.iin ?? ""}
            onChange={handleIinChange}
            isInvalid={iinError.isInvalid}
          /> */}
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
      )}
    </div>
  )
}

export default MembershipStep1
