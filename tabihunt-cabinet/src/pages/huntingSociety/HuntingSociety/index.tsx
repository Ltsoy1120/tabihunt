import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store"
import AboutHuntingSocietyCard from "../components/aboutHuntingSocietyCard"
import { getHuntingSocietyDescriptions } from "../../../store/actions/huntingSocietyAction"
import { setHuntingDescriptionData } from "../../../store/slices/huntingSocietySlice"
import { AboutHuntingNotFound } from "../components/AboutHuntingNotFound"

const HuntingSociety = () => {
  const dispatch = useAppDispatch()
  const { huntingDescription } = useAppSelector(state => state.huntingSociety)

  useEffect(() => {
    dispatch(getHuntingSocietyDescriptions())
    dispatch(setHuntingDescriptionData(null))
  }, [])
  return (
    <div>
      {huntingDescription ? (
        <AboutHuntingSocietyCard data={huntingDescription} />
      ) : (
        <AboutHuntingNotFound />
      )}
    </div>
  )
}
export default HuntingSociety
