import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import Select, { Option } from "../UI/Select"
import { setLanguage } from "../../store/slices/authSlice"

const LangSelect = () => {
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const langOptions = [
    { value: "kz", title: "Қазақ тілі" },
    { value: "ru", title: "Русский язык" }
  ]

  const [lang, setLang] = useState({
    value: i18n.language,
    title: i18n.language === "ru" ? "Русский язык" : "Қазақ тілі"
  })

  const handleLangSelect = (option: Option) => {
    setLang(option)
    i18n.changeLanguage(option.value)
    dispatch(setLanguage(option.value))
  }

  return (
    <Select options={langOptions} selected={lang} onChange={handleLangSelect} />
  )
}

export default LangSelect
