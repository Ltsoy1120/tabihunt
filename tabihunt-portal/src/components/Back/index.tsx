"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Icon from "../UI/Icon";
import "./style.scss";

interface BackProps {
  isMobile?: boolean;
}

const Back = ({ isMobile }: BackProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const fromPayment = localStorage?.getItem("fromPayment");

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {!fromPayment ? (
        <div className="back" onClick={handleBack}>
          <Icon name="arrow-left" size={16} />
          {!isMobile && <span>{t("back")}</span>}
        </div>
      ) : null}
    </>
  );
};

export default Back;
