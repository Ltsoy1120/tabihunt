"use client"
import Input from "@/components/UI/Input"
import useIsMobile from "@/hooks/useIsMobile"
import { VoucherAnimalDto } from "@/models/vouchers"
import React, { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import VoucherAnimalCard from "../VoucherAnimalCard"
import VoucherAnimalsSlider from "../VoucherAnimalsSlider"
import "./style.scss"

interface VoucherAnimalsProps {
  voucherAnimals: VoucherAnimalDto[]
}

const VoucherAnimals = ({ voucherAnimals }: VoucherAnimalsProps) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [searchAnimal, setSearchAnimal] = useState<string>("")
  const [filteredAnimals, setFilteredAnimals] =
    useState<VoucherAnimalDto[]>(voucherAnimals)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearchAnimal(searchValue)

    if (searchValue) {
      const filtered = voucherAnimals.filter(animal =>
        animal.animal.name.toLowerCase().includes(searchValue)
      )
      setFilteredAnimals(filtered.length ? filtered : [])
    } else {
      setFilteredAnimals(voucherAnimals)
    }
  }

  return (
    <div className="voucher__animals">
      <h2>{t("page.voucher-animals.title")}</h2>
      <Input
        placeholder={t("page.voucher-animals.search")}
        value={searchAnimal}
        onChange={changeHandler}
        endIcon="search"
      />
      <div className="voucher__animals-list">
        {filteredAnimals?.length ? (
          isMobile ? (
            <VoucherAnimalsSlider animals={filteredAnimals} />
          ) : (
            filteredAnimals.map(animal => (
              <VoucherAnimalCard key={animal.id} voucherAnimal={animal} />
            ))
          )
        ) : (
          <div className="no-results">{t("page.voucher-animals.empty")}</div>
        )}
      </div>
    </div>
  )
}

export default VoucherAnimals
