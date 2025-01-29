import "./style.scss"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import MembershipCard from "../../components/MembershipCard"
import MembershipsList from "../../components/MembershipsList"
import YearModal from "../../../../components/modals/YearModal"
import Button from "../../../../components/UI/buttons/Button"
import TextButton from "../../../../components/UI/buttons/TextButton"
import Input from "../../../../components/UI/Input"
import Loader from "../../../../components/UI/loaders/Loader"
import { MembershipDto } from "../../../../models/memberships"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { getExportMembership, getMeCompanyMemberships } from "../../../../store/actions/membershipsActions"
import MembershipModal from "../../../../components/modals/MembershipModal"



const MembershipsInfo = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { meCompany } = useAppSelector(state => state.company)
  const { memberships, loading } = useAppSelector(state => state.memberships)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [searchMembership, setSearchMembership] = useState("")
  const [selectedMembership, setSelectedMembership] = useState<MembershipDto>()
  const [isOpenModal, setOpenModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)


  useEffect(() => {
    dispatch(
      getMeCompanyMemberships({
        ...(searchMembership && { fullname: searchMembership }),
        ...(selectedYear && { year: Number(selectedYear) })
      })
    )
  }, [searchMembership])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMembership(event.target.value)
  }

  const handleClick = (membership: MembershipDto) => {
    setSelectedMembership(membership)
  }

  const exportDataMemberships = () => {
    dispatch(getExportMembership({
      ...(searchMembership && { fullname: searchMembership }),
      ...(selectedYear && { year: Number(selectedYear) })
    }))
  }

  const hasMembershipsPrices =
    meCompany?.membershipMembershipPrice &&
    meCompany.membershipPreferentialPrice &&
    meCompany.membershipSpecialPrice &&
    meCompany.membershipStandardPrice

  return (
    <>
      {isOpenModal && (
        <YearModal
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          close={() => setOpenModal(false)}
        />
      )}
      {openCreateModal && (
        <MembershipModal close={() => setOpenCreateModal(false)} onCreateMembership={() => navigate("/new-membership-step1")}/>
      )}
      {hasMembershipsPrices ? (
        <div className="memberships__wrappers">
          <div className="memberships-info">
            <div className="memberships-info__head">
              <TextButton
                endIcon="arrow-down"
                onClick={() => setOpenModal(true)}
              >
                {selectedYear ? `Членства в ${selectedYear}` : "За все время"}
              </TextButton>
              <div className="memberships-info__btnGroup">
              <Button
              className="membershipsExportBtn"
                onClick={exportDataMemberships}
              >
                Экспорт
              </Button>
              <Button
                endIcon="plus"
                onClick={() => setOpenCreateModal(true)}
              >
                Добавить
              </Button>
              </div>
            </div>

            <Input
              placeholder="Поиск члена по ФИО или по Охот. Удостоверению"
              value={searchMembership}
              onChange={handleChange}
              endIcon="search"
            />
            {!loading ? (
              <>
                {memberships.length > 0 ? (
                  <MembershipsList
                    memberships={memberships}
                    selectedYear={selectedYear}
                    selectedMembership={selectedMembership}
                    handleClick={handleClick}
                  />
                ) : (
                  <div>нет членов</div>
                )}
              </>
            ) : (
              <Loader />
            )}
          </div>
          {selectedMembership && (
            <MembershipCard membership={selectedMembership} />
          )}
        </div>
      ) : (
        <div className="not-membership-prices">
          <p>
            Цены для продления членства в охотничьем обществе не настроены.
            Пожалуйста, установите их.
          </p>
          <Button>Настроить цены</Button>
        </div>
      )}
    </>
  )
}

export default MembershipsInfo
