import { useRef, useState, useEffect } from "react"
import { classMerge } from "../../../../helpers/common"
import { Option } from "../../../../components/UI/Select"
import "./style.scss"
import Icon from "../../../../components/UI/Icon"

interface MutipleSelectProps {
  options: Option[]
  selected: Option[]
  label?: string
  name?: string
  onChange?: (selectedOptions: Option[], name?: string) => void
}

const MutipleSelect = ({
  options,
  label,
  name,
  selected,
  onChange
}: MutipleSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event
      if (rootRef.current && !rootRef.current.contains(target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])

  const handleSelectClick = () => {
    setIsOpen(prev => !prev)
  }

  const handleOptionClick = (option: Option) => {
    const isSelected = selected.some(
      selectedOption => selectedOption.value === option.value
    )

    const updatedSelected = isSelected
      ? selected.filter(selectedOption => selectedOption.value !== option.value)
      : [...selected, option]

    onChange?.(updatedSelected, name)
  }

  return (
    <div className="multiple-select" ref={rootRef}>
      <button
        className={classMerge("dropdown__button", isOpen ? "open" : "")}
        onClick={handleSelectClick}
      >
        {selected.length > 0
          ? selected.map(opt => opt.title).join(", ")
          : label}
      </button>
      {isOpen && (
        <ul className="dropdown__list">
          {options.map(option => (
            <li
              key={option.value}
              className={classMerge(
                "dropdown__list-item",
                selected.some(
                  selectedOption => selectedOption.value === option.value
                )
                  ? "selected"
                  : ""
              )}
              onClick={e => {
                e.stopPropagation()
                handleOptionClick(option)
              }}
            >
              {option.title}
              {selected.some(
                selectedOption => selectedOption.value === option.value
              ) ? (
                <Icon name="ok" size={18} />
              ) : (
                <span className="empty-circle"></span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MutipleSelect
