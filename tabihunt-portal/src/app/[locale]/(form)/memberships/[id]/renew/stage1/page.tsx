"use client";
import React, { useState } from "react";
import Icon from "@/components/UI/Icon";
import { useAppSelector } from "@/store";
import { formatDate } from "@/helpers/common";
import "./style.scss";
import useIsMobile from "@/hooks/useIsMobile";
import Button from "@/components/UI/buttons/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import Loader from "@/components/loaders/Loader";
import { useTranslation } from "react-i18next";

const MembershipRenewStage1 = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const params = useParams();
  const { me } = useAppSelector((state) => state.hunters);
  const [personalShow, setPersonalShow] = useState(false);
  const [addressShow, setAddressShow] = useState(false);

  return (
    <>
      {me ? (
        <div className="membershipsRenew-stage1">
          <h2>{t("form.stage1.title")}</h2>
          <p>{`${me?.lastname} ${me?.firstname} ${me?.patronymic}`}</p>
          <div className="info">
            <div className="personal__card">
              <h3 onClick={() => setPersonalShow(!personalShow)}>
                {t("form.stage1.personal.title")}
                <Icon
                  name={personalShow ? "arrow-up" : "arrow-down"}
                  size={16}
                />
              </h3>
              {personalShow && (
                <div className="data">
                  <div className="data__item">
                    <span>{t("form.stage1.personal.email")}</span>
                    <p>{me?.user.email}</p>
                  </div>
                  <div className="data__item">
                    <span>{t("form.stage1.personal.phoneNumber")}</span>
                    <p>{me?.user.phoneNumber}</p>
                  </div>
                  <div className="data__item">
                    <span>{t("form.stage1.personal.dateOfBirth")}</span>
                    <p>{me?.dateOfBirth}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="personal__card">
              <h3 onClick={() => setAddressShow(!addressShow)}>
                {t("form.stage1.address.title")}
                <Icon
                  name={addressShow ? "arrow-up" : "arrow-down"}
                  size={16}
                />
              </h3>
              {addressShow && (
                <div className="data">
                  <div className="data__row">
                    <div className="data__col">
                      <div className="data__item">
                        <span>{t("form.stage1.address.region")}</span>
                        <p>{me?.address.region.name}</p>
                      </div>
                      <div className="data__item">
                        <span>{t("form.stage1.address.city")}</span>
                        <p>{me?.address.city}</p>
                      </div>
                      <div className="data__item">
                        <span>{t("form.stage1.address.street")}</span>
                        <p>{me?.address.street}</p>
                      </div>
                    </div>
                    <div className="data__col">
                      <div className="data__item">
                        <span>{t("form.stage1.address.houseNumber")}</span>
                        <p>{me?.address.houseNumber}</p>
                      </div>
                      <div className="data__item">
                        <span>{t("form.stage1.address.flatNumber")}</span>
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
            <div className="hunting-lisense__card">
              <div className="hunting-lisense__card__row">
                <span>
                  {t("form.stage1.hunting-lisense.huntingLicenseNumber")}
                </span>
                <span>
                  {t("form.stage1.hunting-lisense.huntingLicenseValid")}
                </span>
              </div>
              <div className="hunting-lisense__card__row">
                <p>{me?.huntingLicenseNumber}</p>
                <p>
                  {me?.huntingLicenseValid &&
                    formatDate(me.huntingLicenseValid)}
                </p>
              </div>
            </div>

            <div className="hunting-lisense__card">
              <div
                className="hunting-lisense__card__row"
                style={{ paddingBottom: "20px" }}
              >
                <span>{t("form.stage1.memberships.memberships")}</span>
                <span>{t("form.stage1.memberships.period")}</span>
              </div>
              {me?.memberships &&
                me?.memberships?.length > 0 &&
                me.memberships.map((membership) => (
                  <div
                    className="hunting-lisense__card__row"
                    key={membership.id}
                  >
                    <p>{membership.huntingSociety?.name}</p>
                    <p>
                      {params.locale === "ru"
                        ? `С ${formatDate(
                            membership.membershipIssued
                          )} По ${formatDate(membership.membershipExpiry)}`
                        : `${formatDate(
                            membership.membershipIssued
                          )} бастап ${formatDate(
                            membership.membershipExpiry
                          )} дейін`}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          {isMobile && (
            <Link
              href={`/${params.locale}/memberships/${params.id}/renew/stage2`}
            >
              <Button>{t("form.stage1.btn")}</Button>
            </Link>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "100px" }}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default MembershipRenewStage1;
