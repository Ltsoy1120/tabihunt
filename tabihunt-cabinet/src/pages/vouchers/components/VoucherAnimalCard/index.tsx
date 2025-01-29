import { formatDate } from "../../../../helpers/common"
import { VoucherAnimalData, VoucherAnimalDto } from "../../../../models/vouchers"
import { useAppSelector } from "../../../../store"
import "./style.scss"

interface VoucherLimitAnimalProps {
  voucherAnimal: VoucherAnimalData | VoucherAnimalDto
}
const VoucherLimitCard = ({ voucherAnimal }: VoucherLimitAnimalProps) => {
  const { animals } = useAppSelector(state => state.limitedAnimals)
  const { voucherAnimals } = useAppSelector(state => state.vouchers)

  const isDto = (
    animal: VoucherAnimalData | VoucherAnimalDto
  ): animal is VoucherAnimalDto => "animal" in animal

  const animal = isDto(voucherAnimal)
    ? voucherAnimal.animal
    : animals.find(animal => animal.id === voucherAnimal.animalId)

  const voucherAnimalDto = !isDto(voucherAnimal)
    ? voucherAnimals?.find(animal => animal.animal.id === voucherAnimal.animalId)
    : voucherAnimals?.find(animal => animal.animal.id === voucherAnimal.animal.id)

  console.log(voucherAnimal)

  return (
      <div className="voucher-limit-card">
        <div className="voucher-limit-card__head">
          <div className="voucher-limit-card__head-info">
            <h3>{voucherAnimalDto?.animal.name ?? animal?.name}</h3>
            <span>
            с {formatDate(voucherAnimal.huntingStartDate)} по{" "}
              {formatDate(voucherAnimal.huntingEndDate)}
          </span>
          </div>
        </div>

        <div className="voucher-limit-card__prices">
          <div className="row">
            <div className="box">
              <span>Стандартная</span>
              <p>{voucherAnimal.standardPrice}</p>
            </div>
            <div className="box">
              <span>Член охотничьего общества</span>
              <p>{voucherAnimal.membershipPrice}</p>
            </div>
            <div className="box">
              <span>Льготная (Пенсионер)</span>
              <p>{voucherAnimal.preferentialPrice}</p>
            </div>
            <div className="box">
              <span>Специальная</span>
              <p>{voucherAnimal.specialPrice}</p>
            </div>
          </div>
          <div className="box full-width">
            <span>Лимит голов на путевку</span>
            <p>{voucherAnimal.limitHeads}</p>
          </div>
        </div>
      </div>
  )
}

export default VoucherLimitCard
