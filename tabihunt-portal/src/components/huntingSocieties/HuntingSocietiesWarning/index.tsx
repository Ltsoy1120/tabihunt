import Button from "@/components/UI/buttons/Button"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import "./style.scss"

const HuntingSocietiesWarning = () => {
  const { t } = useTranslation()
  const params = useParams()
  return (
    <div className="hunting-societies-empty">
      <p>{t("warning.text")}</p>
      <Link href={`/${params.locale}/register`}>
        <Button>{t("warning.register-button")}</Button>
      </Link>
      <span>
        {t("warning.has-account")}{" "}
        <Link href={`/${params.locale}/login`}>
          {t("warning.login-button")}
        </Link>
      </span>
    </div>
  )
}

export default HuntingSocietiesWarning
