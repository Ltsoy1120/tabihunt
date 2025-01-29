import { AuthStateType } from "@/app/[locale]/(auth)/login/page"
import { ResetPasswordStateType } from "@/app/[locale]/(auth)/reset-password/page"
import Input from "@/components/UI/Input"
import Tabs from "@/components/UI/Tabs"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"

interface AuthTabsProps {
  activeTab: string
  emailError: boolean
  phoneError: boolean
  setActiveTab: Dispatch<SetStateAction<string>>
  state: AuthStateType | ResetPasswordStateType
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthTabs = ({
  activeTab,
  emailError,
  phoneError,
  setActiveTab,
  state,
  onChangeHandler
}: AuthTabsProps) => {
  const { t } = useTranslation("auth")

  const authTabs = [
    { value: "email", title: t("auth-tabs.email") },
    { value: "phoneNumber", title: t("auth-tabs.phoneNumber") }
  ]

  const getActiveContent = () => {
    switch (activeTab) {
      case "email":
        return (
          <Input
            name="email"
            placeholder={t("placeholder.email")}
            autoComplete="on"
            autoFocus
            value={state.email ?? ""}
            onChange={onChangeHandler}
            error={emailError}
          />
        )
      case "phoneNumber":
        return (
          <Input
            name="phoneNumber"
            placeholder="+7"
            type="tel"
            autoComplete="on"
            autoFocus
            value={state.phoneNumber ?? ""}
            onChange={onChangeHandler}
            error={phoneError}
          />
        )
    }
  }

  return (
    <Tabs
      optionTabs={authTabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      activeContent={getActiveContent()}
    />
  )
}

export default AuthTabs
