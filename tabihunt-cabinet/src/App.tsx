import React, { Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
const AuthPage = React.lazy(() => import("./pages/auth/AuthPage"))
const NewPasswordPage = React.lazy(() => import("./pages/auth/NewPasswordPage"))
const OtpPage = React.lazy(() => import("./pages/auth/OtpPage"))
const AccountPage = React.lazy(() => import("./pages/account/AccountPage"))
const RecoveryPasswordPage = React.lazy(
  () => import("./pages/auth/RecoveryPasswordPage")
)
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const PurchasedVouchers = React.lazy(
  () => import("./pages/purchasedVouchers/PurchasedVouchers")
)
const Vouchers = React.lazy(() => import("./pages/vouchers/Vouchers"))
const Limits = React.lazy(() => import("./pages/limits/Limits"))
const Reports = React.lazy(() => import("./pages/reports/Reports"))
const Memberships = React.lazy(() => import("./pages/memberships/Memberships"))
const Huntsmen = React.lazy(() => import("./pages/huntsmen/Huntsmen"))
const GeneralError = React.lazy(() => import("./components/GeneralError"))
const AccountChangePhoneOrEmailPage = React.lazy(
  () => import("./pages/account/component/AccountChangePhoneOrEmailPage")
)
const FormLayout = React.lazy(() => import("./layouts/FormLayout"))
const LimitStep1 = React.lazy(() => import("./pages/limits/steps/LimitStep1"))
const LimitStep2 = React.lazy(() => import("./pages/limits/steps/LimitStep2"))
const LimitStep3 = React.lazy(() => import("./pages/limits/steps/LimitStep3"))
const NewHuntsmanStep1 = React.lazy(
  () => import("./pages/huntsmen/steps/NewHuntsmanStep1")
)
const NewHuntsmanStep2 = React.lazy(
  () => import("./pages/huntsmen/steps/NewHuntsmanStep2")
)
const NewHuntsmanStep3 = React.lazy(
  () => import("./pages/huntsmen/steps/NewHuntsmanStep3")
)
const MainPage = React.lazy(() => import("./pages/MainPage"))
const NewHuntsmanStep4 = React.lazy(
  () => import("./pages/huntsmen/steps/NewHuntsmanStep4")
)
const VoucherStep1 = React.lazy(
  () => import("./pages/vouchers/steps/VoucherStep1")
)
const VoucherStep2 = React.lazy(
  () => import("./pages/vouchers/steps/VoucherStep2")
)
const VoucherStep3 = React.lazy(
  () => import("./pages/vouchers/steps/VoucherStep3")
)
const VoucherStep4 = React.lazy(
  () => import("./pages/vouchers/steps/VoucherStep4")
)
const VoucherStep5 = React.lazy(
  () => import("./pages/vouchers/steps/VoucherStep5")
)
const Voucher = React.lazy(() => import("./pages/vouchers/Voucher"))
const MembershipStep1 = React.lazy(
  () => import("./pages/memberships/steps/MembershipStep1")
)
const MembershipStep2 = React.lazy(
  () => import("./pages/memberships/steps/MembershipStep2")
)
const MembershipStep3 = React.lazy(
  () => import("./pages/memberships/steps/MembershipStep3")
)
const MembershipStep4 = React.lazy(
  () => import("./pages/memberships/steps/MembershipStep4")
)
const MembershipStep5 = React.lazy(
  () => import("./pages/memberships/steps/MembershipStep5")
)
const PlotDescriptions = React.lazy(
  () => import("./pages/plotDescriptions/PlotDescriptions")
)
const SettingsMembershipPricesStep1 = React.lazy(
  () => import("./pages/memberships/SettingsMembershipPricesStep1")
)
const SettingsMembershipPricesStep2 = React.lazy(
  () => import("./pages/memberships/SettingsMembershipPricesStep2")
)
const PlotDescriptionStep1 = React.lazy(
  () => import("./pages/plotDescriptions/steps/PlotDescriptionStep1")
)
const PlotDescriptionStep2 = React.lazy(
  () => import("./pages/plotDescriptions/steps/PlotDescriptionStep2")
)
const PlotDescriptionStep3 = React.lazy(
  () => import("./pages/plotDescriptions/steps/PlotDescriptionStep3")
)
const PlotDescriptionStep5 = React.lazy(
  () => import("./pages/plotDescriptions/steps/PlotDescriptionStep5")
)
const PlotDescription = React.lazy(
  () => import("./pages/plotDescriptions/PlotDescription")
)

const HuntingSociety = React.lazy(
  () => import("./pages/huntingSociety/HuntingSociety")
)
const HuntingSocietyStep1 = React.lazy(
  () => import("./pages/huntingSociety/steps/HuntingSocietyStep1")
)
const HuntingSocietyStep2 = React.lazy(
  () => import("./pages/huntingSociety/steps/HuntingSocietyStep2")
)
const HuntingSocietyStep3 = React.lazy(
  () => import("./pages/huntingSociety/steps/HuntingSocietyStep3")
)
const PurchasedVoucherStep1 = React.lazy(
  () => import("./pages/purchasedVouchers/steps/PurchasedVoucherStep1")
)
const PurchasedVoucherStep2 = React.lazy(
  () => import("./pages/purchasedVouchers/steps/PurchasedVoucherStep2")
)

const PurchasedVoucherStep3 = React.lazy(
  () => import("./pages/purchasedVouchers/steps/PurchasedVoucherStep3")
)

const PurchasedVoucherStep4 = React.lazy(
  () => import("./pages/purchasedVouchers/steps/PurchasedVoucherStep4")
)

const PageLayout = React.lazy(() => import("./layouts/PageLayout"))
const EditLimit = React.lazy(() => import("./pages/limits/EditLimit"))
const PlotDescriptionStep4 = React.lazy(
  () => import("./pages/plotDescriptions/steps/PlotDescriptionStep4")
)

import "./assets/scss/base.scss"
import Loader from "./components/UI/loaders/Loader"

function App() {
  return (
    <>
      <GeneralError />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/">
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route index element={<AuthPage />} />
            <Route path="new-password" element={<NewPasswordPage />} />
            <Route
              path="recovery-password"
              element={<RecoveryPasswordPage />}
            />
            <Route path="otp" element={<OtpPage />} />
            <Route
              path="/account/:type"
              element={<AccountChangePhoneOrEmailPage />}
            />
            <Route path="/account-verify/:type" element={<OtpPage />} />

            <Route element={<MainLayout />}>
              <Route path="/main" element={<MainPage />} />
              <Route
                path="/purchased-vouchers"
                element={<PurchasedVouchers />}
              />
              <Route path="/vouchers" element={<Vouchers />} />
              <Route path="/memberships" element={<Memberships />} />
              <Route path="/huntsmen" element={<Huntsmen />} />
              <Route path="/limits" element={<Limits />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/plot-descriptions" element={<PlotDescriptions />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/hunting-society" element={<HuntingSociety />} />
            </Route>
            <Route element={<PageLayout />}>
              <Route
                path="/plot-description/:plotDescriptionId"
                element={<PlotDescription />}
              />
              <Route path="/voucher/:voucherId" element={<Voucher />} />
              <Route path="/edit-limit/:limitId" element={<EditLimit />} />
            </Route>
            <Route element={<FormLayout />}>
              <Route path="/new-limit-step1" element={<LimitStep1 />} />
              <Route path="/new-limit-step2" element={<LimitStep2 />} />
              <Route path="/new-limit-step3" element={<LimitStep3 />} />

              <Route
                path="/new-huntsman-step1"
                element={<NewHuntsmanStep1 />}
              />
              <Route
                path="/new-huntsman-step2"
                element={<NewHuntsmanStep2 />}
              />
              <Route
                path="/new-huntsman-step3"
                element={<NewHuntsmanStep3 />}
              />
              <Route
                path="/new-huntsman-step4"
                element={<NewHuntsmanStep4 />}
              />
              <Route
                path="/edit-huntsman-step1/:huntsmanId"
                element={<NewHuntsmanStep1 />}
              />
              <Route
                path="/edit-huntsman-step2/:huntsmanId"
                element={<NewHuntsmanStep2 />}
              />
              <Route
                path="/edit-huntsman-step3/:huntsmanId"
                element={<NewHuntsmanStep3 />}
              />
              <Route
                path="/edit-huntsman-step4/:huntsmanId"
                element={<NewHuntsmanStep4 />}
              />
              <Route path="/new-voucher-step1" element={<VoucherStep1 />} />
              <Route path="/new-voucher-step2" element={<VoucherStep2 />} />
              <Route path="/new-voucher-step3" element={<VoucherStep3 />} />
              <Route path="/new-voucher-step4" element={<VoucherStep4 />} />
              <Route path="/new-voucher-step5" element={<VoucherStep5 />} />
              <Route
                path="/edit-voucher-step1/:voucherId"
                element={<VoucherStep1 />}
              />
              <Route
                path="/edit-voucher-step2/:voucherId"
                element={<VoucherStep2 />}
              />
              <Route
                path="/edit-voucher-step3/:voucherId"
                element={<VoucherStep3 />}
              />
              <Route
                path="/edit-voucher-step4/:voucherId"
                element={<VoucherStep4 />}
              />
              <Route
                path="/edit-voucher-step5/:voucherId"
                element={<VoucherStep5 />}
              />

              <Route
                path="/new-membership-step1"
                element={<MembershipStep1 />}
              />
              <Route
                path="/new-membership-step2"
                element={<MembershipStep2 />}
              />
              <Route
                path="/new-membership-step3"
                element={<MembershipStep3 />}
              />
              <Route
                path="/new-membership-step4"
                element={<MembershipStep4 />}
              />
              <Route
                path="/new-membership-step5"
                element={<MembershipStep5 />}
              />
              <Route
                path="/edit-hunter-membership-step1/:membershipId"
                element={<MembershipStep1 />}
              />
              <Route
                path="/edit-hunter-membership-step2/:membershipId"
                element={<MembershipStep2 />}
              />
              <Route
                path="/edit-hunter-membership-step3/:membershipId"
                element={<MembershipStep3 />}
              />
              <Route
                path="/edit-hunter-membership-step4/:membershipId"
                element={<MembershipStep5 />}
              />
              <Route
                path="/renew-membership-step1/:membershipId"
                element={<MembershipStep4 />}
              />
              <Route
                path="/renew-membership-step2/:membershipId"
                element={<MembershipStep5 />}
              />
              <Route
                path="/settings-membership-prices-step1"
                element={<SettingsMembershipPricesStep1 />}
              />
              <Route
                path="/settings-membership-prices-step2"
                element={<SettingsMembershipPricesStep2 />}
              />
              <Route
                path="/new-plot-description-step1"
                element={<PlotDescriptionStep1 />}
              />
              <Route
                path="/new-plot-description-step2"
                element={<PlotDescriptionStep2 />}
              />
              <Route
                path="/new-plot-description-step3"
                element={<PlotDescriptionStep3 />}
              />
              <Route
                path="/new-plot-description-step4"
                element={<PlotDescriptionStep4 />}
              />
              <Route
                path="/new-plot-description-step5"
                element={<PlotDescriptionStep5 />}
              />
              <Route
                path="/edit-plot-description-step1/:plotDescriptionId"
                element={<PlotDescriptionStep1 />}
              />
              <Route
                path="/edit-plot-description-step2/:plotDescriptionId"
                element={<PlotDescriptionStep2 />}
              />
              <Route
                path="/edit-plot-description-step3/:plotDescriptionId"
                element={<PlotDescriptionStep3 />}
              />
              <Route
                path="/edit-plot-description-step4/:plotDescriptionId"
                element={<PlotDescriptionStep4 />}
              />
              <Route
                path="/edit-plot-description-step5/:plotDescriptionId"
                element={<PlotDescriptionStep5 />}
              />
              <Route
                path={"/new-hunting-society-step1"}
                element={<HuntingSocietyStep1 />}
              />
              <Route
                path={"/new-hunting-society-step2"}
                element={<HuntingSocietyStep2 />}
              />
              <Route
                path={"/new-hunting-society-step3"}
                element={<HuntingSocietyStep3 />}
              />
              <Route
                path={"/edit-hunting-society-step1"}
                element={<HuntingSocietyStep1 />}
              />
              <Route
                path={"/edit-hunting-society-step2"}
                element={<HuntingSocietyStep2 />}
              />
              <Route
                path={"/edit-hunting-society-step3"}
                element={<HuntingSocietyStep3 />}
              />

              <Route
                path={"/new-purchased-vouchers-step1/:purchasedId"}
                element={<PurchasedVoucherStep1 />}
              />
              <Route
                path={"/new-purchased-vouchers-step2/:purchasedId"}
                element={<PurchasedVoucherStep2 />}
              />
              <Route
                path={"/new-purchased-vouchers-step3/:purchasedId"}
                element={<PurchasedVoucherStep3 />}
              />
              <Route
                path={"/new-purchased-vouchers-step4/:purchasedId"}
                element={<PurchasedVoucherStep4 />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
