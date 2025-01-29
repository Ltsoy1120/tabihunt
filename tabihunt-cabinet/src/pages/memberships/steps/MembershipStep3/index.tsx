import { useState } from "react"
import Input from "../../../../components/UI/Input"
import Select, { Option } from "../../../../components/UI/Select"
import { validateIin } from "../../../../helpers/validate"
import useMembershipState from "../../../../hooks/useMembershipState"
import { HunterData } from "../../../../models/hunters"
import DateSelector from "../../components/DateSelector"
import "./style.scss"

const issuedByOptions = [
  { value: "МВД РК", title: "МВД РК" },
  { value: "МЮ РК", title: "МЮ РК" }
]

const MembershipStep3 = () => {
  // const { hunter } = useAppSelector(state => state.hunters)
  const [state, setState] = useMembershipState()

  const [iinError, setIinError] = useState("")

  // useEffect(() => {
  //   if (hunter) {
  //     setState(prev => ({
  //       ...prev,
  //       iin: hunter?.iin,
  //       identificationNumber: hunter?.identificationNumber,
  //       identificationIssued: hunter?.identificationIssued,
  //       identificationValid: hunter?.identificationValid,
  //       identificationIssuedBy: hunter?.identificationIssuedBy
  //     }))
  //   }
  // }, [hunter])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIinError("")
    const { name, value } = event.target

    const filteredValue = value.replace(/\D/g, "")

    if (name === "iin") {
      if (filteredValue.length > 12) {
        return
      }
      const textError = validateIin(filteredValue)?.message
      textError && setIinError(textError)
    }

    if (name === "identificationNumber") {
      if (filteredValue.length > 9) {
        return
      }
    }

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

  return (
    <div className="new-hunter-step3">
      <h2>Удостоверение личности</h2>

      <div className="form">
        <h3>ИИН</h3>
        <Input
          placeholder="Обязательно"
          name="iin"
          type="number"
          value={state.iin ?? ""}
          onChange={handleChange}
          isInvalid={!!iinError}
        />
        <h3>Номер</h3>
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
  )
}

export default MembershipStep3
