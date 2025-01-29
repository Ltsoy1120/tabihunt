import Icon from "@/components/UI/Icon"
import { useAppSelector } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"

const ProgressBar = () => {
  const { t } = useTranslation()
  const params = useParams()
  const pathname = usePathname()
  const { newHunterData } = useAppSelector(state => state.hunters)

  const hasPersonalData =
    newHunterData?.firstname &&
    newHunterData?.lastname &&
    newHunterData?.dateOfBirth &&
    newHunterData?.phoneNumber

  const hasAddressData =
    newHunterData?.address.regionId &&
    newHunterData?.address.city &&
    newHunterData?.address.street &&
    newHunterData?.address.houseNumber

  const hasHuntingLicenseData =
    newHunterData?.huntingLicenseNumber &&
    newHunterData?.huntingLicenseIssued &&
    newHunterData?.huntingLicenseValid

  // const hasIdentificatioData =
  //   newHunterData?.iin &&
  //   newHunterData?.identificationNumber &&
  //   newHunterData?.identificationIssued &&
  //   newHunterData?.identificationIssuedBy

  const steps = [
    {
      path: `/${params.locale}/new-account/personal-data`,
      title: t("form.progress-bar.personal-data"),
      completed: hasPersonalData
    },
    // {
    //   path: `/${params.locale}/new-account/identification`,
    //   title: t("form.progress-bar.identification"),
    //   completed: hasIdentificatioData
    // },
    {
      path: `/${params.locale}/new-account/address`,
      title: t("form.progress-bar.address"),
      completed: hasAddressData
    },
    {
      path: `/${params.locale}/new-account/hunting-license`,
      title: t("form.progress-bar.hunting-license"),
      completed: hasHuntingLicenseData
    }
  ]

  return (
    <div className="progress-bar">
      <Link className="logo" href={"/"}>
        <Image
          src="/static/images/logo.png"
          alt="logo"
          width={140}
          height={40}
        />
      </Link>
      <h2>{t("form.progress-bar.title")}</h2>
      <div className="progress">
        {steps.map(step => (
          <div
            className={`progress__item ${step.completed ? "completed" : ""}`}
            key={step.path}
          >
            <div className="progress__item__title">
              <span>{step.completed && <Icon name="ok" size={16} />}</span>{" "}
              <h3 className={pathname === step.path ? "active" : ""}>
                {step.title}
              </h3>
            </div>
            <div className="progress__item__line"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
