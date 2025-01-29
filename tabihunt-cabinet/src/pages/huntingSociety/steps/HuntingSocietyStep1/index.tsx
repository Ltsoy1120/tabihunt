import "./style.scss"
import Modal from "../../../../components/UI/Modal";
import {API_URL} from "../../../../services/http.service";
import Icon from "../../../../components/UI/Icon";
import FileInput from "../../../../components/UI/FileInput";
import Loader from "../../../../components/UI/loaders/Loader";
import {useEffect, useState} from "react";
import Input from "../../../../components/UI/Input";
import useHuntingSocietyDescriptionState from "../../../../hooks/useHuntingSociety";
import { commonService } from "../../../../services/common.service";
import { BtnBold, BtnItalic, BtnLink, Editor, EditorProvider, Toolbar } from "react-simple-wysiwyg";

const HuntingSocietyStep1 = () => {
    const [loading] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null)
    const [huntingFile, setHuntingFile] = useState<File | null>(null)
    const [state, setState] = useHuntingSocietyDescriptionState()


    useEffect(() => {
        const getImageUrl = async (plotFile: File) => {
        try {
            const formData = new FormData()
            formData.append("file", plotFile)
            const resp = await commonService.uploadFile(formData)
                if (resp.data) {
                    setState(prevState => ({ ...prevState, imageUrl: resp.data.id }))
                }
            } catch (error) {}
        }
            huntingFile && getImageUrl(huntingFile)
        }, [huntingFile])



    const handleAboutChange = (index: number, value: string) => {
        setState(prevState => {
            const updatedTranslations = [...prevState.aboutTranslations]
            updatedTranslations[index] = {
                ...updatedTranslations[index],
                about: value
            }
            return {
                ...prevState,
                aboutTranslations: updatedTranslations
            }
        })
    }

    const handleNameChange = (index: number, value: string) => {
        setState(prevState => {
            const updatedTranslations = [...prevState.nameTranslations]
            updatedTranslations[index] = {
                ...updatedTranslations[index],
                name: value
            }
            return {
                ...prevState,
                nameTranslations: updatedTranslations
            }
        })
    }

    const handleTranslationsChange = (index: number, value: string) => {
        setState(prevState => {
            const updatedTranslations = [...prevState.instructionsTranslations]
            updatedTranslations[index] = {
                ...updatedTranslations[index],
                instructions: value
            }
            return {
                ...prevState,
                instructionsTranslations: updatedTranslations
            }
        })
    }

    const deleteImgHandler = () => {
        setHuntingFile(null)
        setState(prev => ({ ...prev, imageUrl: "" }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            const newFile = e.target.files[0]
            if (newFile.size > 1 * 1024 * 1024) {
                // 1 МБ в байтах
                setFileError("Размер файла превышает 1 МБ")
            } else {
                setFileError(null)
                setHuntingFile(newFile)
            }
        }
    }

    const handleOnDrop = (newFile: File) => {
        if (newFile.size > 1 * 1024 * 1024) {
            // 1 МБ в байтах
            setFileError("Размер файла превышает 1 МБ")
        } else {
            setFileError(null)
            setHuntingFile(newFile)
        }
    }
    return (
        <>
            {fileError && (
                <Modal close={() => setFileError(null)}>
                    <p>{fileError}</p>
                </Modal>
            )}
            {!loading ? (
                <div className="new-hunting-society-step1">
                    <h3>Наименование</h3>
                    <span>Русский</span>
                    <Input
                        placeholder="Обязательно"
                        name="phoneNumber"
                        type="text"
                        value={state.nameTranslations[0].name ?? ""}
                        onChange={(e) => handleNameChange(0 , e.target.value)}
                    />
                    <span>Казахский</span>
                     <Input
                        placeholder="Обязательно"
                        name="phoneNumber"
                        type="text"
                        value={state.nameTranslations[1].name}
                        onChange={(e) => handleNameChange(1 , e.target.value)}
                    />
                    <h3>Логотип</h3>
                    <span>Рекомендуемый размер фото: не менее 500x500 </span>
                    {state.imageUrl ? (
                        <div className="preview">
                            <img
                                src={`${API_URL}files/${state.imageUrl}`}
                                alt="Preview"
                                className="image-preview"
                            />
                            <div className="preview-icon" onClick={deleteImgHandler}>
                                <Icon name="delete" size={16}/>
                            </div>
                        </div>
                    ) : (
                        <FileInput
                            name="imageUrl"
                            onChange={handleChange}
                            onDrop={handleOnDrop}
                        />
                    )}
                    <h3>О нас</h3>
                    <span>Описание охотобщества, чем организация занимается</span>          
                    <EditorProvider>
                        <Editor value={state.aboutTranslations[0].about} onChange={(e) => handleAboutChange(0 , e.target.value)}>
                            <Toolbar>
                            <span>На русском</span>
                            <BtnBold />
                            <BtnItalic />
                            <BtnLink/>
                            </Toolbar>
                        </Editor>
                    </EditorProvider>
                    <EditorProvider>
                        <Editor value={state.aboutTranslations[1].about} onChange={(e) => handleAboutChange(1, e.target.value)}>
                            <Toolbar>
                            <span>На казахском</span>
                            <BtnBold />
                            <BtnItalic />
                            <BtnLink/>
                            </Toolbar>
                        </Editor>
                    </EditorProvider>
                    <h3>Как стать членом</h3> 
                    <span>Описание охотобщества, чем организация занимается</span>    
                    <EditorProvider>
                        <Editor value={state.instructionsTranslations[0].instructions} onChange={(e) => handleTranslationsChange(0 , e.target.value)}>
                            <Toolbar>
                            <span>На русском</span>
                            <BtnBold />
                            <BtnItalic />
                            <BtnLink/>
                            </Toolbar>
                        </Editor>
                    </EditorProvider>
                    <EditorProvider>
                        <Editor value={state.instructionsTranslations[1].instructions} onChange={(e) => handleTranslationsChange(1, e.target.value)}>
                            <Toolbar>
                            <span>На казахском</span>
                            <BtnBold />
                            <BtnItalic />
                            <BtnLink/>
                            </Toolbar>
                        </Editor>
                    </EditorProvider>
                </div>
            ) : (
                <Loader/>
            )}
        </>
    )
}
export default HuntingSocietyStep1