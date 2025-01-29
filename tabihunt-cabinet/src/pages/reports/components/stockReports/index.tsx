import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import Button from "../../../../components/UI/buttons/Button";
import Select from "../../../../components/UI/Select";
import { getMeCompanyLimits } from "../../../../store/actions/limitsActions";
import { getStockReports } from "../../../../store/actions/reports.action";
import { setExportReportsStockData } from "../../../../store/slices/reportsSlice";
import Pagination from "../paginationReports";
import { TableReports } from "../tableReports";

const animalTypes = [
    { title: "Все", value: "" },
    { title: "Пернатые, пушные", value: "FEATHERED" },
    { title: "Копытные", value: "UNGULATE" },
];
export const StockReportsComponents = ({ type }: { type: string }) => {
    const dispatch = useAppDispatch();
    const { reportPagination, reportsStockData } = useAppSelector(
        (state) => state.reports
    );
    const [activeAnimalType, setActiveAnimalType] = useState({
        title: "Вид дичи",
        value: "",
    });
    const [activePlotType, setActivePlotType] = useState({
        title: "Наименование угодья",
        value: "",
    });
    const [activeLimitsType, setActiveLimitsType] = useState({
        title: "Наименование дичи",
        value: "",
    });
    const { plots } = useAppSelector((state) => state.plots);
    const { limits } = useAppSelector((state) => state.limits);
    const plotsTypes = plots.map((item) => ({
        title: item.name,
        value: item.id,
    }));
    const limitsTypes = limits.map((item) => {
        return {
            title: item.animal.name,
            value: item.id,
        };
    });
    const onClickHandler = () => {
        dispatch(
            getStockReports({
                ...(activeAnimalType && { animalType: activeAnimalType.value }),
                ...(activeLimitsType && { limitId: activeLimitsType.value }),
                ...(activePlotType && { plotId: activePlotType.value }),
            })
        );
        dispatch(
            setExportReportsStockData({
                ...(activeAnimalType && { animalType: activeAnimalType.value }),
                ...(activeLimitsType && { limitId: activeLimitsType.value }),
                ...(activePlotType && { plotId: activePlotType.value }),
            })
        );
    };
    useEffect(() => {
        dispatch(
            getMeCompanyLimits({
                animalType: activeAnimalType.value,
                ...(plotsTypes && { plotId: activePlotType.value }),
            })
        );
    }, [activeAnimalType]);

    const handlePagesChange = (page: number) => {
        dispatch(
            getStockReports({
                page: page - 1,
                ...(activeAnimalType && { animalType: activeAnimalType.value }),
                ...(activeLimitsType && { limitId: activeLimitsType.value }),
                ...(activePlotType && { plotId: activePlotType.value }),
            })
        );
    };

    return (
        <>
            <div className="reportsSearch">
                <div className="line"></div>
                <div className="btnGroupReports">
                    <Select
                        className="selectReportsType stock"
                        onChange={setActivePlotType}
                        options={plotsTypes}
                        selected={activePlotType}
                    />
                    <Select
                        className="selectReportsType stock"
                        onChange={setActiveAnimalType}
                        options={animalTypes}
                        selected={activeAnimalType}
                    />
                    <Select
                        className="selectReportsType stock"
                        onChange={setActiveLimitsType}
                        options={limitsTypes}
                        selected={activeLimitsType}
                    />
                    <Button
                        className="createReports stock"
                        onClick={() => onClickHandler()}
                    >
                        Сформировать
                    </Button>
                </div>
            </div>
            <TableReports type={type} />

            {reportsStockData.length > 0 && (
                <Pagination
                    first={reportPagination.first!}
                    last={reportPagination.last!}
                    currentPage={reportPagination.number!}
                    totalPages={reportPagination.totalPages!}
                    onPageChange={handlePagesChange}
                />
            )}
        </>
    );
};
