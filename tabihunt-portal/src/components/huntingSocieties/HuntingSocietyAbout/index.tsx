"use client"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Button from "@/components/UI/buttons/Button"
import { HuntingSocietyDto } from "@/models/huntingSociety"
import { useAppDispatch, useAppSelector } from "@/store"
import { getMeHunter } from "@/store/actions/hunterActions"
import Link from "next/link"
import "./style.scss"
import { useTranslation } from "react-i18next"

interface HuntingSocietyAboutProps {
  huntingSociety: HuntingSocietyDto
}

const HuntingSocietyAbout = ({ huntingSociety }: HuntingSocietyAboutProps) => {
  const { t } = useTranslation()
  const params = useParams()
  const dispatch = useAppDispatch()
  const [isAuth, setIsAuth] = useState(false)
  const { me } = useAppSelector(state => state.hunters)
  const membership =
    me?.memberships &&
    me?.memberships.find(
      membership => membership.huntingSociety?.id === huntingSociety.id
    )

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("accessToken"))
  }, [])

  useEffect(() => {
    if (!me) {
      dispatch(getMeHunter())
    }
  }, [dispatch, me])

  return (
    <div className="huntingSociety__about">
      <div
        className="huntingSociety__about__info-description"
        dangerouslySetInnerHTML={{ __html: huntingSociety.about }}
      />
      {isAuth && membership?.id && (
        <Link
          href={`/${params.locale}/memberships/${membership.id}/renew/stage1`}
        >
          <Button>{t("page.about.renew-membership-btn")}</Button>
        </Link>
      )}
    </div>
  )
}

export default HuntingSocietyAbout
