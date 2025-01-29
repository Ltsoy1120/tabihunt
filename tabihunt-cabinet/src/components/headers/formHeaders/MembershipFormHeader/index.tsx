import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../store"
import {
  createMeCompanyHunter,
  editMeCompanyHunter
} from "../../../../store/actions/hunterActions"
import {
  createMeCompanyMembership,
  renewMembership
} from "../../../../store/actions/membershipsActions"
import Button from "../../../UI/buttons/Button"
import TextButton from "../../../UI/buttons/TextButton"
import FormHeader from "../FormHeader"

const MembershipFormHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { membershipId } = useParams()
  const { hunter, newHunterData } = useAppSelector(state => state.hunters)
  const { newMembershipData, renewMembershipData } = useAppSelector(
    state => state.memberships
  )
  const steps = membershipId
    ? pathname.includes("hunter")
      ? [
          {
            path: `/edit-hunter-membership-step1/${membershipId}`,
            title: "ЭТАП 1"
          },
          {
            path: `/edit-hunter-membership-step2/${membershipId}`,
            title: "ЭТАП 2"
          },
          {
            path: `/edit-hunter-membership-step3/${membershipId}`,
            title: "ЭТАП 3"
          },
          {
            path: `/edit-hunter=membership-step4/${membershipId}`,
            title: "ЭТАП 4"
          }
        ]
      : [
          { path: `/renew-membership-step1/${membershipId}`, title: "ЭТАП 1" },
          { path: `/renew-membership-step2/${membershipId}`, title: "ЭТАП 2" }
        ]
    : [
        { path: "/new-membership-step1", title: "ЭТАП 1" },
        { path: "/new-membership-step2", title: "ЭТАП 2" },
        { path: "/new-membership-step3", title: "ЭТАП 3" },
        { path: "/new-membership-step4", title: "ЭТАП 4" },
        { path: "/new-membership-step5", title: "ЭТАП 5" }
      ]

  const hasDataStep1 =
    newHunterData?.firstname &&
    newHunterData.lastname &&
    newHunterData.dateOfBirth &&
    newHunterData?.user.phoneNumber &&
    newHunterData?.user.email

  const hasDataStep2 =
    newHunterData?.huntingLicenseNumber &&
    newHunterData?.huntingLicenseIssued &&
    newHunterData.huntingLicenseValid

  const hasDataStep3 = newHunterData?.iin

  const getFormButton = () => {
    switch (pathname) {
      case `/edit-hunter-membership-step1/${membershipId}`:
        if (hasDataStep1) {
          return (
            <Button
              onClick={() =>
                navigate(`/edit-hunter-membership-step2/${membershipId}`)
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case `/edit-hunter-membership-step2/${membershipId}`:
        if (hasDataStep2) {
          return (
            <Button
              onClick={() =>
                navigate(`/edit-hunter-membership-step3/${membershipId}`)
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case `/edit-hunter-membership-step3/${membershipId}`:
        if (hasDataStep3) {
          return (
            <Button
              onClick={() =>
                navigate(`/edit-hunter-membership-step4/${membershipId}`)
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case `/edit-hunter-membership-step4/${membershipId}`:
        return (
          <Button onClick={() => hunter && editHunter(hunter?.id)}>
            Сохранить
          </Button>
        )

      case `/renew-membership-step1/${membershipId}`:
        if (renewMembershipData && membershipId) {
          return (
            <Button
              onClick={() =>
                navigate(`/renew-membership-step2/${membershipId}`)
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case `/renew-membership-step2/${membershipId}`:
        return (
          <Button
            onClick={() => membershipId && renewMembershipHandler(membershipId)}
          >
            Сохранить
          </Button>
        )

      case "/new-membership-step1":
        if (hasDataStep1) {
          return (
            <Button onClick={() => navigate("/new-membership-step2")}>
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case "/new-membership-step2":
        if (hasDataStep1 && hasDataStep2) {
          return (
            <Button onClick={() => navigate("/new-membership-step3")}>
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case "/new-membership-step3":
        if (hasDataStep1 && hasDataStep2 && hasDataStep3) {
          return (
            <Button
              onClick={hunter ? () => editHunter(hunter.id) : createHunter}
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case "/new-membership-step4":
        if (newMembershipData && hunter?.id) {
          return (
            <Button onClick={() => navigate("/new-membership-step5")}>
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case "/new-membership-step5":
        return <Button onClick={createMembership}>Сохранить</Button>
      default:
        break
    }
  }

  const createHunter = async () => {
    if (newHunterData) {
      const result = await dispatch(createMeCompanyHunter(newHunterData))
      result && navigate("/new-membership-step4")
    }
  }

  const editHunter = async (hunterId: string) => {
    if (newHunterData) {
      const result = await dispatch(
        editMeCompanyHunter(newHunterData, hunterId)
      )
      result &&
        pathname.includes("/new-membership") &&
        navigate("/new-membership-step4")
      result &&
        pathname.includes("/edit-hunter-membership") &&
        navigate("/memberships")
    }
  }

  const renewMembershipHandler = async (membershipId: string) => {
    if (renewMembershipData) {
      const result = await dispatch(
        renewMembership(renewMembershipData, membershipId)
      )
      result && navigate("/memberships")
    }
  }

  const createMembership = async () => {
    if (newMembershipData && hunter) {
      const result = await dispatch(
        createMeCompanyMembership({
          ...newMembershipData,
          hunterId: hunter?.id
        })
      )
      result && navigate("/memberships")
    }
  }

  return (
    <FormHeader
      steps={steps}
      pathname={pathname}
      getFormButton={getFormButton}
    />
  )
}

export default MembershipFormHeader
