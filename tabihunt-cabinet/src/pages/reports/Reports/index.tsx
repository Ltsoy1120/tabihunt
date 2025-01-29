import { useEffect, useState } from "react";
import "./style.scss";
import { ReportsModal } from "../../../components/modals/ReportsModal";
import TextButton from "../../../components/UI/buttons/TextButton";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getExportReports, getExportReportsMembership, getExportReportsStock, getExportReportsUsage } from "../../../store/actions/reports.action";
import { clearData } from "../../../store/slices/reportsSlice";
import { VoucherReportsComponent } from "../components/VoucherReports";
import { StockReportsComponents } from "../components/stockReports";
import { UsageReports } from "../components/usageReports";
import { MembershipReports } from "../components/memberShipReports";

const Reports = () => {
  const [openReportsModal, setOpenReportsModal] = useState(false);
  const [selectReport, setSelectReport] = useState<["voucher" | "membership" | "stock" | "usage", string]>(["voucher", "Отчет по продаже путевок"]); // Указываем кортеж

  const dispatch = useAppDispatch();
  const select = useAppSelector(state => state.reports);

  useEffect(() => {
    dispatch(clearData());
  }, [openReportsModal]);

  const exportActions: Record<string, (payload: any) => any> = {
    voucher: getExportReports,
    stock: getExportReportsStock,
    usage: getExportReportsUsage,
    membership: getExportReportsMembership,
  };

  const renderReportComponent = {
    voucher: <VoucherReportsComponent type={"voucher"} />,
    stock: <StockReportsComponents type={"stock"} />,
    usage: <UsageReports type={"usage"} />,
    membership: <MembershipReports type={"membership"} />,
  };

  return (
    <>
      {openReportsModal && <ReportsModal close={() => setOpenReportsModal(false)} onSelectReport={setSelectReport} />}
      <div className="reports buttonGroup">
          <TextButton className="buttonSelect" endIcon="arrow-down" onClick={() => setOpenReportsModal(true)}>
            {selectReport[1]}
          </TextButton>
          <TextButton className="exportReports" onClick={() => dispatch(exportActions[selectReport[0]](select.exportReportData))}>
            Экспорт
          </TextButton>
      </div>
        {renderReportComponent[selectReport[0]]}
    </>
  );
};

export default Reports;
