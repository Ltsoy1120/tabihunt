import { useRef, useState, useEffect } from "react"
import { classMerge } from "../../../helpers/common"
import Icon from "../Icon"
import "./style.scss"

interface SelectProps {
  options: Option[]
  selected: Option
  label?: string
  name?: string
  onChange?: (option: Option, name?: string) => void
}

export interface Option {
  value: string
  title: string
}

const Select = ({ options, label, name, selected, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDropUp, setIsDropUp] = useState<boolean>(false)
  const rootRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && setIsOpen(false)
      }
    }
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - dropdownRect.bottom
      const spaceAbove = dropdownRect.top

      if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
        setIsDropUp(true)
      } else {
        setIsDropUp(false)
      }
    }
  }, [isOpen])

  const handleSelectClick = () => {
    setIsOpen(prev => !prev)
  }

  const handleOptionClick = (option: Option) => {
    setIsOpen(false)
    onChange?.(option, name)
  }

  return (
    <div className="select">
      <button
        ref={rootRef}
        className={classMerge("dropdown__button", isOpen ? "open" : "")}
        onClick={handleSelectClick}
      >
        <p>{selected.title ? selected.title : label}</p>
        {isOpen ? (
          <Icon name="arrow-up" size={16} />
        ) : (
          <Icon name="arrow-down" size={12} />
        )}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={classMerge(
            "dropdown__list-wrapper",
            isDropUp ? "drop-up" : "drop-down"
          )}
        >
          <ul className="dropdown__list">
            {options.map(option => (
              <li
                key={option.value}
                className="dropdown__list-item"
                onClick={() => handleOptionClick(option)}
              >
                {option.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Select
