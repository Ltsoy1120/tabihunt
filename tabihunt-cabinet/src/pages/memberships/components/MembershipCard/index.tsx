import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/UI/buttons/Button";
import EditButton from "../../../../components/UI/buttons/EditButton";
import Tabs from "../../../../components/UI/Tabs";
import {
  formatDate,
  formatPhone,
  getHuntsmanFullName,
} from "../../../../helpers/common";
import { MembershipDto } from "../../../../models/memberships";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getMeCompanyMembershipsRenewals } from "../../../../store/actions/membershipsActions";
import "./style.scss";

interface MembershipCardProps {
  membership: MembershipDto;
}

export const membershipsTabs = [
  { value: "1", title: "Информация" },
  { value: "2", title: "Членство" },
];

const MembershipCard = ({ membership }: MembershipCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const { membershipsRenewals } = useAppSelector((state) => state.memberships);

  useEffect(() => {
    dispatch(getMeCompanyMembershipsRenewals(membership.id));
  }, [membership.id]);

  const hunterUserState = [
    {
      title: "Номер телефона",
      value:
        membership?.hunter?.user?.phoneNumber &&
        formatPhone(membership?.hunter?.user?.phoneNumber),
    },
    {
      title: "Почта",
      value: membership?.hunter?.user?.email,
    },
  ];

  const identificationState = [
    {
      title: "Номер",
      value: membership?.hunter?.identificationNumber,
    },
    {
      title: "ИИН",
      value: membership?.hunter?.iin,
    },
    {
      title: "Дата Рождения",
      value:
        membership?.hunter?.dateOfBirth &&
        formatDate(membership?.hunter?.dateOfBirth),
    },
    {
      title: "Срок годности",
      value:
        membership?.hunter?.identificationValid &&
        formatDate(membership?.hunter?.identificationValid),
    },
    {
      title: "Кем Выдан",
      value: membership?.hunter?.identificationIssuedBy,
    },
  ];

  const huntingLicenseState = [
    {
      title: "Номер",
      value: membership?.hunter?.huntingLicenseNumber,
    },
    {
      title: "Выдано",
      value:
        membership?.hunter?.huntingLicenseIssued &&
        formatDate(membership?.hunter?.huntingLicenseIssued),
    },
    {
      title: "Годен до",
      value:
        membership?.hunter?.huntingLicenseValid &&
        formatDate(membership?.hunter?.huntingLicenseValid),
    },
  ];

  const membershipState = [
    {
      title: "Номер",
      value: membership?.membershipNumber,
    },
    {
      title: "Дата выдачи",
      value: formatDate(membership?.membershipIssued),
    },
  ];

  const editHandler = (membershipId: string) => {
    navigate(`/edit-hunter-membership-step1/${membershipId}`);
  };

  return (
    <div className="membership-card">
      <div className="membership-card__head">
        <div className="membership-card__head-title">
          <h2>{getHuntsmanFullName(membership.hunter)}</h2>
        </div>
        {activeTab === "1" ? (
          <EditButton onClick={() => editHandler(membership.id)} />
        ) : (
          <Button
            endIcon="plus"
            onClick={() => navigate(`/renew-membership-step1/${membership.id}`)}
          >
            Продлить
          </Button>
        )}
      </div>
      <Tabs
        optionTabs={membershipsTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "1" ? (
        <div className="membership-card__info">
          <div className="block">
            <h3>Контактная информация</h3>
            {hunterUserState.map((item) => (
              <div key={item.title} className="block__item">
                <span>{item.title}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="block">
            <h3>Удостоверение личности</h3>
            {identificationState.map((item) => (
              <div key={item.title} className="block__item">
                <span>{item.title}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="block">
            <h3>Охотничье удостоверение</h3>
            {huntingLicenseState.map((item) => (
              <div key={item.title} className="block__item">
                <span>{item.title}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="membership-card__info">
          <div className="block">
            <h3>Членский билет</h3>
            {membershipState.map((item) => (
              <div key={item.title} className="block__item">
                <span>{item.title}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="block">
            <h3>История</h3>
            {membershipsRenewals.map((membership) => (
              <div key={membership.id}>
                <div className="block__item">
                  <span>Взнос за {}</span>
                  <p>Оплачен</p>
                </div>
                <div className="block__item">
                  <span>Продлен</span>
                  <p>{formatDate(membership.createdAt)}</p>
                </div>
                <div className="block__item">
                  <span>Годен до</span>
                  <p>{formatDate(membership.expiryDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipCard;
