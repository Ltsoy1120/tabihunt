import { DayHours, WorkingHours } from "@/models/common"
import {
  VoucherAnimalDto,
  VoucherDto,
  VoucherPriceType
} from "@/models/vouchers"

export function classMerge(
  ...classNames: Array<string | null | undefined>
): string {
  const space = " "
  return classNames.filter(Boolean).join(space)
}

export function parseDate(dateString: string): {
  currentYear: string
  currentMonth: string
  currentDay: string
} {
  const [year, month, day] = dateString.split("-")
  return { currentYear: year, currentMonth: month, currentDay: day }
}

export const calculateWidth = (index: number) => {
  // Инкрементируем индекс, так как в JavaScript индексы начинаются с 0
  // index++
  // Каждый второй и третий элемент в каждой паре начиная со второй пары должны иметь ширину 40%
  // Это можно сделать, проверяя, находится ли индекс элемента в первой или второй половине каждой четверки
  if (index % 4 === 2 || index % 4 === 3) {
    return "calc(40% - 15px)"
  } else {
    return "calc(60% - 15px)"
  }
}

export const getRegionIdFromPath = (pathname: string) => {
  const match = pathname.match(/\/regions\/([^\/]+)(\/|$)/)
  return match ? match[1] : null
}

// Функция, возвращающая строку с названиями животных через запятую
export const getAnimalNames = (animals: VoucherAnimalDto[]): string => {
  return animals.map(animal => animal.animal.name).join(", ")
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

  const daysOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ]

  const groups: { days: string[]; hours: DayHours }[] = []
  let currentGroup: { days: string[]; hours: DayHours } | null = null

  for (const day of daysOrder) {
    const time = hours[day]
    if (!time || (time.start === "00:00" && time.end === "00:00")) continue

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

  // Объединяем последовательные дни
  return groups
    .map(group => {
      const days =
        group.days.length > 1
          ? `${group.days[0]}-${group.days[group.days.length - 1]}`
          : group.days[0]
      return `${days}: ${group.hours.start} - ${group.hours.end}`
    })
    .join(", ")
}

// "2024-07-01T17:00:31.506126" | "2024-07-01" to 01.07.2024
export function formatDate(inputDate: string) {
  const date = new Date(inputDate)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // getMonth() возвращает месяцы с 0 по 11, поэтому добавляем 1
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

// 'Sun Sep 01 2024 08:47:40 GMT+0500 (Западный Казахстан)' to "2024-09-01"
export function getFormattedDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // Месяцы от 0 до 11, поэтому добавляем 1
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

// "01.09.2024" to "2024-09-01" с проверкой дней и месяцев
export const convertDateToISO = (date: string): string | null => {
  const dateParts = date.split(".")

  // Проверяем, что дата состоит из 3 частей: день, месяц, год
  if (dateParts.length === 3) {
    const [day, month, year] = dateParts

    // Преобразуем части в числа для проверки
    const dayNum = parseInt(day, 10)
    const monthNum = parseInt(month, 10)
    const yearNum = parseInt(year, 10)

    // Проверяем, что день, месяц и год содержат корректное количество символов
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      // Проверяем диапазон дня и месяца
      if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12) {
        return `${yearNum}-${String(monthNum).padStart(2, "0")}-${String(
          dayNum
        ).padStart(2, "0")}` // Форматируем в YYYY-MM-DD
      }
    }
  }

  return null // Возвращаем null, если формат или диапазон некорректный
}

export const hasEmptyValue = (data: any): boolean => {
  if (typeof data === "object" && data !== null) {
    return Object.values(data).some(value => hasEmptyValue(value))
  }
  return data === "" || data === 0 || data === undefined || data === null
}

export function declensionOfHeads(count: number): string {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} голов` // Для чисел от 11 до 19 — всегда "голов"
  }

  if (lastDigit === 1) {
    return `${count} голова` // Например, 1 голова
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} головы` // Например, 2, 3, 4 головы
  } else {
    return `${count} голов` // Например, 5 и более голов
  }
}

export const getAnimalPrice = (
  priceType: VoucherPriceType,
  animal: VoucherAnimalDto
) => {
  switch (priceType) {
    case VoucherPriceType.STANDARD:
      return animal.standardPrice
    case VoucherPriceType.MEMBERSHIP:
      return animal.membershipPrice
    case VoucherPriceType.PREFERENTIAL:
      return animal.preferentialPrice
    case VoucherPriceType.SPECIAL:
      return animal.specialPrice
    default:
      break
  }
}

export const getVoucherPrice = (
  priceType: VoucherPriceType,
  voucher: VoucherDto
) => {
  switch (priceType) {
    case VoucherPriceType.STANDARD:
      return voucher.standardPrice
    case VoucherPriceType.MEMBERSHIP:
      return voucher.membershipPrice
    case VoucherPriceType.PREFERENTIAL:
      return voucher.preferentialPrice
    case VoucherPriceType.SPECIAL:
      return voucher.specialPrice
    default:
      break
  }
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Удаляем все символы, кроме цифр
  const cleanedNumber = phoneNumber.replace(/[^\d]/g, "")

  // Оставляем "+7" в начале и остальные цифры без пробелов
  const formattedNumber = `+7${cleanedNumber.slice(1)}`

  return formattedNumber
}
