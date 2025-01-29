import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { HunterData } from "@/models/hunter"
import { setNewHunterData } from "@/store/slices/huntersSlice"

const useAccountState = () => {
  const dispatch = useAppDispatch()
  const { me, newHunterData } = useAppSelector(state => state.hunters)
  const { registerData } = useAppSelector(state => state.auth)

  const [state, setState] = useState<HunterData>({
    phoneNumber:
      registerData?.phoneNumber ??
      newHunterData?.phoneNumber ??
      me?.user.phoneNumber ??
      "",
    email: registerData?.email ?? me?.user.email ?? "",
    password: registerData?.password ?? "",
    otp: registerData?.otp ?? "",
    firstname: newHunterData?.firstname ?? me?.firstname ?? "",
    lastname: newHunterData?.lastname ?? me?.lastname ?? "",
    patronymic: newHunterData?.patronymic ?? me?.patronymic ?? "",
    dateOfBirth: newHunterData?.dateOfBirth ?? me?.dateOfBirth ?? "",
    gender: newHunterData?.gender ?? me?.gender ?? "MALE",
    iin: newHunterData?.iin ?? me?.iin ?? "",
    address: {
      regionId:
        newHunterData?.address.regionId ??
        me?.address.region.id ??
        "518fd3e8-5b63-4b63-b0a9-000000000001",
      city: newHunterData?.address.city ?? me?.address.city ?? "",
      street: newHunterData?.address.street ?? me?.address.street ?? "",
      houseNumber:
        newHunterData?.address.houseNumber ?? me?.address.houseNumber ?? "",
      flatNumber:
        newHunterData?.address.flatNumber ?? me?.address.flatNumber ?? ""
    },
    identificationNumber:
      newHunterData?.identificationNumber ?? me?.identificationNumber ?? "",
    identificationIssued:
      newHunterData?.identificationIssued ?? me?.identificationIssued ?? "",
    identificationValid:
      newHunterData?.identificationValid ?? me?.identificationValid ?? "",
    identificationIssuedBy:
      newHunterData?.identificationIssuedBy ?? me?.identificationIssuedBy ?? "",
    huntingLicenseNumber:
      newHunterData?.huntingLicenseNumber ?? me?.huntingLicenseNumber ?? "",
    huntingLicenseIssued:
      newHunterData?.huntingLicenseIssued ?? me?.huntingLicenseIssued ?? "",
    huntingLicenseValid:
      newHunterData?.huntingLicenseValid ?? me?.huntingLicenseValid ?? ""
  })

  console.log("me", me)
  console.log("newHunterData", newHunterData)
  console.log("registerData", registerData)
  console.log("phoneNumber", state.phoneNumber)
  console.log("email", state.email)

  useEffect(() => {
    dispatch(setNewHunterData(state))
  }, [state, dispatch])

  return [state, setState] as const
}

export default useAccountState
