import { AppDispatch } from ".."
import { GetAnimalsParameters } from "../../models/animals"
import { animalsService } from "../../services/animals.service"
import {
  animalsFetching,
  animalsFetchSuccess,
  animalsFetchError,
  setAnimals
} from "../slices/limitedAnimalsSlice"
import { setlimitAnimalType } from "../slices/limitsSlice"

// Получить лимитированных животных по типу
export const getMeCompanyLimitedAnimals = (payload: GetAnimalsParameters) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(animalsFetching())
      const resp = await animalsService.getLimitedAnimals(payload)
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
