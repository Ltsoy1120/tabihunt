"use client";
import { commonService } from "@/services/common.service";
import { useAppDispatch, useAppSelector } from "@/store";
import { getVersion } from "@/store/actions/commonActions";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../UI/Icon";
import "./style.scss";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://api.tabihunt.kz/";

const Footer = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const version = useAppSelector((state) => state.common.version);

  useEffect(() => {
    !version && dispatch(getVersion());
  }, [version]);

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="col">
          <div className="logo">
            <Image
              src="/static/images/logo.png"
              alt="logo"
              width={140}
              height={40}
            />
          </div>
          <p>{t("footer.text")}</p>
          <div className="socials">
            <a href="https://www.instagram.com/tabihunt.kz?igsh=MThvODM3cGJqMXlrZw==">
              <Icon name="instagram" size={26} />
            </a>
            <a href="https://wa.me/+77017500793">
              <Icon name="whatsapp" size={26} />
            </a>
            <a href="https://t.me/tabihunt">
              <Icon name="telegram" size={26} />
            </a>
            <a href="https://www.facebook.com/p/tabihunt-61568330158314/">
              <Icon name="fasebook" size={26} />
            </a>
          </div>
        </div>
        <div className="col">
          <h3>{t("footer.documents.title")}</h3>
          <div className="documents">
            <Link href={`${BASE_URL}static/terms-of-usage.pdf`}>
              {t("footer.documents.offer-agreement")}
            </Link>
            <Link href={`${BASE_URL}static/privacy-policy.pdf`}>
              {t("footer.documents.privacy-policy")}
            </Link>
            <Link href={`${BASE_URL}static/online-payments.pdf`}>
              {t("footer.documents.online-payments")}
            </Link>
          </div>
        </div>
        <div className="col">
          <h3>{t("footer.regulatory-framework.title")}</h3>
          <div className="documents">
            <Link href={`${BASE_URL}static/wildlife-protection.pdf`}>
              {t("footer.regulatory-framework.animal-protection")}
            </Link>
            <Link href={`${BASE_URL}static/approval-hunting-rules.pdf`}>
              {t("footer.regulatory-framework.hunting-rules")}
            </Link>
            <Link href={`${BASE_URL}static/approval-voucher-form-rules.pdf`}>
              {t("footer.regulatory-framework.rules-for-vouchers")}
            </Link>
            <Link href={`${BASE_URL}static/rules-civil-service-weapons.pdf`}>
              {t("footer.regulatory-framework.rules-for-weapons")}
            </Link>
          </div>
        </div>
        <div className="col">
          <h3>{t("footer.contacts.title")}</h3>
          <a href="tel:+77017500793">
            <Icon name="phone" size={20} />
            +7(701) 750-07-93
          </a>
          <a href="mailto:info@tabihunt.kz">
            <Icon name="email" size={20} />
            info@tabihunt.kz
          </a>
          <div className="pages" style={{ marginTop: "15px" }}>
            <h3>{t("footer.pages.title")}</h3>
            <Link href={`/${params.locale}/partners`}>
              {t("footer.pages.partners")}
            </Link>
          </div>
        </div>
      </div>
      <p className="footer__copyrighter">
        {t("footer.copyrighter")}: {version}.
      </p>
    </footer>
  );
};

export default Footer;
