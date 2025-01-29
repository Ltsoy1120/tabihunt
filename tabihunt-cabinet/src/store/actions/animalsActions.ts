import { AppDispatch } from ".."
import { GetAnimalsParameters } from "../../models/animals"
import { animalsService } from "../../services/animals.service"
import {
  animalsFetching,
  animalsFetchSuccess,
  animalsFetchError,
  setAnimals
} from "../slices/animalsSlice"
import { setlimitAnimalType } from "../slices/limitsSlice"

// Получить животных по типу
export const getAnimals = (payload: GetAnimalsParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(animalsFetching())
      const resp = await animalsService.getAnimals(payload)
      if (resp && resp?.data) {
        dispatch(animalsFetchSuccess())
        dispatch(setlimitAnimalType(payload.animalType))
        dispatch(setAnimals(resp.data.content))
        return resp.data
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error)
      dispatch(animalsFetchError(errMessage))
    }
  }
}
