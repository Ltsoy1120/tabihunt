import { useRef, useState, useEffect } from "react"
import { Option } from "../../../../components/UI/Select"
import { classMerge } from "../../../../helpers/common"
import { CompanyDto } from "../../../../models/companies"

interface SelectProps {
  meCompany: CompanyDto
  options: Option[]
  selected: Option
  onChange?: (option: Option, name?: string) => void
}

const PriceTypeSelect = ({
  meCompany,
  options,
  selected,
  onChange
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const rootRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && setIsOpen(false)
      }
    }
    window.addEventListener("click", handleClick)

    return () => {
      window.addEventListener("click", handleClick)
    }
  }, [isOpen])

  const handleSelectClick = () => {
    setIsOpen(prev => !prev)
  }

  const handleOptionClick = (option: Option) => {
    setIsOpen(false)
    onChange?.(option, "priceType")
  }

  const getPrice = (value: string, meCompany: CompanyDto) => {
    switch (value) {
      case "STANDARD":
        return meCompany?.membershipStandardPrice
      case "MEMBERSHIP":
        return meCompany?.membershipMembershipPrice
      case "PREFERENTIAL":
        return meCompany?.membershipPreferentialPrice
      case "SPECIAL":
        return meCompany?.membershipSpecialPrice
      default:
        break
    }
  }

  return (
    <div className="select">
      <button
        ref={rootRef}
        className={classMerge("dropdown__button", isOpen ? "open" : "")}
        onClick={handleSelectClick}
      >
        {selected.title}
      </button>
      {isOpen && (
        <ul className="dropdown__list">
          {options.map(option => (
            <li
              key={option.value}
              className="dropdown__list-item"
              onClick={() => handleOptionClick(option)}
            >
              {option.title}
              {meCompany && <span>{getPrice(option.value, meCompany)} ₸</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PriceTypeSelect
