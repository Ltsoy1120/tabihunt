import EditButton from "../../../../components/UI/buttons/EditButton"
import { useAppSelector } from "../../../../store"
import "./style.scss"
import { useNavigate } from "react-router-dom";

const MembershipPrice = () => {
  const { meCompany } = useAppSelector(state => state.company)
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/settings-membership-prices-step1');
  };

  const membershipsPricesState = [
    {
      title: "Стандартная",
      value: meCompany?.membershipStandardPrice
    },
    {
      title: "Член охотничьего общества",
      value: meCompany?.membershipMembershipPrice
    },
    {
      title: "Льготная",
      value: meCompany?.membershipPreferentialPrice
    },
    {
      title: "Специальная",
      value: meCompany?.membershipSpecialPrice
    }
  ]

  return (
    <div className="membership-prices">
      <div className="membership-prices__head">
        <h2>Цены продления членства</h2>
        <EditButton onClick={handleEditClick} />
      </div>
      <div className="membership-prices__info">
        {membershipsPricesState.map(item => (
          <div key={item.title} className="membership-prices__info-item">
            <span>{item.title}</span>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MembershipPrice
