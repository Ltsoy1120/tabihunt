import { ChecklistDto } from "../../models/companies"
import SectionCard from "./SectinCard"
import "./style.scss"

interface EmptyProps {
  checkList: ChecklistDto
}

const sections = [
  {
    title: "Лимиты",
    text: "Заполнив этот раздел вы сможете создать путевку."
  },
  {
    title: "Егеря",
    text: "Добавьте сотрудников которые работают у вас."
  },
  {
    title: "Путевки",
    text: "Создайте путевки которые планируете продавать."
  }
]

const CheckList = ({ checkList }: EmptyProps) => {
  return (
    <div className="check-list">
      <h1>Добро пожаловать!</h1>
      <p className="check-list__text">
        Чтобы начать пользовать ресурсом заполните следующие разделы
      </p>
      {sections.map((section, index) => (
        <SectionCard key={index} section={section} checkList={checkList} />
      ))}
    </div>
  )
}

export default CheckList
