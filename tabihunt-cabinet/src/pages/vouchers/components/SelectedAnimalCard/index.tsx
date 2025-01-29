import DeleteButton from "../../../../components/UI/buttons/DeleteButton"
import Input from "../../../../components/UI/Input"
import { VoucherAnimalData } from "../../../../models/vouchers"
import { useAppSelector } from "../../../../store"
import "./style.scss"

interface SelectedLimitCardProps {
  selectedAnimal: VoucherAnimalData
  deleteAnimalHandler: (voucherLimit: VoucherAnimalData) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const SelectedLimitCard = ({
  selectedAnimal,
  deleteAnimalHandler,
  handleChange
}: SelectedLimitCardProps) => {
  const { animals } = useAppSelector(state => state.limitedAnimals)
  const { voucherAnimals } = useAppSelector(state => state.vouchers)
  const voucherAnimal = voucherAnimals?.find(
    animal => animal.animal.id === selectedAnimal.animalId
  )
  const animal = animals?.find(animal => animal.id === selectedAnimal.animalId)

  return (
    <div className="selected-limit-card">
      <div className="selected-limit-card__head">
        <div className="selected-limit-card__head-info">
          <h3>
            {voucherAnimal?.animal.name ?? animal?.name}
          </h3>
        </div>

        <DeleteButton onClick={() => deleteAnimalHandler(selectedAnimal)} />
      </div>
      <div className="selected-limit-card__period">
        <h4>Период</h4>
        <div className="inputs-row">
          <Input
            type="date"
            name="huntingStartDate"
            value={selectedAnimal.huntingStartDate}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="huntingEndDate"
            value={selectedAnimal.huntingEndDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="selected-limit-card__prices">
        <div className="inputs-row">
          <div className="input-box">
            <h4>Стандартная</h4>
            <Input
                placeholder="₸"
                name="standardPrice"
                type="number"
                value={String(selectedAnimal.standardPrice)}
                onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <h4>Член охотничьего общества</h4>
            <Input
                placeholder="₸"
                name="membershipPrice"
                type="number"
                value={String(selectedAnimal.membershipPrice)}
                onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <h4>Льготная (Пенсионер)</h4>
            <Input
                placeholder="₸"
                name="preferentialPrice"
                type="number"
                value={String(selectedAnimal.preferentialPrice)}
                onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <h4>Специальная</h4>
            <Input
                placeholder="₸"
                name="specialPrice"
                type="number"
                value={String(selectedAnimal.specialPrice)}
                onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-box full-width">
          <h4>Лимит голов на путевку</h4>
          <Input
              placeholder="Введите количество"
              name="limitHeads"
              type="number"
              value={String(selectedAnimal.limitHeads)}
              onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default SelectedLimitCard
