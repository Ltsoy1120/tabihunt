"use client";
import WarningModal from "@/components/modals/WarningModal";
import Button from "@/components/UI/buttons/Button";
import Checkbox from "@/components/UI/Checkbox";
import Icon from "@/components/UI/Icon";
import {
  declensionOfHeads,
  formatDate,
  getAnimalPrice,
  getVoucherPrice,
} from "@/helpers/common";
import useIsMobile from "@/hooks/useIsMobile";
import { PurchaseVoucherData } from "@/models/vouchers";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setAgreeWithHuntingRules,
  setVoucherData,
} from "@/store/slices/vouchersSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";

const PurchaseVoucherStage5 = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { me, newHunterData } = useAppSelector((state) => state.hunters);
  const { voucher, purchaseVoucherData, priceType, isAgreeWithHuntingRules } =
    useAppSelector((state) => state.vouchers);
  const [state, setState] = useState({
    startDate: purchaseVoucherData?.startDate ?? "",
    endDate: purchaseVoucherData?.endDate ?? "",
    animals: purchaseVoucherData?.animals ?? [],
    paymentMethod: purchaseVoucherData?.paymentMethod ?? null,
  });
  const [isAgree, setAgree] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [voucherLimitHeadsWarning, setVoucherLimitHeadsWarning] =
    useState(false);

  useEffect(() => {
    if (!me && !newHunterData && !purchaseVoucherData) {
      router.push(`/${params.locale}/vouchers/${params.id}`);
    }
    if (
      !purchaseVoucherData?.animals[0] ||
      !purchaseVoucherData?.startDate ||
      !purchaseVoucherData?.endDate
    ) {
      router.push(`/${params.locale}/vouchers/${params.id}/purchase/stage1`);
    }
  }, [me, newHunterData, purchaseVoucherData, router, params]);

  useEffect(() => {
    dispatch(setVoucherData(state));
  }, [dispatch, state]);

  useEffect(() => {
    dispatch(setAgreeWithHuntingRules(isAgree));
  }, [dispatch, isAgree]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const voucherAmount =
        priceType && voucher ? getVoucherPrice(priceType, voucher) ?? 0 : 0;
      console.log("voucherAmount", voucherAmount);

      const totalAnimalCost =
        purchaseVoucherData?.animals.reduce((total, animal) => {
          const voucherAnimal = voucher?.animals.find(
            (a) => a.id === animal.voucherAnimalId
          );
          const animalCost =
            ((priceType &&
              voucherAnimal &&
              getAnimalPrice(priceType, voucherAnimal)) ||
              0) * animal.heads;
          return total + animalCost;
        }, 0) || 0;
      console.log("totalAnimalCost", totalAnimalCost);

      const voucherCost = voucherAmount + totalAnimalCost;
      console.log("voucherCost", voucherCost);
      setTotalAmount(voucherCost);
    };

    calculateTotalAmount();
  }, [voucher, purchaseVoucherData, priceType]);

  const deleteAnimalFromBasket = (voucherAnimalId: string) => {
    const updatedStateAnimals = state.animals.filter(
      (animal) => animal.voucherAnimalId !== voucherAnimalId
    );
    setState((prevState) => ({
      ...prevState,
      animals: updatedStateAnimals,
    }));
  };

  const handleIncrease = (voucherAnimalId: string) => {
    const limitHeads = voucher?.animals.find(
      (animal) => animal.id === voucherAnimalId
    )?.limitHeads;

    const currentAnimalHeads = purchaseVoucherData?.animals.find(
      (animal) => animal.voucherAnimalId === voucherAnimalId
    )?.heads;

    if (
      currentAnimalHeads &&
      limitHeads &&
      currentAnimalHeads + 1 > limitHeads
    ) {
      setVoucherLimitHeadsWarning(true);
    } else {
      setState((prevState) => ({
        ...prevState,
        animals: prevState.animals.map((animal) =>
          animal.voucherAnimalId === voucherAnimalId
            ? { ...animal, heads: animal.heads + 1 }
            : animal
        ),
      }));
    }
  };

  const handleDecrease = (voucherAnimalId: string) => {
    setState((prevState) => ({
      ...prevState,
      animals: prevState.animals.map((animal) =>
        animal.voucherAnimalId === voucherAnimalId && animal.heads > 1
          ? { ...animal, heads: animal.heads - 1 }
          : animal
      ),
    }));
  };

  return (
    <>
      <div className="purchase-voucher-stage5">
        <h1>{t("form.stage5.title")}</h1>
        <div className="container">
          <div className="col">
            <div className="voucher-info">
              <div className="voucher-info__head">
                <div>
                  <p>{t("form.stage5.voucher-info.voucher")}</p>
                  <span>
                    {purchaseVoucherData?.startDate &&
                      purchaseVoucherData?.endDate &&
                      (params.locale === "ru"
                        ? `С ${formatDate(
                            purchaseVoucherData?.startDate
                          )} По ${formatDate(purchaseVoucherData?.endDate)}`
                        : `${formatDate(
                            purchaseVoucherData?.startDate
                          )} бастап ${formatDate(
                            purchaseVoucherData?.endDate
                          )} дейін`)}
                  </span>
                </div>
                <p>
                  {priceType && voucher && getVoucherPrice(priceType, voucher)}{" "}
                  ₸
                </p>
              </div>
              <div className="voucher-info__footer">
                <div>
                  <span>{t("form.stage5.voucher-info.plot")}</span>
                  <p>{voucher?.plot.name}</p>
                </div>
                <div>
                  <span>{t("form.stage5.voucher-info.voucherType")}</span>
                  <p>
                    {voucher?.type === "SEASONAL"
                      ? t("form.stage5.voucher-type.seasonal")
                      : t("form.stage5.voucher-type.one-time")}
                  </p>
                </div>
              </div>
            </div>
            <div className="animals-info">
              <h2>{t("form.stage5.animals-info.title")}</h2>
              <div className="basket-list">
                {purchaseVoucherData &&
                  purchaseVoucherData?.animals?.length > 0 &&
                  purchaseVoucherData?.animals.map((animal) => {
                    const voucherAnimal = voucher?.animals.find(
                      (a) => a.id === animal.voucherAnimalId
                    );
                    const heads = animal?.heads || 1;

                    return (
                      <div
                        key={animal.voucherAnimalId}
                        className="basket-list__item"
                      >
                        <div className="row">
                          {voucherAnimal && (
                            <div>
                              <p>{voucherAnimal?.animal.name}</p>
                              <span>
                                {params.locale === "ru"
                                  ? `С ${formatDate(
                                      voucherAnimal?.huntingStartDate
                                    )} По ${formatDate(
                                      voucherAnimal?.huntingEndDate
                                    )}`
                                  : `${formatDate(
                                      voucherAnimal?.huntingStartDate
                                    )} бастап ${formatDate(
                                      voucherAnimal?.huntingEndDate
                                    )} 
                                дейін`}
                              </span>
                            </div>
                          )}

                          <p style={{ textAlign: "center" }}>
                            {priceType &&
                              voucherAnimal &&
                              getAnimalPrice(priceType, voucherAnimal)}{" "}
                            ₸
                          </p>
                        </div>
                        <div className="count">
                          {heads !== 1 ? (
                            <span
                              onClick={() =>
                                handleDecrease(animal.voucherAnimalId)
                              }
                            >
                              -
                            </span>
                          ) : (
                            <Icon
                              name="delete"
                              size={20}
                              onClick={() =>
                                deleteAnimalFromBasket(animal.voucherAnimalId)
                              }
                            />
                          )}
                          <p>{animal.heads}</p>
                          <span
                            onClick={() =>
                              handleIncrease(animal.voucherAnimalId)
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="amount">
            <Checkbox
              label={
                <>
                  {t("form.stage5.checkbox")}{" "}
                  <a href="/">{t("form.stage5.checkbox-link")}</a>
                </>
              }
              name="isAgree"
              checked={isAgree}
              onChange={() => setAgree(!isAgree)}
            />
            <Button disabled>
              <p>{t("form.stage5.total-amount")}</p>
              <span>
                {totalAmount.toLocaleString("ru-RU").replace(/,/g, " ")} ₸
              </span>
            </Button>
            {isAgreeWithHuntingRules && isMobile ? (
              <Link
                href={`/${params.locale}/vouchers/${params.id}/purchase/payment`}
              >
                <Button>{t("form.stage5.go-to-payment")}</Button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      {voucherLimitHeadsWarning && (
        <WarningModal
          title={t("form.stage2.voucher-limit-heads-warning.title")}
          text={t("form.stage2.voucher-limit-heads-warning.text")}
          button={t("form.stage2.voucher-limit-heads-warning.button")}
          close={() => setVoucherLimitHeadsWarning(false)}
        />
      )}
    </>
  );
};

export default PurchaseVoucherStage5;
