import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { getLimitById } from "../store/actions/limitsActions"
import { LimitData } from "../models/limits"
import { setNewLimitData } from "../store/slices/limitsSlice"

const useLimitState = () => {
  const dispatch = useAppDispatch()
  const { limitId } = useParams()
  const { limit, newLimitData } = useAppSelector(state => state.limits)

  const [state, setState] = useState<LimitData>({
    animalId: newLimitData?.animalId ?? limit?.animal?.id ?? "",
    plotId: newLimitData?.plotId ?? "",
    number: newLimitData?.number ?? limit?.number ?? "",
    availableHeads: newLimitData?.availableHeads ?? limit?.availableHeads ?? 0,
    soldHeads: newLimitData?.soldHeads ?? limit?.soldHeads ?? 0,
    reservedHeads: newLimitData?.reservedHeads ?? limit?.reservedHeads ?? 0
  })

  useEffect(() => {
    const getLimit = async (limitId: string) => {
      const limit = await dispatch(getLimitById(limitId))
      if (limit) {
        setState({
          animalId: newLimitData?.animalId ?? limit?.animal?.id ?? "",
          plotId: newLimitData?.plotId ?? limit?.plot?.id ?? "",
          number: newLimitData?.number ?? limit?.number ?? "",
          availableHeads:
            newLimitData?.availableHeads ?? limit?.availableHeads ?? 0,
          soldHeads: newLimitData?.soldHeads ?? limit?.soldHeads ?? 0,
          reservedHeads:
            newLimitData?.reservedHeads ?? limit?.reservedHeads ?? 0
        })
      }
    }

    if (limitId) {
      getLimit(limitId)
    }
  }, [limitId, dispatch])

  useEffect(() => {
    dispatch(setNewLimitData(state))
  }, [state, dispatch])

  return [state, setState] as const
}

export default useLimitState
