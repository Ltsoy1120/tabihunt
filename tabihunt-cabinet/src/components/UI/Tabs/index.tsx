import { Dispatch, SetStateAction } from "react"
import Button from "../buttons/Button"
import "./style.scss"

interface TabsProps {
  optionTabs: { value: string; title: string }[]
  activeTab: string
  activeContent?: React.ReactNode
  setActiveTab: Dispatch<SetStateAction<string>>
}

const Tabs = ({
  optionTabs,
  activeTab,
  activeContent,
  setActiveTab
}: TabsProps) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="tabs">
      <div className="tabs__btns">
        {optionTabs.map(tab => (
          <Button
            key={tab.value}
            className={activeTab === tab.value ? "active" : ""}
            disabled={activeTab === tab.value}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.title}
          </Button>
        ))}
      </div>
      {activeContent && <div className="tab__content">{activeContent}</div>}
    </div>
  )
}

export default Tabs
