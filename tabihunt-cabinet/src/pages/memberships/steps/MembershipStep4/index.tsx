import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Select, { Option } from "../../../../components/UI/Select"
import { CompanyDto } from "../../../../models/companies"
import { MembershipData } from "../../../../models/memberships"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { getMeCompany } from "../../../../store/actions/companyActions"
import { getMeCompanyMembershipsById } from "../../../../store/actions/membershipsActions"
import {
  setNewMembershipData,
  setRenewMembershipData
} from "../../../../store/slices/membershipsSlice"
import PriceTypeSelect from "../../components/PriceTypeSelect"
import "./style.scss"

const yearsOptions = [
  { value: "1", title: "1 год" },
  { value: "2", title: "2 года" },
  { value: "3", title: "3 года" }
]

const priceTypeOptions = [
  { value: "STANDARD", title: "Стандартная" },
  { value: "MEMBERSHIP", title: "Цена для члена общества" },
  { value: "PREFERENTIAL", title: "Льготная" },
  { value: "SPECIAL", title: "Специальная" }
]

const MembershipStep4 = () => {
  const dispatch = useAppDispatch()
  const { membershipId } = useParams()
  const { newMembershipData } = useAppSelector(state => state.memberships)
  const [state, setState] = useState<MembershipData>({
    hunterId: newMembershipData?.hunterId ?? "",
    priceType: newMembershipData?.priceType ?? "",
    years: newMembershipData?.years ?? 0
  })
  const { meCompany } = useAppSelector(state => state.company)

  useEffect(() => {
    membershipId && dispatch(getMeCompanyMembershipsById(membershipId))
  }, [membershipId])

  useEffect(() => {
    !meCompany && dispatch(getMeCompany())
  }, [meCompany])

  useEffect(() => {
    if (membershipId) {
      dispatch(
        setRenewMembershipData({
          priceType: state?.priceType,
          years: state?.years
        })
      )
    }
    dispatch(setNewMembershipData(state))
  }, [state, membershipId])

  const selectHandleChange = (option: Option, name?: string) => {
    if (name) {
      setState(prevState => ({
        ...prevState,
        [name]: option.value
      }))
    }
  }

  return (
    <div className="new-hunter-step5">
      <h2>Членство</h2>

      <div className="form">
        <h3>Срок</h3>
        <Select
          options={yearsOptions}
          selected={
            yearsOptions.find(
              option => option.value === String(state.years)
            ) || {
              value: "",
              title: "Выберите из списка"
            }
          }
          name="years"
          label="Выберите из списка"
          onChange={selectHandleChange}
        />
        <h3>Цена</h3>
        <PriceTypeSelect
          meCompany={meCompany as CompanyDto}
          options={priceTypeOptions}
          selected={
            priceTypeOptions.find(
              option => option.value === state.priceType
            ) || { value: "", title: "Выберите из списка" }
          }
          onChange={selectHandleChange}
        />
      </div>
    </div>
  )
}

export default MembershipStep4
