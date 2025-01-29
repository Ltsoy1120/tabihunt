"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/UI/Input";
import { setShowBasket, setVoucherData } from "@/store/slices/vouchersSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import Tabs from "@/components/UI/Tabs";
import Loader from "@/components/loaders/Loader";
import { useParams, useRouter } from "next/navigation";
import {
  getPriceTypeVoucherById,
  getVoucherById,
} from "@/store/actions/vouchersActions";
import { VoucherAnimalDto, VoucherPriceType } from "@/models/vouchers";
import Button from "@/components/UI/buttons/Button";
import {
  declensionOfHeads,
  formatDate,
  getFormattedDate,
} from "@/helpers/common";
import TextButton from "@/components/UI/buttons/TextButton";
import WarningModal from "@/components/modals/WarningModal";
import { useTranslation } from "react-i18next";
import { vouchersService } from "@/services/vouchers.service";
import Icon from "@/components/UI/Icon";
import useIsMobile from "@/hooks/useIsMobile";
import BasketlModal from "@/components/vouchers/BasketlModal";
import "./style.scss";
import Link from "next/link";

const PurchaseVoucherStage2 = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const { me, newHunterData } = useAppSelector((state) => state.hunters);
  const { purchaseVoucherData, voucher, priceType, isShowBasket, loading } =
    useAppSelector((state) => state.vouchers);
  const [state, setState] = useState({
    startDate: purchaseVoucherData?.startDate ?? "",
    endDate: purchaseVoucherData?.endDate ?? "",
    animals: purchaseVoucherData?.animals ?? [],
    paymentMethod: purchaseVoucherData?.paymentMethod ?? null,
  });
  const [activeAnimalType, setActiveAnimalType] = useState("FEATHERED");
  const [searchAnimal, setSearchAnimal] = useState<string>("");
  const [filteredAnimals, setFilteredAnimals] = useState<VoucherAnimalDto[]>(
    voucher?.animals ?? []
  );
  const [animalsBasket, setAnimalsBasket] = useState<VoucherAnimalDto[]>([]);
  const [currrentAnimalAvailableHeads, setCurrentAnimalAvailableHeads] =
    useState<number>();
  const [huntingDateWarning, setHuntingDateWarning] = useState(false);
  const [voucherLimitHeadsWarning, setVoucherLimitHeadsWarning] =
    useState(false);
  const [animalLimitHeadsWarning, setAnimalLimitHeadsWarning] = useState(false);
  const [animalAvailableHeadsWarning, setAnimalAvailableHeadsWarning] =
    useState(false);

  const animalTypeTabs = [
    { value: "FEATHERED", title: t("form.stage2.animalTypes.feathered") },
    { value: "UNGULATE", title: t("form.stage2.animalTypes.ungulate") },
  ];

  useEffect(() => {
    if (!me && !newHunterData && !purchaseVoucherData) {
      router.push(`/${params.locale}/vouchers/${params.id}`);
    }
  }, [me, newHunterData, purchaseVoucherData, router, params]);

  useEffect(() => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (id) {
      dispatch(getVoucherById(id));
      dispatch(getPriceTypeVoucherById(id));
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (voucher?.animals && purchaseVoucherData) {
      const filtered = voucher.animals.filter(
        (animal) =>
          animal.animal.type === activeAnimalType &&
          animal.huntingStartDate < purchaseVoucherData?.startDate &&
          animal.huntingEndDate > purchaseVoucherData?.startDate
      );
      setFilteredAnimals(filtered);
    }
  }, [voucher?.animals, activeAnimalType, purchaseVoucherData]);

  useEffect(() => {
    dispatch(setVoucherData(state));
  }, [dispatch, state]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchAnimal(searchValue);

    if (searchValue) {
      const filtered = voucher?.animals.filter(
        (animal) =>
          animal.animal.name.toLowerCase().includes(searchValue) &&
          animal.animal.type === activeAnimalType
      );
      setFilteredAnimals(filtered?.length ? filtered : []);
    } else {
      const filtered = voucher?.animals.filter(
        (animal) => animal.animal.type === activeAnimalType
      );
      filtered && setFilteredAnimals(filtered);
    }
  };

  const handleClick = async (animal: VoucherAnimalDto) => {
    const exists = animalsBasket.find((item) => item.id === animal.id);
    try {
      const result = await vouchersService.getAvailableHeadsByAnimalId(
        animal.animal.id,
        voucher?.plot.id!
      );
      if (result.data.availableHeads > 0) {
        setCurrentAnimalAvailableHeads(result.data.availableHeads);
        if (!exists) {
          setAnimalsBasket((prev) => [...prev, animal]);
          setState((prevState) => ({
            ...prevState,
            animals: [
              ...prevState.animals,
              { voucherAnimalId: animal.id, heads: 1 },
            ],
          }));
          dispatch(setShowBasket(true));
        }
      } else {
        setAnimalLimitHeadsWarning(true);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const deleteAnimalFromBasket = (voucherAnimalId: string) => {
    const updatedAnimals = animalsBasket.filter(
      (animal) => animal.id !== voucherAnimalId
    );
    setAnimalsBasket(updatedAnimals);
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
    } else if (
      currentAnimalHeads &&
      currrentAnimalAvailableHeads &&
      currentAnimalHeads + 1 > currrentAnimalAvailableHeads
    ) {
      setAnimalAvailableHeadsWarning(true);
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

  const getAnimalPrice = (
    priceType: VoucherPriceType,
    animal: VoucherAnimalDto
  ) => {
    switch (priceType) {
      case VoucherPriceType.STANDARD:
        return animal.standardPrice;
      case VoucherPriceType.MEMBERSHIP:
        return animal.membershipPrice;
      case VoucherPriceType.PREFERENTIAL:
        return animal.preferentialPrice;
      case VoucherPriceType.SPECIAL:
        return animal.specialPrice;
      default:
        break;
    }
  };

  const closeBasketModal = () => {
    dispatch(setShowBasket(false));
  };

  return (
    <>
      <div className="purchase-voucher-stage2">
        <h2>{t("form.stage2.title")}</h2>
        <div className="container">
          <div className="animals-select">
            <Tabs
              optionTabs={animalTypeTabs}
              activeTab={activeAnimalType}
              setActiveTab={setActiveAnimalType}
            />
            <Input
              placeholder={t("form.stage2.animal-search")}
              value={searchAnimal}
              onChange={changeHandler}
              endIcon="search"
            />
            <div className="animals-list">
              {!loading ? (
                filteredAnimals.length > 0 &&
                filteredAnimals.map((animal) => (
                  <div key={animal.id} className="animals-list__item">
                    <div>
                      <p>{animal.animal.name}</p>
                      <span>
                        {t("form.stage2.animal-limit-head")}:{" "}
                        {declensionOfHeads(animal.limitHeads)}
                      </span>
                    </div>
                    {animal.huntingStartDate <= getFormattedDate(new Date()) &&
                    animal.huntingEndDate >= getFormattedDate(new Date()) ? (
                      isMobile ? (
                        <Icon
                          name="plus-mobile"
                          size={40}
                          onClick={() => handleClick(animal)}
                        />
                      ) : (
                        <Button
                          endIcon="plus"
                          onClick={() => handleClick(animal)}
                        >
                          {t("form.stage2.add-button")}
                        </Button>
                      )
                    ) : (
                      <TextButton
                        endIcon="question"
                        onClick={() => setHuntingDateWarning(true)}
                      >
                        {t("form.stage2.not-available")}
                      </TextButton>
                    )}
                  </div>
                ))
              ) : (
                <Loader />
              )}
            </div>
          </div>
          {isMobile && (
            <Link
              href={`/${params.locale}/vouchers/${params.id}/purchase/stage3`}
            >
              <Button disabled={!purchaseVoucherData?.animals.length}>
                {t("form.stage2.continue-btn")}
              </Button>
            </Link>
          )}
          {!isMobile && (
            <div className="basket">
              <h3>{t("form.stage2.basket")}</h3>
              <div className="basket-list">
                {animalsBasket.length > 0 &&
                  animalsBasket.map((animal) => {
                    // Находим количество голов для данного животного
                    const animalData = state.animals.find(
                      (a) => a.voucherAnimalId === animal.id
                    );
                    const heads = animalData?.heads || 1;

                    return (
                      <div key={animal.id} className="basket-list__item">
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

                        <div>
                          <p style={{ textAlign: "center" }}>
                            {priceType
                              ? getAnimalPrice(priceType, animal)
                              : animal.standardPrice}{" "}
                            ₸
                          </p>
                          <div className="count">
                            {heads !== 1 ? (
                              <span onClick={() => handleDecrease(animal.id)}>
                                -
                              </span>
                            ) : (
                              <Icon
                                name="delete"
                                size={20}
                                onClick={() =>
                                  deleteAnimalFromBasket(animal.id)
                                }
                              />
                            )}

                            <p>{heads}</p>
                            <span onClick={() => handleIncrease(animal.id)}>
                              +
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
      {huntingDateWarning && (
        <WarningModal
          title={t("form.stage2.hunting-date-warning.title")}
          text={t("form.stage2.hunting-date-warning.text")}
          button={t("form.stage2.hunting-date-warning.button")}
          close={() => setHuntingDateWarning(false)}
        />
      )}
      {voucherLimitHeadsWarning && (
        <WarningModal
          title={t("form.stage2.voucher-limit-heads-warning.title")}
          text={t("form.stage2.voucher-limit-heads-warning.text")}
          button={t("form.stage2.voucher-limit-heads-warning.button")}
          close={() => setVoucherLimitHeadsWarning(false)}
        />
      )}
      {animalLimitHeadsWarning && (
        <WarningModal
          title={t("form.stage2.animal-imit-heads-warning.title")}
          text={t("form.stage2.animal-imit-heads-warning.text")}
          button={t("form.stage2.animal-imit-heads-warning.button")}
          close={() => setAnimalLimitHeadsWarning(false)}
        />
      )}
      {currrentAnimalAvailableHeads && animalAvailableHeadsWarning && (
        <WarningModal
          title={t("form.stage2.animal-available-heads-warning.title")}
          text={`${t(
            "form.stage2.animal-available-heads-warning.text"
          )}${currrentAnimalAvailableHeads} ${t(
            "form.stage2.animal-available-heads-warning.pieces"
          )}`}
          button={t("form.stage2.animal-available-heads-warning.button")}
          close={() => setAnimalAvailableHeadsWarning(false)}
        />
      )}
      {isMobile &&
        isShowBasket &&
        purchaseVoucherData?.animals &&
        purchaseVoucherData?.animals?.length > 0 &&
        !voucherLimitHeadsWarning &&
        !animalAvailableHeadsWarning && (
          <BasketlModal
            animalsBasket={animalsBasket}
            animals={state.animals}
            getAnimalPrice={getAnimalPrice}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            deleteAnimalFromBasket={deleteAnimalFromBasket}
            close={closeBasketModal}
          />
        )}
    </>
  );
};

export default PurchaseVoucherStage2;
