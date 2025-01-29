import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { getMeCompanyMembershipsById } from "../store/actions/membershipsActions"
import { setNewHunterData } from "../store/slices/huntersSlice"
import { HunterData } from "../models/hunters"

const usePurchaseVoucherUserState = () => {
  const dispatch = useAppDispatch()
  const { membershipId } = useParams()

  const { hunter, newHunterData } = useAppSelector(state => state.hunters)

  const [state, setState] = useState<HunterData>({
    user: {
      email: newHunterData?.user?.email ?? hunter?.user.email ?? "",
      phoneNumber:
        newHunterData?.user?.phoneNumber ?? hunter?.user.phoneNumber ?? "",
      password: newHunterData?.user?.password ?? ""
    },
    firstname: newHunterData?.firstname ?? hunter?.firstname ?? "",
    lastname: newHunterData?.lastname ?? hunter?.lastname ?? "",
    patronymic: newHunterData?.patronymic ?? hunter?.patronymic ?? "",
    gender: newHunterData?.gender ?? hunter?.gender ?? "",
    dateOfBirth: newHunterData?.dateOfBirth ?? hunter?.dateOfBirth ?? "",
    address: {
      regionId:
        newHunterData?.address?.regionId ?? hunter?.address?.region.id ?? "",
      street: newHunterData?.address?.street ?? hunter?.address?.street ?? "",
      city: newHunterData?.address?.city ?? hunter?.address?.city ?? "",
      houseNumber:
        newHunterData?.address?.houseNumber ??
        hunter?.address?.houseNumber ??
        "",
      flatNumber:
        newHunterData?.address?.flatNumber ?? hunter?.address?.flatNumber ?? "",
      postalCode:
        newHunterData?.address?.postalCode ?? hunter?.address?.postalCode ?? "",
      latitude:
        newHunterData?.address?.latitude ??
        hunter?.address?.latitude ??
        undefined,
      longitude:
        newHunterData?.address?.longitude ??
        hunter?.address?.longitude ??
        undefined
    },

    iin: newHunterData?.iin ?? hunter?.iin ?? "",
    identificationNumber:
      newHunterData?.identificationNumber ?? hunter?.identificationNumber ?? "",
    identificationIssued:
      newHunterData?.identificationIssued ?? hunter?.identificationIssued ?? "",
    identificationValid:
      newHunterData?.identificationValid ?? hunter?.identificationValid ?? "",
    identificationIssuedBy:
      newHunterData?.identificationIssuedBy ??
      hunter?.identificationIssuedBy ??
      "",
    huntingLicenseNumber:
      newHunterData?.huntingLicenseNumber ?? hunter?.huntingLicenseNumber ?? "",
    huntingLicenseIssued:
      newHunterData?.huntingLicenseIssued ?? hunter?.huntingLicenseIssued ?? "",
    huntingLicenseValid:
      newHunterData?.huntingLicenseValid ?? hunter?.huntingLicenseValid ?? ""
  })

  useEffect(() => {
    if (
      hunter &&
      !newHunterData?.user.email
      // !newHunterData?.user.phoneNumber
    ) {
      setState({
        user: {
          email: hunter?.user.email ?? "",
          phoneNumber: hunter?.user.phoneNumber ?? ""
        },
        firstname: hunter?.firstname ?? "",
        lastname: hunter?.lastname ?? "",
        patronymic: hunter?.patronymic ?? "",
        gender: hunter?.gender ?? "",
        dateOfBirth: hunter?.dateOfBirth ?? "",
        address: {
          regionId: hunter?.address?.region.id ?? "",
          street: hunter?.address?.street ?? "",
          city: hunter?.address?.city ?? "",
          houseNumber: hunter?.address?.street ?? "",
          flatNumber: hunter?.address?.street ?? "",
          postalCode: hunter?.address?.street ?? "",
          latitude: hunter?.address?.latitude ?? undefined,
          longitude: hunter?.address?.longitude ?? undefined
        },
        iin: hunter?.iin ?? "",
        identificationNumber: hunter?.identificationNumber ?? "",
        identificationIssued: hunter?.identificationIssued ?? "",
        identificationValid: hunter?.identificationValid ?? "",
        identificationIssuedBy: hunter?.identificationIssuedBy ?? "",
        huntingLicenseNumber: hunter?.huntingLicenseNumber ?? "",
        huntingLicenseIssued: hunter?.huntingLicenseIssued ?? "",
        huntingLicenseValid: hunter?.huntingLicenseValid ?? ""
      })
    }
  }, [hunter, newHunterData?.user])

  useEffect(() => {
    const getHunter = async (membershipId: string) => {
      const membership = await dispatch(
        getMeCompanyMembershipsById(membershipId)
      )
      if (membership) {
        setState({
          user: {
            email:
              newHunterData?.user?.email ?? membership.hunter?.user.email ?? "",
            phoneNumber:
              newHunterData?.user?.phoneNumber ??
              membership.hunter?.user.phoneNumber ??
              "",
            password: newHunterData?.user?.password ?? ""
          },
          firstname:
            newHunterData?.firstname ?? membership.hunter?.firstname ?? "",
          lastname:
            newHunterData?.lastname ?? membership.hunter?.lastname ?? "",
          patronymic:
            newHunterData?.patronymic ?? membership.hunter?.patronymic ?? "",
          gender: newHunterData?.gender ?? membership.hunter.gender ?? "",
          dateOfBirth:
            newHunterData?.dateOfBirth ?? membership.hunter?.dateOfBirth ?? "",
          address: {
            regionId:
              newHunterData?.address?.regionId ??
              membership.hunter?.address?.region.id ??
              "",
            street:
              newHunterData?.address?.street ??
              membership.hunter?.address?.street ??
              "",
            houseNumber:
              newHunterData?.address?.street ??
              membership.hunter?.address?.street ??
              "",
            flatNumber:
              newHunterData?.address?.street ??
              membership.hunter?.address?.street ??
              "",
            postalCode:
              newHunterData?.address?.street ??
              membership.hunter?.address?.street ??
              "",
            latitude:
              newHunterData?.address?.latitude ??
              membership.hunter?.address?.latitude ??
              undefined,
            longitude:
              newHunterData?.address?.longitude ??
              membership.hunter?.address?.longitude ??
              undefined
          },
          iin: newHunterData?.iin ?? membership.hunter?.iin ?? "",
          identificationNumber:
            newHunterData?.identificationNumber ??
            membership.hunter?.identificationNumber ??
            "",
          identificationIssued:
            newHunterData?.identificationIssued ??
            membership.hunter?.identificationIssued ??
            "",
          identificationValid:
            newHunterData?.identificationValid ??
            membership.hunter?.identificationValid ??
            "",
          identificationIssuedBy:
            newHunterData?.identificationIssuedBy ??
            membership.hunter?.identificationIssuedBy ??
            "",
          huntingLicenseNumber:
            newHunterData?.huntingLicenseNumber ??
            membership.hunter?.huntingLicenseNumber ??
            "",
          huntingLicenseIssued:
            newHunterData?.huntingLicenseIssued ??
            membership.hunter?.huntingLicenseIssued ??
            "",
          huntingLicenseValid:
            newHunterData?.huntingLicenseValid ??
            membership.hunter?.huntingLicenseValid ??
            ""
        })
      }
    }

    if (membershipId) {
      getHunter(membershipId)
    }
  }, [membershipId, dispatch])

  useEffect(() => {
    dispatch(setNewHunterData(state))
  }, [state, dispatch])

  return [state, setState] as const
}

export default usePurchaseVoucherUserState
