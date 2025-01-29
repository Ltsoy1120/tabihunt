import { useAppSelector } from "../../../../store"
import "./style.scss"


interface IProps {
    type:string
}

export const TableReports = (props:IProps) => {

    const {reportsData, reportsStockData, reportsMembershipData, reportsUsageData} = useAppSelector((state) =>state.reports)    

    return (
        <div className="table-container">
        <table>
            <thead>
                <tr>
                    {
                        props.type==="membership"?
                        <>
                        <th>№</th>
                        <th>Дата продления</th>
                        <th>ФИО</th>
                        <th>Активен на</th>
                        <th>Номер охотбилета</th>
                        </>:
                        props.type==="voucher"?<>
                        <th>№</th>
                        <th>Номер путевки</th>
                        <th>Дата покупки</th>
                        <th>Наименование охотхозяйства</th>
                        <th>ФИО</th>
                        <th>Адрес охотника</th>
                        <th>Название дичи</th>
                        <th>Тип путевки</th>
                        <th>Период охоты</th>
                        <th>Общая Сумма</th>
                        </>:props.type==="stock" || "usage"?
                        <>
                        <th>№</th>
                        <th>Наименование охотхозяйства</th>
                        <th>Вид дичи</th>
                        <th>Наименование дичи</th>
                        <th>Номер разрешения</th>
                        <th>Выкупленный лимит</th>
                        <th>Продано</th>
                        {props.type=="stock"?<th>Остаток</th>:""}
                        </>:""
                    }
                </tr>
        </thead>
        <tbody>
            {
                props.type==="membership"?reportsMembershipData.map((item,index) => {
                    return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{item.issueDate}</td>
                        <td>{item.fullName}</td>
                        <td>{item.expiryDate}</td>
                        <td>{item.membershipNumber}</td>
                    </tr>
                    )
                }):
                props.type==="voucher"?reportsData.map((item, index) => {
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.voucherSlug}</td>
                            <td>{item.purchaseDate}</td>
                            <td>{item.plot}</td>
                            <td>{item.hunterFullname}</td>
                            <td>{item.hunterAddress}</td>
                            <td>{item.animals===""?"-":item.animals}</td>
                            <td>{item.voucherType}</td>
                            <td>{item.huntingPeriod}</td>
                            <td>{item.totalAmount}</td>
                        </tr>
                    )
                }):props.type ==="stock"?reportsStockData.map((item, index) => {
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.plot}</td>
                            <td>{item.animalType}</td>
                            <td>{item.animal}</td>
                            <td>{item.limitNumber}</td>
                            <td>{item.originalHeads}</td>
                            <td>{item.soldHeads}</td>
                            <td>{item.remainingHeads}</td>
                        </tr>
                    )
                }):props.type ==="usage"?reportsUsageData.map((item, index) => {
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.plot}</td>
                            <td>{item.animalType}</td>
                            <td>{item.animal}</td>
                            <td>{item.limitNumber}</td>
                            <td>{item.originalHeads}</td>
                            <td>{item.soldHeads}</td>
                        </tr>
                    )
                }):""
            }
        </tbody>
    </table>
   
</div>
    )
}
