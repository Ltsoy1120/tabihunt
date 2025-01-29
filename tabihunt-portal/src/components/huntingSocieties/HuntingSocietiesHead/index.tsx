"use client"
import HuntingSocietiesModal from "@/components/modals/HuntingSocietiesModal"
import TextButton from "@/components/UI/buttons/TextButton"
import Input from "@/components/UI/Input"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"

const HuntingSocietiesHead = () => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const router = useRouter()
  const hunterParam = searchParams.get("hunter")
  const [activeHuntingSociety, setActiveHuntingSociety] = useState<
    "all" | "me"
  >(hunterParam === "me" ? "me" : "all")
  const [isOpenHuntingSocietiesModal, setOpenHuntingSocietiesModal] =
    useState(false)
  const [searchHuntingSociety, setSearchHuntingSociety] = useState<string>("")

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (searchHuntingSociety) {
      params.set("name", searchHuntingSociety)
    } else {
      params.delete("name")
    }

    router.push(`?${params.toString()}`)
  }, [searchHuntingSociety, router, searchParams])

  const getHutingSocieties = () => {
    const params = new URLSearchParams(searchParams)
    if (activeHuntingSociety === "me") {
      params.set("hunter", "me")
    } else {
      params.delete("hunter")
    }

    router.push(`?${params.toString()}`)
    setOpenHuntingSocietiesModal(false)
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase()
    setSearchHuntingSociety(searchValue)
  }

  return (
    <>
      <div className="hunting-societies-head">
        <div className="hunting-societies-head__actions">
          <TextButton
            endIcon="arrow-down-big"
            onClick={() => setOpenHuntingSocietiesModal(true)}
          >
            {activeHuntingSociety === "me" ? t("select.me") : t("select.all")}
          </TextButton>
        </div>
        <div className="hunting-societies-head__search">
          <Input
            placeholder={t("search")}
            value={searchHuntingSociety}
            onChange={changeHandler}
            endIcon="search"
          />
        </div>
      </div>
      {isOpenHuntingSocietiesModal && (
        <HuntingSocietiesModal
          activeHuntingSociety={activeHuntingSociety}
          setActiveHuntingSociety={setActiveHuntingSociety}
          close={() => setOpenHuntingSocietiesModal(false)}
          onSubmit={getHutingSocieties}
        />
      )}
    </>
  )
}

export default HuntingSocietiesHead
