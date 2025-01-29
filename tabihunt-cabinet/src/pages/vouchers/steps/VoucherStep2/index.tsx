import { useEffect, useState } from "react"
import Button from "../../../../components/UI/buttons/Button"
import DeleteButton from "../../../../components/UI/buttons/DeleteButton"
import Input from "../../../../components/UI/Input"
import {
  getHuntsmanDeclension,
  getHuntsmanFullName
} from "../../../../helpers/common"
import useVoucherState from "../../../../hooks/useVoucherState"
import { HuntsmanDto } from "../../../../models/huntsmen"
import { useAppDispatch, useAppSelector } from "../../../../store"
import {
  getMeCompanyHuntsmanById,
  getMeCompanyHuntsmen
} from "../../../../store/actions/huntsmenActions"
import "./style.scss"

export const voucherTypeTabs = [
  { value: "ONE_TIME", title: "Разовая" },
  { value: "SEASONAL", title: "Сезонная" }
]

const VoucherStep2 = () => {
  const dispatch = useAppDispatch()
  const { huntsmen } = useAppSelector(state => state.huntsmen)
  const { newVoucherData } = useAppSelector(state => state.vouchers)
  const [searchHuntsman, setSearchHuntsman] = useState("")

  const [state, setState] = useVoucherState()

  const [selectedHuntsmen, setSelectedHuntsmen] = useState<HuntsmanDto[]>([])

  useEffect(() => {
    const getselectedHuntsmen = async () => {
      const huntsmen = await Promise.all(
        state.huntsmenIds.map(async id => {
          const action = await dispatch(getMeCompanyHuntsmanById(id))
          if (action) {
            return action
          }
          return undefined
        })
      )

      setSelectedHuntsmen(
        huntsmen.filter((action): action is HuntsmanDto => action !== undefined)
      )
    }

    if (state.huntsmenIds) {
      getselectedHuntsmen()
    }
  }, [state.huntsmenIds])

  useEffect(() => {
    dispatch(
      getMeCompanyHuntsmen({
        ...(newVoucherData && { plotId: newVoucherData.plotId }),
        ...(searchHuntsman && { fullname: searchHuntsman })
      })
    )
  }, [newVoucherData?.plotId, searchHuntsman])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchHuntsman(event.target.value)
  }

  const addHuntsmanHandler = (huntsman: HuntsmanDto) => {
    const isHuntsmanAdded = selectedHuntsmen.some(man => man.id === huntsman.id)
    if (!isHuntsmanAdded) {
      setState(prev => ({
        ...prev,
        huntsmenIds: [...prev.huntsmenIds, huntsman.id]
      }))
      setSelectedHuntsmen([...selectedHuntsmen, huntsman])
    }
  }

  const deleteHuntsmanHandler = (huntsman: HuntsmanDto) => {
    setState(prev => ({
      ...prev,
      huntsmenIds: prev.huntsmenIds.filter(id => id !== huntsman.id)
    }))
    setSelectedHuntsmen(selectedHuntsmen.filter(man => man.id !== huntsman.id))
  }

  return (
    <div className="new-voucher-step2">
      <div className="add-huntsmen">
        <h2>Добавьте одного или нескольких егерей</h2>
        <Input
          placeholder="Поиск егеря по ФИО"
          value={searchHuntsman}
          onChange={handleChange}
          endIcon="search"
        />

        <div className="huntsmen-list">
          {huntsmen.length > 0 ? (
            huntsmen.map(huntsman => (
              <div key={huntsman.id} className="huntsmen-list__item">
                <div className="huntsmen-list__item-info">
                  <p>{getHuntsmanFullName(huntsman)}</p>
                  <div className="row">
                    <span>
                      Должность:{" "}
                      {huntsman.position === "SENIOR"
                        ? "Старший егерь"
                        : "Младший егерь"}
                    </span>
                  </div>
                </div>
                {!selectedHuntsmen.map(huntsman => huntsman.id).includes(huntsman.id) ? <Button
                    onClick={() => addHuntsmanHandler(huntsman)}
                    endIcon="dark-plus">Добавить</Button>
                  : <p className="chosen">Добавлен</p>}
              </div>
            ))
          ) : (
            <p>По участку егерей нет</p>
          )}
        </div>
      </div>
      {selectedHuntsmen.length > 0 && (
        <div className="selected-huntsmen">
          <div className="selected-huntsmen__head">
            <h2>Выбрано</h2>
            <h2>{getHuntsmanDeclension(selectedHuntsmen.length)}</h2>
          </div>
          {selectedHuntsmen.map(huntsman => (
            <div key={huntsman.id} className="huntsmen-list__item">
              <div className="huntsmen-list__item-info">
                <p>{getHuntsmanFullName(huntsman)}</p>
                <div className="row">
                  <span>
                    Должность:{" "}
                    {huntsman.position === "SENIOR"
                      ? "Старший егерь"
                      : "Младший егерь"}
                  </span>
                </div>
              </div>
              <DeleteButton onClick={() => deleteHuntsmanHandler(huntsman)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VoucherStep2
