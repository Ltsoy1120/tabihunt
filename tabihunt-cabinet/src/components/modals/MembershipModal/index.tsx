import { useState } from "react"
import TextButton from "../../UI/buttons/TextButton"
import Modal from "../../UI/Modal"
import "./style.scss"
import FileInput from "../../UI/FileInput"
import Button from "../../UI/buttons/Button"
import Icon from "../../UI/Icon"
import { useAppDispatch } from "../../../store"
import { createMeCompanyMembershipFile } from "../../../store/actions/membershipsActions"

interface PlotsModalProps {
    onCreateMembership: () => void
    close: () => void
}

const MembershipModal = ({ close, onCreateMembership}: PlotsModalProps) => {

    const [upload, setUpload] = useState(false)
    const [membershipFile, setMembershipFile] = useState<File | null>(null)
    const formData = new FormData();
    const dispatch = useAppDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            const newFile = e.target.files[0]
            setMembershipFile(newFile)
        }
      }
    
      const handleOnDrop = (newFile: File) => {
        setMembershipFile(newFile)
      }
    
      const deleteFileHandler = () => {
        setMembershipFile(null)
      }

      const sendTableHandler = () => {
        if(membershipFile) {
            formData.append("file", membershipFile);
            dispatch(createMeCompanyMembershipFile(formData))
            close()
        }
      }

    return (
        <Modal size={"460px"} close={close}>
            {
                !upload?<div className="membership-modal">
                <TextButton onClick={onCreateMembership} className="membership-modal__person" endIcon="arrow-right">
                    <img src={"/static/images/person.svg"} alt="person" />
                    <div>
                        <h1>Добавить вручную</h1>
                        <span>Укажите данные охотника</span>
                    </div>
                </TextButton>
                <TextButton onClick={() => setUpload(true)} className="membership-modal__person" endIcon="arrow-right">
                    <img src={"/static/images/upload_table.svg"} alt="upload_table" />
                    <div>
                        <h1>Загрузить таблицу</h1>
                        <span>Формат документа .xlsx</span>
                    </div>
                </TextButton>
                <a href={`${import.meta.env.VITE_BASE_URL}/static/memberships-template.xlsx`}>Скачать шаблон</a>
            </div>:
            <div className="membership__uploadTable">
                <div className="preview-icon" onClick={() => setUpload(false)}>
                    <Icon name="arrow-back" size={20} />
                </div>
                {
                    !membershipFile? <div className="FileInputUpload">
                        <FileInput
                        name="TableUrl"
                        onChange={handleChange}
                        onDrop={handleOnDrop}
                    />
                    </div>:
                    <div className="uploadData">
                        <div className="uploadData__main">
                            <div className="uploadData__title">
                                <h1>{membershipFile.name}</h1>
                                <span>Формат документа .xlsx</span>
                            </div>
                            <div className="preview-icon removeIcon" onClick={deleteFileHandler}>
                                    <Icon name="delete" size={20} />
                                </div>
                        </div>
                        <Button onClick={sendTableHandler}>Загрузить таблицу</Button>
                    </div>
                }
            </div>
            }
        </Modal>
    )
}

export default MembershipModal
