import { useEffect, useState } from "react"
import Empty from "../../../components/Empty"
import Button from "../../../components/UI/buttons/Button"
import { useAppDispatch, useAppSelector } from "../../../store"
import { getMeCompany } from "../../../store/actions/companyActions"
import { getMeCompanyMemberships } from "../../../store/actions/membershipsActions"
import { setHunter } from "../../../store/slices/huntersSlice"
import MembershipPrice from "../components/MembershipPrices"
import MembershipsInfo from "../components/MembershipsInfo"
import "./style.scss"

const Memberships = () => {
  const dispatch = useAppDispatch()
  const [activeBtn, setActiveBtn] = useState("memberships-list")
  const { memberships } = useAppSelector(state => state.memberships)

  useEffect(() => {
    dispatch(getMeCompany())
    dispatch(getMeCompanyMemberships())
    dispatch(setHunter(null))
  }, [dispatch])

  return (
    <>
      {memberships ? (
        <div className="memberships">
          <div className="memberships__actions">
            <Button
              className={activeBtn === "memberships-list" ? "active" : ""}
              onClick={() => setActiveBtn("memberships-list")}
            >
              Список членов
            </Button>
            <Button
              className={activeBtn === "memberships-prices" ? "active" : ""}
              onClick={() => setActiveBtn("memberships-prices")}
            >
              Цены продления членства
            </Button>
          </div>

          {activeBtn === "memberships-list" && <MembershipsInfo />}
          {activeBtn === "memberships-prices" && <MembershipPrice />}
        </div>
      ) : (
        <Empty />
      )}
    </>
  )
}

export default Memberships
