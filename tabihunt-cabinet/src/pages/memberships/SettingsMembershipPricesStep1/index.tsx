import { useEffect, useState } from "react"
import Input from "../../../components/UI/Input"
import { UpdateCurrentCompanyData } from "../../../models/companies"
import { useAppDispatch, useAppSelector } from "../../../store"
import { setMembershipPrice } from "../../../store/slices/companySlice"
import "./style.scss"

const SettingsMembershipPricesStep1 = () => {
  const dispatch = useAppDispatch()
  const { membershipPrice, meCompany } = useAppSelector(state => state.company)
  const [price, setPrice] = useState<UpdateCurrentCompanyData>({
    membershipStandardPrice: (meCompany?.membershipStandardPrice ??
      membershipPrice?.membershipStandardPrice ??
      0) as number,
    membershipMembershipPrice: (meCompany?.membershipMembershipPrice ??
      membershipPrice?.membershipMembershipPrice ??
      0) as number,
    membershipPreferentialPrice: (meCompany?.membershipPreferentialPrice ??
      membershipPrice?.membershipPreferentialPrice ??
      0) as number,
    membershipSpecialPrice: (meCompany?.membershipSpecialPrice ??
      membershipPrice?.membershipSpecialPrice ??
      0) as number
  })

  useEffect(() => {
    dispatch(setMembershipPrice(price))
  }, [price])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPrice(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <div className="settings-membership-prices-step1">
      <h2>Формирование цен</h2>

      <div className="form">
        <h3>Стандартная цена</h3>
        <Input
          placeholder="Обязательно"
          name="membershipStandardPrice"
          type="number"
          value={
            price.membershipStandardPrice
              ? String(price.membershipStandardPrice)
              : ""
          }
          onChange={handleChange}
          endIcon="tenge"
        />
        <h3>Цена для члена общества</h3>
        <Input
          placeholder="Обязательно"
          name="membershipMembershipPrice"
          type="number"
          value={
            price.membershipMembershipPrice
              ? String(price.membershipMembershipPrice)
              : ""
          }
          onChange={handleChange}
          endIcon="tenge"
        />
        <h3>Льготная</h3>
        <Input
          placeholder="Обязательно"
          name="membershipPreferentialPrice"
          type="number"
          value={
            price.membershipPreferentialPrice
              ? String(price.membershipPreferentialPrice)
              : ""
          }
          onChange={handleChange}
          endIcon="tenge"
        />
        <h3>Специальная</h3>
        <Input
          placeholder="Обязательно"
          name="membershipSpecialPrice"
          type="number"
          value={
            price.membershipSpecialPrice
              ? String(price.membershipSpecialPrice)
              : ""
          }
          onChange={handleChange}
          endIcon="tenge"
        />
      </div>
    </div>
  )
}

export default SettingsMembershipPricesStep1
