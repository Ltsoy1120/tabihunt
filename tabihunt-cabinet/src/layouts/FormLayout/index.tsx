import { Outlet, useLocation } from "react-router-dom"
import HuntsmanFormHeader from "../../components/headers/formHeaders/HuntsmanFormHeader"
import LimitFormHeader from "../../components/headers/formHeaders/LimitFormHeader"
import MembershipFormHeader from "../../components/headers/formHeaders/MembershipFormHeader"
import MembershipPricesFormHeader from "../../components/headers/formHeaders/MembershipPricesFormHeader"
import PlotDescriptionsFormHeader from "../../components/headers/formHeaders/PlotDescriptionsFormHeader"
import VoucherFormHeader from "../../components/headers/formHeaders/VoucherFormHeader"
import HuntingSocietyFormHeader from "../../components/headers/formHeaders/HuntingSocietyFormHeader";
import PurchaseVoucherHeader from "../../components/headers/formHeaders/PurchaseVoucherHeader"
import "./style.scss"

const FormLayout: React.FC = () => {
  const { pathname } = useLocation()

  const getFormHeader = () => {
    switch (true) {
      case pathname.includes("limit-step"):
        return <LimitFormHeader />
      case pathname.includes("huntsman-step"):
        return <HuntsmanFormHeader />
      case pathname.includes("voucher-step"):
        return <VoucherFormHeader />
      case pathname.includes("membership-step"):
        return <MembershipFormHeader />
      case pathname.includes("settings-membership-prices"):
        return <MembershipPricesFormHeader />
      case pathname.includes("plot-description"):
        return <PlotDescriptionsFormHeader />
      case pathname.includes("hunting-society"):
        return <HuntingSocietyFormHeader />
      case pathname.includes("purchased-vouchers"):
        return <PurchaseVoucherHeader />
        

        
      default:
        break
    }
  }

  return (
    <div className="form-layout">
      {getFormHeader()}
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  )
}

export default FormLayout
