import Button from "@/components/UI/buttons/Button";
import Icon from "@/components/UI/Icon";
import Modal from "@/components/UI/Modal";
import { formatDate } from "@/helpers/common";
import {
  PurchaseVoucherAnimalData,
  VoucherAnimalDto,
  VoucherPriceType,
} from "@/models/vouchers";
import { useAppSelector } from "@/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import "./style.scss";

interface BasketlModalProps {
  animalsBasket: VoucherAnimalDto[];
  animals: PurchaseVoucherAnimalData[];
  getAnimalPrice: (
    priceType: VoucherPriceType,
    animal: VoucherAnimalDto
  ) => number | undefined;
  handleDecrease: (voucherAnimalId: string) => void;
  handleIncrease: (voucherAnimalId: string) => void;
  deleteAnimalFromBasket: (voucherAnimalId: string) => void;
  close: () => void;
}
const BasketlModal = ({
  animalsBasket,
  animals,
  getAnimalPrice,
  handleDecrease,
  handleIncrease,
  deleteAnimalFromBasket,
  close,
}: BasketlModalProps) => {
  const { t } = useTranslation();
  const params = useParams();
  const { purchaseVoucherData, priceType } = useAppSelector(
    (state) => state.vouchers
  );
  return (
    <Modal hasScroll close={close}>
      <div className="basket-modal">
        <h3>{t("form.stage2.basket")}</h3>
        <div className="basket-modal-list">
          {animalsBasket.length > 0 &&
            animalsBasket.map((animal) => {
              // Находим количество голов для данного животного
              const animalData = animals.find(
                (a) => a.voucherAnimalId === animal.id
              );
              const heads = animalData?.heads || 1;

              return (
                <div key={animal.id} className="basket-modal-list__item">
                  <div className="row">
                    <div>
                      <p>{animal.animal.name}</p>
                      <span>
                        {params.locale === "ru"
                          ? `С ${formatDate(
                              animal.huntingStartDate
                            )} По ${formatDate(animal.huntingEndDate)}`
                          : `${formatDate(
                              animal.huntingStartDate
                            )} бастап ${formatDate(
                              animal.huntingEndDate
                            )} дейін`}
                      </span>
                    </div>
                    <p style={{ textAlign: "center" }}>
                      {priceType
                        ? getAnimalPrice(priceType, animal)
                        : animal.standardPrice}{" "}
                      ₸
                    </p>
                  </div>

                  <div className="count">
                    {heads !== 1 ? (
                      <span onClick={() => handleDecrease(animal.id)}>-</span>
                    ) : (
                      <Icon
                        name="delete"
                        size={20}
                        onClick={() => deleteAnimalFromBasket(animal.id)}
                      />
                    )}
                    <p>{heads}</p>
                    <span onClick={() => handleIncrease(animal.id)}>+</span>
                  </div>
                </div>
              );
            })}
        </div>
        <Button endIcon="plus" onClick={close}>
          {t("form.stage2.add-animal-button")}
        </Button>
        <Link href={`/${params.locale}/vouchers/${params.id}/purchase/stage3`}>
          <Button disabled={!purchaseVoucherData?.animals.length}>
            {t("form.stage2.continue-btn")}
          </Button>
        </Link>
      </div>
    </Modal>
  );
};

export default BasketlModal;
