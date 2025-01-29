"use client"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import Select, { Option } from "../UI/Select"
import "./style.scss"

const LangSelect = () => {
  const { i18n } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const currentPathname = usePathname()
  const langOptions = [
    { value: "kk", title: "Қазақ тілі" },
    { value: "ru", title: "Русский язык" }
  ]
  const currentLocale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale

  const [lang, setLang] = useState({
    value: currentLocale,
    title: currentLocale === "ru" ? "Русский язык" : "Қазақ тілі"
  })

  const handleLangSelect = (option: Option) => {
    setLang(option)
    const newLocale = option.value

    // Путь, который нужно заменить
    let newPathname = currentPathname

    // Если текущий путь начинается с текущей локали, заменяем её
    if (currentPathname.startsWith(`/${currentLocale}`)) {
      newPathname = currentPathname.replace(
        `/${currentLocale}`,
        `/${newLocale}`
      )
    } else {
      // Если текущая локаль не найдена в пути, просто добавляем новую локаль
      newPathname = `/${newLocale}${currentPathname}`
    }

    // Обновляем маршрут
    router.push(newPathname)
    router.refresh()
  }

  return (
    <div className="lang-select">
      <Select
        options={langOptions}
        selected={lang}
        onChange={handleLangSelect}
      />
    </div>
  )
}

export default LangSelect
