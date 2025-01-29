import { useNavigate } from "react-router-dom"
import Button from "../../../../components/UI/buttons/Button"
import EditButton from "../../../../components/UI/buttons/EditButton"
import Icon from "../../../../components/UI/Icon"
import { classMerge } from "../../../../helpers/common"
import { VoucherDto } from "../../../../models/vouchers"
import { useAppDispatch } from "../../../../store"
import {
  archiveMeCompanyVoucher,
  unarchiveMeCompanyVoucher
} from "../../../../store/actions/vouchersActions"
import { setVoucher } from "../../../../store/slices/vouchersSlice"
import "./style.scss"

interface VoucherCardProps {
  voucher: VoucherDto
  fetchVouchers: () => void
}

const VoucherCard = ({ voucher, fetchVouchers }: VoucherCardProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const editHandler = (voucher: VoucherDto) => {
    dispatch(setVoucher(voucher))
    navigate(`/edit-voucher-step1/${voucher.id}`)
  }

  const arhiveVoucher = async (id: string) => {
    await dispatch(archiveMeCompanyVoucher(id))
    fetchVouchers()
  }

  const unarhiveVoucher = async (id: string) => {
    await dispatch(unarchiveMeCompanyVoucher(id))
    fetchVouchers()
  }

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
        {voucher.isArchived ? (
          <Button
            className="unarhive-voucher-btn"
            onClick={() => unarhiveVoucher(voucher.id)}
          >
            Восстановить
          </Button>
        ) : (
          <div className="voucher-card__head-btns">
            <EditButton onClick={() => editHandler(voucher)} />
            <Button
              className="arhive-voucher-btn"
              onClick={() => arhiveVoucher(voucher.id)}
            >
              Архивировать
            </Button>
          </div>
        )}
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
          onClick={() => navigate(`/voucher/${voucher.id}`)}
        >
          Подробнее
        </Button>
      </div>
    </div>
  )
}

export default VoucherCard
