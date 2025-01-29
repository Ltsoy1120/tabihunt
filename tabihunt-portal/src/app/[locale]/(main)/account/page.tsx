"use client"
import React, { useEffect, useState } from "react"
import Button from "@/components/UI/buttons/Button"
import Icon from "@/components/UI/Icon"
import { useAppDispatch, useAppSelector } from "@/store"
import ReportsSlider from "@/components/account/ReportsSlider"
import TextButton from "@/components/UI/buttons/TextButton"
import Link from "next/link"
import VoucherSlider from "@/components/account/VouchersSlider"
import PhotoModal from "@/components/modals/PhotoModal"
import Avatar from "@/components/account/Avatar"
import EditAccountModal from "@/components/modals/EditAccountModal"
import "./style.scss"
import { formatDate } from "@/helpers/common"
import PageLoader from "@/components/loaders/PageLoader"
import { getMePurchasedVouchers } from "@/store/actions/vouchersActions"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"
import useIsMobile from "@/hooks/useIsMobile"

const AccountPage = () => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const params = useParams()
  const dispatch = useAppDispatch()
  const [huntingLicenseShow, setHuntingLicenseShow] = useState(false)
  const [isOpenEditAccountModal, setOpenEditAccountModal] = useState(false)
  const [personalShow, setPersonalShow] = useState(false)
  const [addressShow, setAddressShow] = useState(false)
  const [identificationShow, setIdentificationShow] = useState(false)
  const [isOpenPhotoModal, setOpenPhotoModal] = useState(false)
  const { me } = useAppSelector(state => state.hunters)
  const { meVouchers } = useAppSelector(state => state.vouchers)

  useEffect(() => {
    dispatch(getMePurchasedVouchers())
  }, [dispatch])

  return (
    <>
      {me ? (
        <div className="account-page">
          <div className="account-page__block">
            <h2>
              {t("personal-info.title")}
              {isMobile && (
                <Icon
                  name="edit-mobile"
                  size={40}
                  className={"icon-ml"}
                  onClick={() => setOpenEditAccountModal(true)}
                />
              )}
            </h2>
            <div className="personal-data">
              <div className="btns">
                <Button
                  onClick={() => setHuntingLicenseShow(!huntingLicenseShow)}
                  endIcon="circle-plus"
                  className="gray-bg"
                >
                  {huntingLicenseShow
                    ? t("personal-info.personal-btn")
                    : t("personal-info.hunting-license-btn")}
                </Button>
                {!isMobile && (
                  <Button
                    onClick={() => setOpenEditAccountModal(true)}
                    endIcon="edit"
                  >
                    {t("personal-info.edit-btn")}
                  </Button>
                )}
              </div>
              <div className="personal-data__content">
                <div className="personal-data__avatar">
                  <Avatar me={me} openModal={() => setOpenPhotoModal(true)} />
                  <p>{`${me?.lastname} ${me?.firstname} ${me?.patronymic}`}</p>
                </div>
                {huntingLicenseShow ? (
                  <div className="hunting-lisense">
                    <div className="hunting-lisense__card">
                      <div className="hunting-lisense__card__row">
                        <span>
                          {t(
                            "personal-info.hunting-license.huntingLicenseNumber"
                          )}
                        </span>
                        <span>
                          {t(
                            "personal-info.hunting-license.huntingLicenseValid"
                          )}
                        </span>
                      </div>
                      <div className="hunting-lisense__card__row">
                        <p>{me.huntingLicenseNumber}</p>
                        <p>
                          {me.huntingLicenseValid &&
                            formatDate(me.huntingLicenseValid)}
                        </p>
                      </div>
                    </div>
                    <div className="hunting-lisense__card">
                      <div className="hunting-lisense__card__row">
                        <span>
                          {t("personal-info.hunting-license.membership")}
                        </span>
                        <span>{t("personal-info.hunting-license.period")}</span>
                      </div>
                      {me?.memberships && me?.memberships?.length > 0 ? (
                        me?.memberships?.map(membership => (
                          <div
                            key={membership.id}
                            className="hunting-lisense__card__col"
                          >
                            <div className="hunting-lisense__card__row">
                              <p>{membership.huntingSociety?.name}</p>
                              <p>
                                {params.locale === "ru"
                                  ? `С ${formatDate(
                                      membership.membershipIssued
                                    )} По ${formatDate(
                                      membership.membershipExpiry
                                    )}`
                                  : `${formatDate(
                                      membership.membershipIssued
                                    )} бастап ${formatDate(
                                      membership.membershipExpiry
                                    )} дейін`}
                              </p>
                            </div>
                            {membership && (
                              <Link
                                href={`/${params.locale}/memberships/${membership.id}/renew/stage1`}
                              >
                                <TextButton>
                                  {t("personal-info.hunting-license.renew-btn")}
                                </TextButton>
                              </Link>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>{t("personal-info.hunting-license.empty")}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="info">
                    <div className="info__col">
                      <div className="info__card">
                        <h2 onClick={() => setPersonalShow(!personalShow)}>
                          {t("personal-info.personal.title")}
                          <Icon
                            name={personalShow ? "arrow-up" : "arrow-down"}
                            size={16}
                          />
                        </h2>
                        {personalShow && (
                          <div className="data">
                            <div className="data__item">
                              <span>{t("personal-info.personal.email")}</span>
                              <p>{me?.user.email}</p>
                            </div>
                            <div className="data__item">
                              <span>
                                {t("personal-info.personal.phoneNumber")}
                              </span>
                              <p>{me?.user.phoneNumber}</p>
                            </div>
                            <div className="data__item">
                              <span>
                                {t("personal-info.personal.dateOfBirth")}
                              </span>
                              <p>{formatDate(me?.dateOfBirth)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="info__card">
                        <h2
                          onClick={() =>
                            setIdentificationShow(!identificationShow)
                          }
                        >
                          {t("personal-info.identification.title")}
                          <Icon
                            name={
                              identificationShow ? "arrow-up" : "arrow-down"
                            }
                            size={16}
                          />
                        </h2>
                        {identificationShow && (
                          <div className="data">
                            <div className="data__item">
                              <span>
                                {t("personal-info.identification.iin")}
                              </span>
                              <p>{me?.iin}</p>
                            </div>
                            <div className="data__item">
                              <span>
                                {t(
                                  "personal-info.identification.identificationNumber"
                                )}
                              </span>
                              <p>{me?.identificationNumber}</p>
                            </div>
                            <div className="data__row">
                              <div className="data__item">
                                <span>
                                  {t(
                                    "personal-info.identification.identificationIssued"
                                  )}
                                </span>
                                <p>
                                  {me?.identificationIssued &&
                                    formatDate(me?.identificationIssued)}
                                </p>
                              </div>
                              <div className="data__item">
                                <span>
                                  {t(
                                    "personal-info.identification.identificationValid"
                                  )}
                                </span>
                                <p>
                                  {me?.identificationValid &&
                                    formatDate(me?.identificationValid)}
                                </p>
                              </div>
                            </div>
                            <div className="data__item">
                              <span>
                                {t(
                                  "personal-info.identification.identificationIssuedBy"
                                )}
                              </span>
                              <p>{me?.identificationIssuedBy}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="info__card">
                      <h2 onClick={() => setAddressShow(!addressShow)}>
                        {t("personal-info.address.title")}
                        <Icon
                          name={addressShow ? "arrow-up" : "arrow-down"}
                          size={16}
                        />
                      </h2>
                      {addressShow && (
                        <div className="data">
                          <div className="data__row">
                            <div className="data__col">
                              <div className="data__item">
                                <span>{t("personal-info.address.region")}</span>
                                <p>{me?.address.region.name}</p>
                              </div>
                              <div className="data__item">
                                <span>{t("personal-info.address.city")}</span>
                                <p>{me?.address.city}</p>
                              </div>
                              <div className="data__item">
                                <span>{t("personal-info.address.street")}</span>
                                <p>{me?.address.street}</p>
                              </div>
                            </div>
                            <div className="data__col">
                              <div className="data__item">
                                <span>
                                  {t("personal-info.address.houseNumber")}
                                </span>
                                <p>{me?.address.houseNumber}</p>
                              </div>
                              <div className="data__item">
                                <span>
                                  {t("personal-info.address.flatNumber")}
                                </span>
                                <p>
                                  {!!me?.address.flatNumber
                                    ? me?.address.flatNumber
                                    : "--"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="account-page__block">
            <h2>{t("me-vouchers.title")}</h2>
            {meVouchers.length > 0 ? (
              <div className="my-vouchers">
                <VoucherSlider meVouchers={meVouchers} />
                <Link href={`/${params.locale}/me/vouchers`}>
                  <TextButton>{t("me-vouchers.button")}</TextButton>
                </Link>
              </div>
            ) : (
              <p>{t("me-vouchers.empty")}</p>
            )}
          </div>
          <div className="account-page__block">
            <h2>{t("me-reports.title")}</h2>
            {meVouchers.length > 0 ? (
              <div className="my-reports">
                <ReportsSlider meVouchers={meVouchers} />
                <Link href={`/${params.locale}/me/reports`}>
                  <TextButton>{t("me-reports.button")}</TextButton>
                </Link>
              </div>
            ) : (
              <p>{t("me-reports.empty")}</p>
            )}
          </div>
        </div>
      ) : (
        <PageLoader />
      )}
      {isOpenPhotoModal && (
        <PhotoModal close={() => setOpenPhotoModal(false)} />
      )}
      {isOpenEditAccountModal && (
        <EditAccountModal close={() => setOpenEditAccountModal(false)} />
      )}
    </>
  )
}

export default AccountPage
