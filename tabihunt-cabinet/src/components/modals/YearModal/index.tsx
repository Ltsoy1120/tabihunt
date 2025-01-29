import { Dispatch, SetStateAction } from "react"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface PlotsModalProps {
  selectedYear: string | null
  setSelectedYear: Dispatch<SetStateAction<string | null>>
  close: () => void
}

const YearModal = ({
  selectedYear,
  setSelectedYear,
  close
}: PlotsModalProps) => {
  const years = ["2021", "2022", "2023", "2024"]
  return (
    <Modal size={"360px"} close={close}>
      <div className="plots-modal">
        <h2 className="plots-modal__title">Участки</h2>
        <div className="plots-modal__list">
          <Radio
            label={"Все года"}
            checked={!selectedYear}
            onChangeHandler={() => setSelectedYear(null)}
          />
          {years.map(year => (
            <Radio
              key={year}
              label={year}
              checked={year === selectedYear}
              onChangeHandler={() => setSelectedYear(year)}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default YearModal
