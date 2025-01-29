import { useAppSelector } from "../../../store"
import "./style.scss"

const SettingsMembershipPricesStep2 = () => {
  const { membershipPrice, meCompany } = useAppSelector(state => state.company)

  const membershipsPricesState = [
    {
      title: "Стандартная",
      value:
        membershipPrice?.membershipStandardPrice ??
        meCompany?.membershipStandardPrice
    },
    {
      title: "Член охотничьего общества",
      value:
        membershipPrice?.membershipMembershipPrice ??
        meCompany?.membershipMembershipPrice
    },
    {
      title: "Льготная",
      value:
        membershipPrice?.membershipPreferentialPrice ??
        meCompany?.membershipPreferentialPrice
    },
    {
      title: "Специальная",
      value:
        membershipPrice?.membershipSpecialPrice ??
        meCompany?.membershipSpecialPrice
    }
  ]

  return (
    <div className="settings-membership-prices-step2">
      <h2>Цена продления членства</h2>
      <div className="block">
        {membershipsPricesState.map(item => (
          <div key={item.title} className="block__item">
            <span>{item.title}</span>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingsMembershipPricesStep2
