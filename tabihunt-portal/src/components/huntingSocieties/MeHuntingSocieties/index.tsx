"use client"
import HuntingSocietiesHead from "@/components/huntingSocieties/HuntingSocietiesHead"
import HuntingSocietiesList from "@/components/huntingSocieties/HuntingSocietiesList"
import { useAppDispatch, useAppSelector } from "@/store"
import { getMeHuntingSocieties } from "@/store/actions/huntingSocietiesActions"
import { useEffect, useState } from "react"
import HuntingSocietiesWarning from "../HuntingSocietiesWarning"

const MeHuntingSocieties = () => {
  const dispatch = useAppDispatch()
  const { meHuntingSocieties } = useAppSelector(state => state.huntingSocieties)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("accessToken"))
  }, [])

  useEffect(() => {
    if (isAuth) {
      dispatch(getMeHuntingSocieties())
    }
  }, [dispatch, isAuth])

  return (
    <main className="hunting-societies-page">
      <HuntingSocietiesHead />
      {isAuth ? (
        <HuntingSocietiesList huntingSocieties={meHuntingSocieties} />
      ) : (
        <HuntingSocietiesWarning />
      )}
    </main>
  )
}

export default MeHuntingSocieties
