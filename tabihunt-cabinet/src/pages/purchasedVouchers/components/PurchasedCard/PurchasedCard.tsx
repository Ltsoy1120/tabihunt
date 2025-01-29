import { useNavigate } from "react-router-dom"
import Button from "../../../../components/UI/buttons/Button"
import Icon from "../../../../components/UI/Icon"
import { classMerge } from "../../../../helpers/common"
import { VoucherDto } from "../../../../models/vouchers"
import "./PurchasedCard.scss"

interface VoucherCardProps {
    voucher: VoucherDto
    fetchVouchers: () => void
  }

const PurchasedVoucherCard = ({ voucher }: VoucherCardProps) => {
    const navigate = useNavigate()
    return (
      <div
        className={classMerge(
          "voucher-card",
          voucher.isArchived ? "archived" : ""
        )}
      >
        <div className="voucher-card__head">
          <div className="voucher-card__head-info">
            {voucher.animalTypes.includes("FEATHERED") && (
              <Icon name="feather" size={40} />
            )}
            {voucher.animalTypes.includes("UNGULATE") && (
              <Icon name="ungulate" size={40} />
            )}
  
            <div>
              <h3>{voucher.type === "SEASONAL" ? "Сезонная" : "Разовая"}</h3>
              <span>Количество дней: {voucher.duration}</span>
            </div>
          </div>
        </div>
        <div className="voucher-card__prices">
          <div className="box">
            <span>Стандартная</span>
            <p>{voucher.standardPrice} ₸</p>
          </div>
          <div className="box">
            <span>Член охотничьего общества</span>
            <p>{voucher.membershipPrice} ₸</p>
          </div>
          <div className="box">
            <span>Льготная (Пенсионер)</span>
            <p>{voucher.preferentialPrice} ₸</p>
          </div>
          <div className="box">
            <span>Специальная</span>
            <p>{voucher.specialPrice} ₸</p>
          </div>
        </div>
        <div className="voucher-card__plot">
          <div>
            <span>Участок</span>
            <p>{voucher.plot.name}</p>
          </div>
          <Button
            disabled={voucher.isArchived}
            onClick={() => navigate(`/new-purchased-vouchers-step1/${voucher.id}/`)}
          >
            Продать
          </Button>
        </div>
      </div>
    )
  }
  export default PurchasedVoucherCard