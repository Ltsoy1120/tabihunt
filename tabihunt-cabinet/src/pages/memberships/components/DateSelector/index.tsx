import { useEffect, useState } from "react"
import Select, { Option } from "../../../../components/UI/Select"
import { parseDate } from "../../../../helpers/common"
import "./style.scss"

interface DateSelectorProps {
  currentDate?: string
  dateHandler: (year: string, month: string, day: string) => void
  startOffset: number
  endOffset: number
}

const DateSelector = ({
  currentDate,
  startOffset,
  endOffset,
  dateHandler
}: DateSelectorProps) => {
  const { currentYear, currentMonth, currentDay } = currentDate
    ? parseDate(currentDate)
    : { currentYear: "", currentMonth: "", currentDay: "" }

  const [day, setDay] = useState<Option>({
    value: currentDay ?? "",
    title: currentDay ?? "День"
  })
  const [month, setMonth] = useState<Option>({
    value: currentMonth ?? "",
    title: currentMonth ?? "Месяц"
  })
  const [year, setYear] = useState<Option>({
    value: currentYear ?? "",
    title: currentYear ?? "Год"
  })

  useEffect(() => {
    if (currentDay && currentMonth && currentYear) {
      setDay({
        value: currentDay,
        title: currentDay
      })
      setMonth({
        value: currentMonth,
        title: currentMonth
      })
      setYear({
        value: currentYear,
        title: currentYear
      })
    }
  }, [currentYear, currentMonth, currentDay])

  useEffect(() => {
    if (day.value && month.value && year.value) {
      dateHandler(year.value, month.value, day.value)
    }
  }, [day, month, year])

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString().padStart(2, "0"),
    title: (i + 1).toString().padStart(2, "0")
  }))

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString().padStart(2, "0"),
    title: (i + 1).toString().padStart(2, "0")
  }))

  const generateYearOptions = (
    startOffset: number,
    endOffset: number
  ): Option[] => {
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - startOffset
    const endYear = currentYear + endOffset

    const yearOptions: Option[] = []

    for (let year = startYear; year <= endYear; year++) {
      yearOptions.push({
        value: year.toString(),
        title: year.toString()
      })
    }

    return yearOptions
  }

  const years = generateYearOptions(startOffset, endOffset)

  return (
    <div className="date-selector">
      <Select options={days} selected={day} label="День" onChange={setDay} />
      <Select
        options={months}
        selected={month}
        label="Месяц"
        onChange={setMonth}
      />
      <Select options={years} selected={year} label="Год" onChange={setYear} />
    </div>
  )
}

export default DateSelector
