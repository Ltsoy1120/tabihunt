import { Dispatch, SetStateAction } from "react"
import Input from "../../../../components/UI/Input"
import Tabs from "../../../../components/UI/Tabs"
import { AuthStateType } from "../../AuthPage"
import { ResetPasswordStateType } from "../../RecoveryPasswordPage"

interface AuthTabsProps {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  state: AuthStateType | ResetPasswordStateType
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const authTabs = [
  { value: "email", title: "Почта" },
  { value: "phoneNumber", title: "Номер" }
]

const AuthTabs = ({
  activeTab,
  setActiveTab,
  state,
  onChangeHandler
}: AuthTabsProps) => {
  const getActiveContent = () => {
    switch (activeTab) {
      case "email":
        return (
          <Input
            name="email"
            placeholder="Адрес почты"
            autoComplete="on"
            autoFocus
            value={state.email ?? ""}
            onChange={onChangeHandler}
          />
        )
      case "phoneNumber":
        return (
          <Input
            name="phoneNumber"
            placeholder="+7"
            type="tel"
            autoFocus
            value={state.phoneNumber ?? ""}
            onChange={onChangeHandler}
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
