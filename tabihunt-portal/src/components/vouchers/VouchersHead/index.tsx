"use client"
import AnimalTypesModal from "@/components/modals/AnimalTypesModal"
import PlotsModal from "@/components/modals/PlotsModal"
import VoucherTypesModal from "@/components/modals/VoucherTypesModal"
import Button from "@/components/UI/buttons/Button"
import FilterButton from "@/components/UI/buttons/FilterButton"
import TextButton from "@/components/UI/buttons/TextButton"
import Input from "@/components/UI/Input"
import { classMerge } from "@/helpers/common"
import { AnimalType } from "@/models/animals"
import { PlotDto } from "@/models/plots"
import { VoucherType } from "@/models/vouchers"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import FiltersModal from "../FiltersModal"
import "./style.scss"

interface VouchersHeadProps {
  plots: PlotDto[]
  plotId?: string
  animalType?: AnimalType
  type?: VoucherType
}

const VouchersHead = ({
  plots,
  plotId,
  animalType,
  type
}: VouchersHeadProps) => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { replace } = useRouter()
  const [activePlot, setActivePlot] = useState<PlotDto | null>(null)
  const [activeAnimalType, setActiveAnimalType] = useState<AnimalType>(null)
  const [activeVoucherType, setActiveVoucherType] = useState<VoucherType>(null)
  const [isOpenPlotsModal, setOpenPlotsModal] = useState(false)
  const [isOpenFiltersModal, setOpenFiltersModal] = useState(false)
  const [isOpenAnimalTypesModal, setOpenAnimalTypesModal] = useState(false)
  const [isOpenVoucherTypesModal, setOpenVoucherTypesModal] = useState(false)
  const [searchAnimal, setSearchAnimal] = useState<string>("")

  useEffect(() => {
    if (plots.length && plotId) {
      const activePlot = plots.find(plot => plot.id === plotId)
      activePlot && setActivePlot(activePlot)
    }
  }, [plotId, plots])

  useEffect(() => {
    if (animalType) {
      setActiveAnimalType(animalType)
    }
  }, [animalType])

  useEffect(() => {
    if (type) {
      setActiveVoucherType(type)
    }
  }, [type])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (searchAnimal) {
      params.set("animalName", searchAnimal)
    } else {
      params.delete("animalName")
    }

    router.push(`?${params.toString()}`)
  }, [searchAnimal, router, searchParams])

  const selectPlot = (plot: PlotDto | null) => {
    setActivePlot(plot)
  }

  const selectAnimalType = (animalType: AnimalType | null) => {
    setActiveAnimalType(animalType)
  }

  const selectVoucherType = (voucherType: VoucherType | null) => {
    setActiveVoucherType(voucherType)
  }

  const sortedByPlotId = () => {
    const params = new URLSearchParams(searchParams)
    if (activePlot) {
      params.set("plotId", activePlot.id)
    } else {
      params.delete("plotId")
    }
    replace(`${pathname}?${params.toString()}`)
    setOpenPlotsModal(false)
  }

  const sortedByAnimalType = () => {
    const params = new URLSearchParams(searchParams)
    if (activeAnimalType) {
      params.set("animalType", activeAnimalType)
    } else {
      params.delete("animalType")
    }
    replace(`${pathname}?${params.toString()}`)
    setOpenAnimalTypesModal(false)
    setOpenFiltersModal(false)
  }

  const sortedByVoucherType = () => {
    const params = new URLSearchParams(searchParams)
    if (activeVoucherType) {
      params.set("type", activeVoucherType)
    } else {
      params.delete("type")
    }
    replace(`${pathname}?${params.toString()}`)
    setOpenVoucherTypesModal(false)
    setOpenFiltersModal(false)
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearchAnimal(searchValue)
  }

  return (
    <>
      <div className="vouchers-head">
        <div className="vouchers-head__actions">
          <TextButton
            endIcon="arrow-down-big"
            onClick={() => setOpenPlotsModal(true)}
          >
            {activePlot?.name ?? t("main.plot-select.title")}
          </TextButton>
          <Button
            endIcon="filter"
            onClick={() => setOpenFiltersModal(true)}
            className={classMerge(
              "mobile-filter-btn",
              activeAnimalType || activeVoucherType ? "active" : ""
            )}
          >
            {t("main.filters-btn")}
          </Button>
          <div className="group-btns">
            <FilterButton onClick={() => setOpenAnimalTypesModal(true)}>
              {animalType === "FEATHERED"
                ? t("main.animal-type-select.feathered")
                : animalType === "UNGULATE"
                ? t("main.animal-type-select.ungulate")
                : t("main.animal-type-select.title")}
            </FilterButton>
            <FilterButton onClick={() => setOpenVoucherTypesModal(true)}>
              {type === "SEASONAL"
                ? t("main.voucher-type-select.seasonal")
                : type === "ONE_TIME"
                ? t("main.voucher-type-select.one-time")
                : t("main.voucher-type-select.title")}
            </FilterButton>
          </div>
        </div>
        <div className="vouchers-head__search">
          <Input
            placeholder={t("main.voucher-search")}
            value={searchAnimal}
            onChange={changeHandler}
            endIcon="search"
          />
        </div>
      </div>
      {isOpenPlotsModal && (
        <PlotsModal
          plots={plots}
          activePlot={activePlot}
          selectPlot={selectPlot}
          close={() => setOpenPlotsModal(false)}
          onSubmit={sortedByPlotId}
        />
      )}
      {isOpenFiltersModal &&
        !isOpenAnimalTypesModal &&
        !isOpenVoucherTypesModal && (
          <FiltersModal
            activeVoucherType={activeVoucherType}
            activeAnimalType={activeAnimalType}
            setActiveVoucherType={setActiveVoucherType}
            setActiveAnimalType={setActiveAnimalType}
            setOpenVoucherTypesModal={() => setOpenVoucherTypesModal(true)}
            setOpenAnimalTypesModal={() => setOpenAnimalTypesModal(true)}
            close={() => setOpenFiltersModal(false)}
          />
        )}
      {isOpenAnimalTypesModal && (
        <AnimalTypesModal
          activeAnimalType={activeAnimalType}
          selectAnimalType={selectAnimalType}
          close={() => setOpenAnimalTypesModal(false)}
          onSubmit={sortedByAnimalType}
        />
      )}
      {isOpenVoucherTypesModal && (
        <VoucherTypesModal
          activeVoucherType={activeVoucherType}
          selectVoucherType={selectVoucherType}
          close={() => setOpenVoucherTypesModal(false)}
          onSubmit={sortedByVoucherType}
        />
      )}
    </>
  )
}

export default VouchersHead
