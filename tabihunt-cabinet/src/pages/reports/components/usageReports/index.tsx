import { useState } from "react";
import Button from "../../../../components/UI/buttons/Button";
import Select from "../../../../components/UI/Select";
import { useAppDispatch, useAppSelector } from "../../../../store";
import Input from "../../../../components/UI/Input";
import { getUsageReports } from "../../../../store/actions/reports.action";
import { setExportReportsUsageData } from "../../../../store/slices/reportsSlice";
import Pagination from "../paginationReports";
import { TableReports } from "../tableReports";

const animalTypes = [
    { title: "Все", value: "" },
    { title: "Пернатые, пушные", value: "FEATHERED" },
    { title: "Копытные", value: "UNGULATE" }
];

export const UsageReports = ({ type }: { type: string }) => {
    const dispatch = useAppDispatch();
    const [activeAnimalType, setActiveAnimalType] = useState({ title: "Вид дичи", value: "" });
    const [activePlotType, setActivePlotType] = useState({ title: "Наименование угодья", value: "" });
    const [activeLimitsType, setActiveLimitsType] = useState({ title: "Наименование дичи", value: "" });
    const [limitNumber, setLimitNumber] = useState("");
    const { reportPagination, reportsUsageData } = useAppSelector(state => state.reports);
    const { plots } = useAppSelector(state => state.plots);
    const { limits } = useAppSelector(state => state.limits);
    const plotsTypes = plots.map(item => ({ title: item.name, value: item.id }));
    const limitsTypes = limits.map(item => ({ title: item.animal.name, value: item.id }));

    const onClickHandler = () => {
        dispatch(getUsageReports({
            ...(activeAnimalType && { animalType: activeAnimalType.value }),
            ...(activePlotType && { plotId: activePlotType.value }),
            ...(limitNumber && { limitNumber: limitNumber })
        }));
        dispatch(setExportReportsUsageData({
            ...(activeAnimalType && { animalType: activeAnimalType.value }),
            ...(activeLimitsType && { limitId: activeLimitsType.value }),
            ...(activePlotType && { plotId: activePlotType.value })
        }));
    };

    const handlePageChange = (page: number) => {
        dispatch(getUsageReports({
            page: page - 1,
            ...(activeAnimalType && { animalType: activeAnimalType.value }),
            ...(activeLimitsType && { limitId: activeLimitsType.value }),
            ...(activePlotType && { plotId: activePlotType.value })
        }));
    };

    return (
        <>
            <div className="reportsSearch">
                <div className="line"></div>
            <div className="btnGroupReports">
                <Select className="selectReportsType stock" onChange={setActivePlotType} options={plotsTypes} selected={activePlotType} />
                <Input placeholder="Номер разрешения" value={limitNumber} onChange={(e) => setLimitNumber(e.target.value)} type="number" />
                <Select className="selectReportsType stock" onChange={setActiveAnimalType} options={animalTypes} selected={activeAnimalType} />
                <Select className="selectReportsType stock" onChange={setActiveLimitsType} options={limitsTypes} selected={activeLimitsType} />
                <Button className="createReports stock" onClick={onClickHandler}>
                    Сформировать
                </Button>
            </div>
            </div>
            <TableReports type={type} />
            {
                reportsUsageData.length > 0 ? <Pagination
                    first={reportPagination.first!}
                    last={reportPagination.last!}
                    currentPage={reportPagination.number!}
                    totalPages={reportPagination.totalPages!}
                    onPageChange={handlePageChange}
                /> : ""
            }
        </>
    );
};
