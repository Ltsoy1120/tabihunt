import InputMask from "@mona-health/react-input-mask"
import Icon from "../../../../components/UI/Icon"
import usePlotDescriptionState from "../../../../hooks/usePlotDescriptionState"
import "./style.scss"

const weekdayOptions = [
  { value: "monday", title: "Понедельник" },
  { value: "tuesday", title: "Вторник" },
  { value: "wednesday", title: "Среда" },
  { value: "thursday", title: "Четверг" },
  { value: "friday", title: "Пятница" },
  { value: "saturday", title: "Суббота" },
  { value: "sunday", title: "Воскресенье" }
]
const PlotDescriptionStep2 = () => {
  const [state, setState] = usePlotDescriptionState()

  const handleWorkingTimeChange = (
    day: string,
    field: "start" | "end",
    value: string
  ) => {
    setState(prevState => ({
      ...prevState,
      workingHours: {
        ...prevState.workingHours,
        [day]: {
          ...prevState.workingHours[day],
          [field]: value
        }
      }
    }))
  }
  const onClickWorkingDayElement = (day:string) => {
    state.workingHours[day].start ==="00:00"?setState(prevState => ({
      ...prevState,
      workingHours: {
        ...prevState.workingHours,
        [day]: {
          ...prevState.workingHours[day],
          start: "01:00",
          end: "02:00"
        }
      }
    })):setState(prevState => ({
      ...prevState,
      workingHours: {
        ...prevState.workingHours,
        [day]: {
          ...prevState.workingHours[day],
          start: "00:00",
          end:"00:00"
        }
      }
    }))
  }

  return (
    <div className="new-plot-description-step2">
      <h2>Время работы</h2>
      <div className="new-plot-description-step2__form">
        <div className="new-plot-description-step2__form-item">
          <h3>День недели</h3>
          {weekdayOptions.map((day) =>
            <div className={state.workingHours[day.value].start !=="00:00"?"weekday working": "weekday"} onClick={() => onClickWorkingDayElement(day.value)} key={day.value}>
            <h5>{day.title}</h5>
            {
              state.workingHours[day.value].start!=="00:00"?<Icon name="ok" size={18} />:
              <span className="empty-circle"></span>
            }
          </div>
          )}
        </div>
        <div className="new-plot-description-step2__form-item">
          <h3>Часы работы</h3>
          {weekdayOptions.map(day => (
            <div className="working-hours" key={day.value}>
              с{" "}
              <InputMask
                mask="99:99"
                value={state.workingHours[day.value].start}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleWorkingTimeChange(day.value, "start", e.target.value)
                }
              />
              по{" "}
              <InputMask
                mask="99:99"
                value={state.workingHours[day.value].end}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleWorkingTimeChange(day.value, "end", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlotDescriptionStep2
