import { useParams } from "react-router-dom"
import { formatDate, formatPhone } from "../../../../helpers/common"
import { useAppDispatch, useAppSelector } from "../../../../store"
import "./style.scss"
import { useEffect } from "react"
import { getMeCompanyMembershipsById } from "../../../../store/actions/membershipsActions"

const MembershipStep5 = () => {
  const { newMembershipData } = useAppSelector(state => state.memberships)
  const { hunter, loading } = useAppSelector(state => state.hunters)
  const { meCompany } = useAppSelector(state => state.company)
  const { membershipId } = useParams()
  const dispatch = useAppDispatch()

  const identificationState = [
    {
      title: "ФИО",
      value: `${hunter?.lastname} ${hunter?.firstname} ${hunter?.patronymic}`
    },
    {
      title: "Дата Рождения",
      value: hunter?.dateOfBirth && formatDate(hunter?.dateOfBirth)
    },
    {
      title: "ИИН",
      value: hunter?.iin
    },
    {
      title: "Номер",
      value: hunter?.identificationNumber
    },
    {
      title: "Кем Выдан",
      value: hunter?.identificationIssuedBy
    },
    {
      title: "Годен до",
      value:
        hunter?.identificationValid && formatDate(hunter?.identificationValid)
    }
  ]

  const huntingLicenseState = [
    {
      title: "Номер",
      value: hunter?.huntingLicenseNumber
    },
    {
      title: "Выдано",
      value:
        hunter?.huntingLicenseIssued && formatDate(hunter?.huntingLicenseIssued)
    },
    {
      title: "Годен до",
      value:
        hunter?.huntingLicenseValid && formatDate(hunter?.huntingLicenseValid)
    }
  ]

  const hunterUserState = [
    {
      title: "Номер телефона",
      value: hunter?.user?.phoneNumber && formatPhone(hunter?.user?.phoneNumber)
    },
    {
      title: "Почта",
      value: hunter?.user?.email
    }
  ]

  const getPriceType = (priceType: string) => {
    switch (priceType) {
      case "STANDARD":
        return "Стандартная"
      case "MEMBERSHIP":
        return "Цена для члена общества"
      case "PREFERENTIAL":
        return "Льготная"
      case "SPECIAL":
        return "Специальная"
      default:
        break
    }
  }

  const getMembershipPrice = (priceType: string) => {
    switch (priceType) {
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

  const membershipState = [
    {
      title: "Срок",
      value: newMembershipData?.years && `${newMembershipData?.years} год`
    },
    {
      title: "Цена",
      value:
        newMembershipData?.priceType &&
        getPriceType(newMembershipData?.priceType)
    },
    {
      title: "К оплате",
      value:
        newMembershipData?.priceType &&
        getMembershipPrice(newMembershipData?.priceType)
    }
  ]

  useEffect(() => {
    membershipId && dispatch(getMeCompanyMembershipsById(membershipId))
  }, [membershipId])

  return (
    <div className="new-hunter-step6">
      <div className="block-wrapper">
        <h2>Удостоверение личности</h2>
        <div className="block">
          {loading
            ? ""
            : identificationState.map(item => (
                <div key={item.title} className="block__item">
                  <span>{item.title}</span>
                  <p>{item.value}</p>
                </div>
              ))}
        </div>
      </div>
      <div className="block-wrapper">
        <h2>Охотничье удостоверение</h2>
        <div className="block">
          {huntingLicenseState.map(item => (
            <div key={item.title} className="block__item">
              <span>{item.title}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="block-wrapper">
        <h2>Контактная информация</h2>
        <div className="block">
          {hunterUserState.map(item => (
            <div key={item.title} className="block__item">
              <span>{item.title}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      {newMembershipData && (
        <div className="block-wrapper">
          <h2>Членство</h2>
          <div className="block">
            {membershipState.map(item => (
              <div key={item.title} className="block__item">
                <span>{item.title}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MembershipStep5
