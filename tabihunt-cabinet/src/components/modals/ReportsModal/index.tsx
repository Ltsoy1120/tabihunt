import "./style.scss"

import TextButton from "../../UI/buttons/TextButton"
import Modal from "../../UI/Modal"


interface IProps  {
    close:() => void, 
    onSelectReport: (name: ["voucher" | "membership" | "stock" | "usage", string]) => void;
}

export const ReportsModal = (props: IProps) => {
    
    const handleButtonClick = (reportData: ["voucher" | "membership" | "stock" | "usage", string]) => {
        props.onSelectReport(reportData);
        props.close();
    };

    return (
        <Modal className="itemModalReports" size={"360px"} close={props.close}>
            <div className="plots-modal">
                <h2 className="plots-modal__title">Выбор отчета</h2>
                <div className="plots-modal__list">
                    <TextButton endIcon="arrow-down" onClick={() => handleButtonClick(["voucher", "Отчет по продаже путевок"])}>
                        {"Отчет по продаже путевок"}
                    </TextButton>
                    <TextButton endIcon="arrow-down" onClick={() => handleButtonClick(["stock", "Отчет остатка природных ресурсов разрешенных к изъятию"])}>
                        {"Отчет остатка природных ресурсов разрешенных к изъятию"}
                    </TextButton>
                    <TextButton endIcon="arrow-down" onClick={() => handleButtonClick(["usage", "Отчет по использованию животного мира"])}>
                        {"Отчет по использованию животного мира"}
                    </TextButton>
                    <TextButton endIcon="arrow-down" onClick={() => handleButtonClick(["membership", "Отчет по членству в охотничьем обществе"])}>
                        {"Отчет по членству в охотничьем обществе"}
                    </TextButton>
                </div>
            </div>
        </Modal>
    );
};
