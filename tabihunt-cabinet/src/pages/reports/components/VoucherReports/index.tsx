import { useState } from "react";
import Button from "../../../../components/UI/buttons/Button";
import "./style.scss";
import Select from "../../../../components/UI/Select";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getMeCompanyReports } from "../../../../store/actions/reports.action";
import Input from "../../../../components/UI/Input";
import { setExportDataReports } from "../../../../store/slices/reportsSlice";
import Pagination from "../paginationReports";
import { TableReports } from "../tableReports";

export const VoucherReportsComponent = ({type}:{type:string}) => {
    const dispatch = useAppDispatch();
    const [startDateValue, setStartDateValue] = useState('');
    const [endDateValue, setEndDateValue] = useState('');
    const { reportPagination, reportsData } = useAppSelector(state => state.reports)
    const [activeAnimalType, setActiveAnimalType] = useState({
        title: "Вид дичи",
        value: ""
    });
    const [activeVoucherType, setActiveVoucherType] = useState({
        title: "Тип путевки",
        value: ""
    });
    const [activePlotType, setActivePlotType] = useState({
        title: "Охотхозяйство",
        value: ""
    });

    const animalTypes = [
        { title: "Все", value: "" },
        { title: "Пернатые, пушные", value: "FEATHERED" },
        { title: "Копытные", value: "UNGULATE" }
    ];

    const voucherTypes = [
        { title: "Все", value: "" },
        { title: "Разовая", value: "ONE_TIME" },
        { title: "Сезонная", value: "SEASONAL" }
    ]
    const { plots } = useAppSelector(state => state.plots)


    const plotsTypes = plots.map((item) => {
        return {
            title: item.name, value: item.id
        }
    })

    const onClickHandler = () => {
        dispatch(
            getMeCompanyReports({
                ...(startDateValue && { startPeriod: startDateValue }),
                ...(endDateValue && { endPeriod: endDateValue }),
                ...(activeAnimalType && { animalType: activeAnimalType.value }),
                ...(activeVoucherType && { voucherType: activeVoucherType.value }),
                ...(activePlotType && { plotId: activePlotType.value })
            })
        )
        dispatch(setExportDataReports({
            ...(startDateValue && { startPeriod: startDateValue }),
            ...(endDateValue && { endPeriod: endDateValue }),
            ...(activeAnimalType && { animalType: activeAnimalType.value }),
            ...(activeVoucherType && { voucherType: activeVoucherType.value }),
            ...(activePlotType && { plotId: activePlotType.value })
        }))
    }
    const handlePageChange = (page: number) => {
        dispatch(getMeCompanyReports({
            page: (page - 1),
            ...(startDateValue && { startPeriod: startDateValue }),
            ...(endDateValue && { endPeriod: endDateValue }),
            ...(activeAnimalType && { animalType: activeAnimalType.value }),
            ...(activeVoucherType && { voucherType: activeVoucherType.value }),
            ...(activePlotType && { plotId: activePlotType.value })
        }))
    };

    return (
        <>
            <div className="reportsSearch">
                <div className="line"></div>
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
                <Select
                    className="selectReportsType"
                    onChange={setActiveAnimalType}
                    options={animalTypes}
                    selected={activeAnimalType}
                />
                <Select
                    className="selectReportsType"
                    onChange={setActiveVoucherType}
                    options={voucherTypes}
                    selected={activeVoucherType}
                />
                <Select
                    className="selectReportsType"
                    onChange={setActivePlotType}
                    options={plotsTypes}
                    selected={activePlotType}
                />
                <Button className="createReports" onClick={onClickHandler}>
                    Сформировать
                </Button>
            </div>
            </div>       
            <TableReports type={type} />
            {
                reportsData.length > 0 ? <Pagination
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

