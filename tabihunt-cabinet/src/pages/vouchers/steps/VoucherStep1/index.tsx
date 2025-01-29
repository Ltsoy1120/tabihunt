import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ErrorButton from "../../../../components/UI/buttons/ErrorButton"
import FileInput from "../../../../components/UI/FileInput"
import Icon from "../../../../components/UI/Icon"
import Input from "../../../../components/UI/Input"
import Select from "../../../../components/UI/Select"
import Tabs from "../../../../components/UI/Tabs"
import { getPlotsOptions } from "../../../../helpers/common"
import useVoucherState from "../../../../hooks/useVoucherState"
import { PlotDto } from "../../../../models/plots"
import { commonService } from "../../../../services/common.service"
import { API_URL } from "../../../../services/http.service"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { getMeCompanyPlotById } from "../../../../store/actions/plotsActions"
import { setDocFileName } from "../../../../store/slices/vouchersSlice"
import "./style.scss"

export const voucherTypeTabs = [
  { value: "ONE_TIME", title: "Разовая" },
  { value: "SEASONAL", title: "Сезонная" }
]

interface FilesType {
  imageUrl: File | null
  rulesUrl: File | null
}

const VoucherStep1 = () => {
  const dispatch = useAppDispatch()
  const { plots } = useAppSelector(state => state.plots)
  const [plotById, setPlotById] = useState<PlotDto>()
  const [state, setState] = useVoucherState()

  const [files, setFiles] = useState<FilesType>({
    imageUrl: null,
    rulesUrl: null
  })

  const [fileError, setFileError] = useState({
    imageUrl: "",
    rulesUrl: ""
  })

  useEffect(() => {
    const getPlotById = async () => {
      const plot = await dispatch(getMeCompanyPlotById(state.plotId))
      if (plot) {
        setPlotById(plot)
      }
    }
    if (state.plotId) {
      getPlotById()
    }
  }, [state.plotId, dispatch])

  useEffect(() => {
    const getImageUrl = async (file: File, name: string) => {
      try {
        const formData = new FormData()
        formData.append("file", file)
        const resp = await commonService.uploadFile(formData)
        if (resp.data) {
          setState(prevState => ({ ...prevState, [name]: resp.data.id }))
        }
      } catch (error) {}
    }
    files.imageUrl && getImageUrl(files.imageUrl, "imageUrl")
    if (files.rulesUrl) {
      getImageUrl(files.rulesUrl, "rulesUrl")
      dispatch(setDocFileName(files.rulesUrl.name))
    }
  }, [files, dispatch])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  const handleTypeChange: Dispatch<SetStateAction<string>> = type => {
    setState(prev => ({
      ...prev,
      type: typeof type === "function" ? type(prev.type) : type
    }))
  }

  const handlePlotChange = (plot: { value: string; title: string }) => {
    setState(prev => ({ ...prev, plotId: plot.value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0]
      // 1 МБ в байтах
      if (newFile.size > 1 * 1024 * 1024) {
        setFileError(prev => ({
          ...prev,
          [e.target.name]: "Размер файла превышает 1 МБ"
        }))
      } else {
        setFileError(prev => ({ ...prev, [e.target.name]: "" }))
        setFiles(prev => ({ ...prev, [e.target.name]: newFile }))
      }
    }
  }

  const handleOnDrop = (newFile: File) => {
    if (newFile.size > 1 * 1024 * 1024) {
      // 1 МБ в байтах
      setFileError(prev => ({
        ...prev,
        imageUrl: "Размер файла превышает 1 МБ"
      }))
    } else {
      setFileError(prev => ({ ...prev, imageUrl: "" }))
      setFiles(prev => ({ ...prev, imageUrl: newFile }))
    }
  }

  const deleteFileHandler = (name: string) => {
    setFiles(prev => ({ ...prev, [name]: null }))
    setState(prev => ({ ...prev, [name]: "" }))
  }

  return (
    <div className="new-voucher-step1">
      <h2>Характеристики</h2>
      <div className="form">
        <h3>Тип путевки</h3>
        <Tabs
          optionTabs={voucherTypeTabs}
          activeTab={state.type}
          setActiveTab={handleTypeChange}
        />
        <h3>Количество дней</h3>
        <Input
          placeholder="Обязательно"
          name="duration"
          type="number"
          value={String(state.duration)}
          onChange={handleChange}
        />
        <h3>Участок</h3>
        <Select
          options={getPlotsOptions(plots)}
          label="Выберите участок"
          selected={{ value: state.plotId, title: plotById?.name || "" }}
          onChange={handlePlotChange}
        />
        <h3>Правила охотничьего угодья</h3>
        <span>Разрешенные форматы: doc, pdf</span>
        {state.rulesUrl ? (
          <div className="upload-file">
            <p>{files.rulesUrl?.name}</p>
            <Icon
              name="close"
              size={16}
              onClick={() => deleteFileHandler("rulesUrl")}
            />
          </div>
        ) : (
          <>
            <FileInput name="rulesUrl" onChange={handleFileChange} />
            {fileError.rulesUrl && <ErrorButton text={fileError.rulesUrl} />}
          </>
        )}
        <h3>Количество посещений в день</h3>
        <Input
          placeholder="Необязательно"
          name="dailyLimit"
          type="number"
          value={String(state.dailyLimit)}
          onChange={handleChange}
        />
        <h3>Фотография</h3>
        <span>Рекомендуемый размер фото: не менее 500x500 </span>
        {state.imageUrl ? (
          <div className="preview">
            <img
              src={`${API_URL}files/${state.imageUrl}`}
              alt="Preview"
              className="image-preview"
            />
            <div
              className="preview-icon"
              onClick={() => deleteFileHandler("imageUrl")}
            >
              <Icon name="delete" size={16} />
            </div>
          </div>
        ) : (
          <>
            <FileInput
              name="imageUrl"
              onChange={handleFileChange}
              onDrop={handleOnDrop}
            />
            {fileError.imageUrl && <ErrorButton text={fileError.imageUrl} />}
          </>
        )}
      </div>
    </div>
  )
}

export default VoucherStep1
