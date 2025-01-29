import Input from "../../../../components/UI/Input"
import { validateNumber } from "../../../../helpers/validate"
import useMembershipState from "../../../../hooks/useMembershipState"
import { HunterData } from "../../../../models/hunters"
import DateSelector from "../../components/DateSelector"
import "./style.scss"

export interface ErrorType {
  isInvalid: boolean
  message: string
}

const MembershipStep2 = () => {
  // const { hunter } = useAppSelector(state => state.hunters)
  const [state, setState] = useMembershipState()

  // useEffect(() => {
  //   if (hunter) {
  //     setState(prev => ({
  //       ...prev,
  //       huntingLicenseNumber: hunter?.huntingLicenseNumber,
  //       huntingLicenseIssued: hunter?.huntingLicenseIssued,
  //       huntingLicenseValid: hunter?.huntingLicenseValid
  //     }))
  //   }
  // }, [hunter])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === "huntingLicenseNumber" && !validateNumber(value)) {
      return
    }
    setState(prevState => ({ ...prevState, [name]: value }))
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

  return (
    <div className="new-hunter-step2">
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
  )
}

export default MembershipStep2
