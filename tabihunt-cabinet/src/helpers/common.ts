import { Option } from "../components/UI/Select"
import { HunterDto } from "../models/hunters"
import { HuntsmanDto } from "../models/huntsmen"
import { DayHours, PlotDto, WorkingHours } from "../models/plots"

export function classMerge(
  ...classNames: Array<string | null | undefined>
): string {
  const space = " "
  return classNames.filter(Boolean).join(space)
}
// "2024-07-01T17:00:31.506126" | "2024-07-01" to 01.07.2024
export function formatDate(inputDate: string) {
  const date = new Date(inputDate)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // getMonth() возвращает месяцы с 0 по 11, поэтому добавляем 1
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export function formatDateWithAddedYear(
  dateTimeString: string,
  yearsToAdd: number
) {
  const date = new Date(dateTimeString)

  // Add the specified number of years
  date.setFullYear(date.getFullYear() + yearsToAdd)

  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString()

  return `${day}.${month}.${year}`
}

export function parseDate(dateString: string): {
  currentYear: string
  currentMonth: string
  currentDay: string
} {
  const [year, month, day] = dateString.split("-")
  return { currentYear: year, currentMonth: month, currentDay: day }
}

// +77777777777 to +7 777 777 77 77
export function formatPhone(phone: string) {
  const part1 = phone.slice(2, 5) // 777
  const part2 = phone.slice(5, 8) // 777
  const part3 = phone.slice(8, 10) // 77
  const part4 = phone.slice(10, 12) // 77

  // Собираем номер в нужном формате
  return `+7 ${part1} ${part2} ${part3} ${part4} `
}

export function convertToISO(dateString: string) {
  // Parse the input date string
  const date = new Date(dateString)

  // Set the time to a specific value (e.g., current time or midnight)
  const now = new Date()
  date.setHours(now.getUTCHours())
  date.setMinutes(now.getUTCMinutes())
  date.setSeconds(now.getUTCSeconds())
  date.setMilliseconds(now.getUTCMilliseconds())

  // Return the date in ISO 8601 format
  return date.toISOString()
}

export const getPlotById = (plotId: string, plots: PlotDto[]) => {
  return plots.find(plot => plot.id === plotId)
}

export const getPlotsOptions = (plots: PlotDto[]): Option[] => {
  const plotsOption =
    plots &&
    plots?.map(plot => ({
      value: plot.id,
      title: plot.name
    }))
  return plotsOption
}

export const hasEmptyValue = (data: any): boolean => {
  if (typeof data === "object" && data !== null) {
    return Object.values(data).some(value => hasEmptyValue(value))
  }
  return data === "" || data === undefined || data === null
}

export const getHuntsmanFullName = (man: HuntsmanDto | HunterDto) => {
  return `${man.lastname} ${man.firstname} ${man.patronymic}`
}

export function getHuntsmanDeclension(count: number): string {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} егерей`
  }

  switch (lastDigit) {
    case 1:
      return `${count} егерь`
    case 2:
    case 3:
    case 4:
      return `${count} егеря`
    default:
      return `${count} егерей`
  }
}

export const groupWorkingHours = (hours: WorkingHours): string => {
  const weekdayNames: { [key: string]: string } = {
    monday: "пн",
    tuesday: "вт",
    wednesday: "ср",
    thursday: "чт",
    friday: "пт",
    saturday: "сб",
    sunday: "вс"
  }

  const groups: { days: string[]; hours: DayHours }[] = []
  let currentGroup: { days: string[]; hours: DayHours } | null = null

  for (const [day, time] of Object.entries(hours)) {
    if (time.start === "00:00" && time.end === "00:00") continue

    if (
      currentGroup === null ||
      (currentGroup.hours.start === time.start &&
        currentGroup.hours.end === time.end)
    ) {
      if (currentGroup === null) {
        currentGroup = { days: [weekdayNames[day]], hours: time }
      } else {
        currentGroup.days.push(weekdayNames[day])
      }
    } else {
      groups.push(currentGroup)
      currentGroup = { days: [weekdayNames[day]], hours: time }
    }
  }

  if (currentGroup !== null) {
    groups.push(currentGroup)
  }

  return groups
    .map(group => {
      const days = group.days.join("-")
      return `${days}: ${group.hours.start} - ${group.hours.end}`
    })
    .join(", ")
}
