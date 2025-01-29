"use client"
import ProgressBar from "@/components/account/ProgressBar"
import { useAppDispatch, useAppSelector } from "@/store"
import {
  huntersFetchError,
  setNewHunterData
} from "@/store/slices/huntersSlice"
import ErrorModal from "@/components/ErrorModal"
import { setRegisterData } from "@/store/slices/authSlice"
import "./style.scss"

interface ClientWrapperProps {
  isMobile: boolean
  children: React.ReactNode
}

export default function ClientWrapper({
  isMobile,
  children
}: ClientWrapperProps) {
  const dispatch = useAppDispatch()
  const { error } = useAppSelector(state => state.hunters)

  const closeHandler = () => {
    dispatch(huntersFetchError(null))
    dispatch(setNewHunterData(null))
    dispatch(setRegisterData(null))
  }

  return (
    <>
      <div className="form-layout__main">
        {!isMobile && <ProgressBar />}
        {children}
      </div>
      {error && <ErrorModal error={error} closeHandler={closeHandler} />}
    </>
  )
}
