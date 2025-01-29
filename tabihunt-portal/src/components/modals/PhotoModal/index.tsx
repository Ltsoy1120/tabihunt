import ErrorInfo from "@/components/ErrorInfo"
import Button from "@/components/UI/buttons/Button"
import FileInput from "@/components/UI/FileInput"
import Icon from "@/components/UI/Icon"
import useAccountState from "@/hooks/useAccountState"
import { commonService } from "@/services/common.service"
import { API_URL } from "@/services/http.service"
import { useAppDispatch, useAppSelector } from "@/store"
import { editMeHunter } from "@/store/actions/hunterActions"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import "./style.scss"

interface PhotoModalProps {
  close: () => void
}

const PhotoModal = ({ close }: PhotoModalProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { newHunterData } = useAppSelector(state => state.hunters)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [state, setState] = useAccountState()
  const [fileError, setFileError] = useState<string | null>(null)

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
    avatarFile && getImageUrl(avatarFile)
  }, [avatarFile, setState])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0]
      if (newFile.size > 1 * 1024 * 1024) {
        // 2,5 МБ в байтах
        setFileError(t("photo-modal.file-limit"))
      } else {
        setAvatarFile(newFile)
      }
    }
  }

  const handleOnDrop = (newFile: File) => {
    setFileError(null)
    if (newFile.size > 1 * 2560 * 2560) {
      // 2,5 МБ в байтах
      setFileError(t("photo-modal.file-limit"))
    } else {
      setAvatarFile(newFile)
    }
  }

  const deleteImgHandler = () => {
    setAvatarFile(null)
    setState(prev => ({ ...prev, imageUrl: "" }))
  }

  const onSubmit = async () => {
    if (newHunterData) {
      const result = await dispatch(editMeHunter(newHunterData))
      if (result) {
        close()
      }
    }
  }

  return (
    <Modal size={"360px"} close={close}>
      <div className="photo-modal">
        <h2 className="photo-modal__title">{t("photo-modal.title")}</h2>
        <div className="photo-modal__form">
          {state.imageUrl ? (
            <div className="preview">
              <Image
                src={`${API_URL}files/${state.imageUrl}`}
                alt="Preview"
                width={230}
                height={230}
                className="image-preview"
              />
              <div className="preview-icon" onClick={deleteImgHandler}>
                <Icon name="delete" size={16} />
              </div>
              <Button onClick={onSubmit}>{t("photo-modal.button")}</Button>
            </div>
          ) : (
            <>
              <FileInput
                name="imageUrl"
                onChange={handleChange}
                onDrop={handleOnDrop}
              />
              {fileError && <ErrorInfo textError={fileError} />}
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default PhotoModal
