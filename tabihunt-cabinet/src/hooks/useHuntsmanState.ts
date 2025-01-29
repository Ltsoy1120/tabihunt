import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { getMeCompanyHuntsmanById } from "../store/actions/huntsmenActions"
import { HuntsmanData } from "../models/huntsmen"
import { setNewHuntsmanData } from "../store/slices/huntsmenSlice"

const useHuntsmanState = () => {
  const dispatch = useAppDispatch()
  const { huntsmanId } = useParams()
  const { huntsman, newHuntsmanData } = useAppSelector(state => state.huntsmen)

  const [state, setState] = useState<HuntsmanData>({
    plotId: newHuntsmanData?.plotId ?? huntsman?.plot.id ?? "",
    firstname: newHuntsmanData?.firstname ?? huntsman?.firstname ?? "",
    lastname: newHuntsmanData?.lastname ?? huntsman?.lastname ?? "",
    patronymic: newHuntsmanData?.patronymic ?? huntsman?.patronymic ?? "",
    position: newHuntsmanData?.position ?? huntsman?.position ?? "",
    displayInVouchers:
      newHuntsmanData?.displayInVouchers ??
      huntsman?.displayInVouchers ??
      false,
    latitude: newHuntsmanData?.latitude ?? huntsman?.latitude ?? null,
    longitude: newHuntsmanData?.longitude ?? huntsman?.longitude ?? null,
    user: {
      email: newHuntsmanData?.user?.email ?? huntsman?.user.email ?? "",
      phoneNumber:
        newHuntsmanData?.user?.phoneNumber ?? huntsman?.user.phoneNumber ?? "",
      password: newHuntsmanData?.user?.password ?? ""
    }
  })

  useEffect(() => {
    const getHuntsman = async (huntsmanId: string) => {
      const huntsman = await dispatch(getMeCompanyHuntsmanById(huntsmanId))
      if (huntsman) {
        setState({
          plotId: newHuntsmanData?.plotId ?? huntsman?.plot.id ?? "",
          firstname: newHuntsmanData?.firstname ?? huntsman?.firstname ?? "",
          lastname: newHuntsmanData?.lastname ?? huntsman?.lastname ?? "",
          patronymic: newHuntsmanData?.patronymic ?? huntsman?.patronymic ?? "",
          position: newHuntsmanData?.position ?? huntsman?.position ?? "",
          displayInVouchers:
            newHuntsmanData?.displayInVouchers ??
            huntsman?.displayInVouchers ??
            false,
          latitude: newHuntsmanData?.latitude ?? huntsman?.latitude ?? null,
          longitude: newHuntsmanData?.longitude ?? huntsman?.longitude ?? null,
          user: {
            email: newHuntsmanData?.user?.email ?? huntsman?.user.email ?? "",
            phoneNumber:
              newHuntsmanData?.user?.phoneNumber ??
              huntsman?.user.phoneNumber ??
              "",
            password: newHuntsmanData?.user?.password ?? ""
          }
        })
      }
    }

    if (huntsmanId) {
      getHuntsman(huntsmanId)
    }
  }, [huntsmanId, dispatch])

  useEffect(() => {
    dispatch(setNewHuntsmanData(state))
  }, [state, dispatch])

  return [state, setState] as const
}

export default useHuntsmanState
