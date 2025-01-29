import { useState } from "react"
import Button from "../../../../components/UI/buttons/Button"
import { useAppDispatch, useAppSelector } from "../../../../store"
import Input from "../../../../components/UI/Input"
import Select from "../../../../components/UI/Select"
import { getMembershipReports } from "../../../../store/actions/reports.action"
import { setExportReportsMembershipData } from "../../../../store/slices/reportsSlice"
import Pagination from "../paginationReports"
import { TableReports } from "../tableReports"

export const MembershipReports = ({ type }: { type: string }) => {
  const dispatch = useAppDispatch()
  const currentYear = new Date().getFullYear();
  const { reportPagination, reportsMembershipData } = useAppSelector(state => state.reports)
  const years = Array.from({ length: 11 }, (_, index) => currentYear - index);
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [userName, setUserName] = useState("")
  const [activeYear, setActiveYear] = useState({ title: "Год", value: "" })


  const onClickHandler = () => {
    dispatch(getMembershipReports({
      ...(startDateValue && { startDay: startDateValue }),
      ...(endDateValue && { endDate: endDateValue }),
      ...(userName && { fullname: userName }),
      ...(activeYear && { year: Number(activeYear.value) })
    }))
    dispatch(setExportReportsMembershipData({
      ...(startDateValue && { startDay: startDateValue }),
      ...(endDateValue && { endDate: endDateValue }),
      ...(userName && { fullname: userName }),
      ...(activeYear && { year: Number(activeYear.value) })
    }))
  }

  const yearObjects = years.map(year => ({
    title: year.toString(),
    value: year.toString()
  }));

  const handlePageChange = (page: number) => {
    dispatch(getMembershipReports({
      page: (page - 1),
      ...(startDateValue && { startDay: startDateValue }),
      ...(endDateValue && { endDate: endDateValue }),
      ...(userName && { fullname: userName }),
      ...(activeYear && { year: Number(activeYear.value) })
    }))
  };

  return (
    <>
      <div className="reportsSearch">
        <div className="btnGroupReports">
          <Input
            type="date"
            name="huntingStartDate"
            value={startDateValue}
            onChange={(e) => setStartDateValue(e.target.value)}
          />
          <Input
            type="date"
            name="huntingEndDate"
            value={endDateValue}
            onChange={(e) => setEndDateValue(e.target.value)}
          />
          <Input
            placeholder="ФИО"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)
            }
          />
          <Select className="selectReportsType stock" onChange={setActiveYear} options={yearObjects} selected={activeYear} />
          <Button
            className="createReports stock"
            onClick={() => onClickHandler()}
          >
            Сформировать
          </Button>
        </div>
      </div>
      <TableReports type={type} />
      {
        reportsMembershipData.length > 0 ? <Pagination
          first={reportPagination.first!}
          last={reportPagination.last!}
          currentPage={reportPagination.number!}
          totalPages={reportPagination.totalPages!}
          onPageChange={handlePageChange}
        /> : ""
      }
    </>
  )
}
