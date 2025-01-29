"use client"
import AnimalNamesModal from "@/components/modals/AnimalNamesModal"
import AnimalTypesModal from "@/components/modals/AnimalTypesModal"
import Button from "@/components/UI/buttons/Button"
import FilterButton from "@/components/UI/buttons/FilterButton"
import Input from "@/components/UI/Input"
import { classMerge } from "@/helpers/common"
import useIsMobile from "@/hooks/useIsMobile"
import { AnimalDto, AnimalType } from "@/models/animals"
import { commonService } from "@/services/common.service"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import FiltersModal from "../FiltersModal"
import "./style.scss"

interface PlotDescriptionsHeadProps {
  animalType?: AnimalType
  animalIds?: string[]
}

const PlotDescriptionsHead = ({
  animalType,
  animalIds
}: PlotDescriptionsHeadProps) => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { replace } = useRouter()
  const [activeAnimalType, setActiveAnimalType] = useState<AnimalType>(
    animalType ?? null
  )
  const [activeAnimals, setActiveAnimals] = useState<AnimalDto[]>([])
  const [animals, setAnimals] = useState<AnimalDto[]>([])
  const [isOpenAnimalTypesModal, setOpenAnimalTypesModal] = useState(false)
  const [isOpenAnimalNamesModal, setOpenAnimalNamesModal] = useState(false)
  const [searchPlot, setSearchPlot] = useState<string>("")
  const [isOpenFiltersModal, setOpenFiltersModal] = useState(false)

  useEffect(() => {
    const getAnimalsByType = async () => {
      try {
        const res = await commonService.getAnimals({
          animalType: activeAnimalType ?? ""
        })
        if (res.data) {
          setAnimals(res.data.content)
        }
      } catch (error) {}
    }
    getAnimalsByType()
  }, [activeAnimalType])

  useEffect(() => {
    if (animalIds && animals.length > 0) {
      const activeAnimals = animals.filter(animal =>
        animalIds.includes(animal.id)
      )
      activeAnimals && setActiveAnimals(activeAnimals)
    }
  }, [animalIds, animals])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (searchPlot) {
      setActiveAnimals([])
      setActiveAnimalType(null)
      params.delete("animalIds")
      params.delete("animalType")
      params.set("plotName", searchPlot)
    } else {
      params.delete("plotName")
    }

    router.push(`?${params.toString()}`)
  }, [searchPlot, router, searchParams])

  const selectAnimalType = (animalType: AnimalType | null) => {
    setActiveAnimalType(animalType)
  }

  const sortedByAnimalType = () => {
    const params = new URLSearchParams(searchParams)
    if (activeAnimalType) {
      params.set("animalType", activeAnimalType)
    } else {
      params.delete("animalType")
    }
    params.delete("animalIds")
    replace(`${pathname}?${params.toString()}`)
    setActiveAnimals([])
    setOpenAnimalTypesModal(false)
  }

  const sortedByAnimals = (animals: AnimalDto[]) => {
    const params = new URLSearchParams(searchParams)
    if (animals.length > 0) {
      const animalsIds = animals.map(animal => animal.id)
      params.set("animalIds", animalsIds.join(","))
    } else {
      params.delete("animalIds")
    }
    replace(`${pathname}?${params.toString()}`)
    setOpenAnimalNamesModal(false)
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearchPlot(searchValue)
  }

  return (
    <>
      <div className="plotDescriptions-head">
        <div className="plotDescriptions-head__actions">
          <h2>{t("main.subtitle")}</h2>
          <Button
            endIcon="filter"
            onClick={() => setOpenFiltersModal(true)}
            className={classMerge(
              "mobile-filter-btn",
              activeAnimalType || activeAnimals.length > 0 ? "active" : ""
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
            <FilterButton onClick={() => setOpenAnimalNamesModal(true)}>
              {activeAnimals.length > 0
                ? activeAnimals.map(animal => animal.name).join(", ")
                : t("main.animal-name-select.title")}
            </FilterButton>
          </div>
        </div>
        <div className="plotDescriptions-head__search">
          <Input
            placeholder={t("main.search")}
            value={searchPlot}
            onChange={changeHandler}
            endIcon="search"
          />
        </div>
      </div>
      {isOpenAnimalTypesModal && (
        <AnimalTypesModal
          activeAnimalType={activeAnimalType}
          selectAnimalType={selectAnimalType}
          close={() => setOpenAnimalTypesModal(false)}
          onSubmit={sortedByAnimalType}
        />
      )}
      {isOpenAnimalNamesModal && (
        <AnimalNamesModal
          animals={animals}
          activeAnimals={activeAnimals}
          setActiveAnimals={setActiveAnimals}
          close={() => setOpenAnimalNamesModal(false)}
          onSubmit={sortedByAnimals}
        />
      )}
      {isOpenFiltersModal &&
        !isOpenAnimalTypesModal &&
        !isOpenAnimalNamesModal && (
          <FiltersModal
            activeAnimalType={activeAnimalType}
            setActiveAnimalType={setActiveAnimalType}
            setOpenAnimalTypesModal={() => setOpenAnimalTypesModal(true)}
            activeAnimals={activeAnimals}
            setActiveAnimals={setActiveAnimals}
            setOpenAnimalNamesModal={() => setOpenAnimalNamesModal(true)}
            close={() => setOpenFiltersModal(false)}
          />
        )}
    </>
  )
}

export default PlotDescriptionsHead
