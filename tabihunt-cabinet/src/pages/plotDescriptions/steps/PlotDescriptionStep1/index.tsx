import { useEffect, useState } from "react"
import Select from "../../../../components/UI/Select"
import FileInput from "../../../../components/UI/FileInput"
import Textarea from "../../../../components/UI/Textarea"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { getMeCompanyLimits } from "../../../../store/actions/limitsActions"
import {
  getMeCompanyPlotById,
  getMeCompanyPlots
} from "../../../../store/actions/plotsActions"
import Icon from "../../../../components/UI/Icon"
import { commonService } from "../../../../services/common.service"
import { API_URL } from "../../../../services/http.service"
import Modal from "../../../../components/UI/Modal"
import usePlotDescriptionState from "../../../../hooks/usePlotDescriptionState"
import { getPlotsOptions } from "../../../../helpers/common"
import Loader from "../../../../components/UI/loaders/Loader"
import { PlotDto } from "../../../../models/plots"
import "./style.scss"

const PlotDescriptionStep1 = () => {
  const dispatch = useAppDispatch()
  const { plots, loading } = useAppSelector(state => state.plots)
  // const { limits } = useAppSelector(state => state.limits)

  const [state, setState] = usePlotDescriptionState()

  // const uniqueAnimalIds = new Set<string>()
  // const limitsOptions = limits
  //   .filter(limit => {
  //     if (!uniqueAnimalIds.has(limit.animal.id)) {
  //       uniqueAnimalIds.add(limit.animal.id)
  //       return true
  //     }
  //     return false
  //   })
  //   .map(limit => ({
  //     value: limit.animal.id,
  //     title: limit.animal.name
  //   }))

  // const [selectedAnimal, setSelectedAnimal] = useState<Option[]>([])
  const [plotFile, setPlotFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [plotById, setPlotById] = useState<PlotDto>()

  useEffect(() => {
    if (!plots.length) {
      dispatch(getMeCompanyPlots())
    }
    const getPlotById = async () => {
      const plot = await dispatch(getMeCompanyPlotById(state.plotId))
      if (plot) {
        setPlotById(plot)
      }
    }
    if (state.plotId) {
      getPlotById()
    }
  }, [state.plotId, plots, dispatch])

  useEffect(() => {
    state.plotId &&
      dispatch(
        getMeCompanyLimits({
          ...(state.plotId && { plotId: state.plotId })
        })
      )
  }, [state.plotId, dispatch])

  // useEffect(() => {
  //   if (plotDescriptionData && plotDescriptionData?.animalIds.length > 0) {
  //     const selectedAnimalOptions = limitsOptions.filter(limit =>
  //       plotDescriptionData.animalIds.includes(limit.value)
  //     )
  //     setSelectedAnimal(selectedAnimalOptions)
  //   } else if (plotDescription && plotDescription?.animals.length > 0) {
  //     const selectedAnimalOptions = plotDescription?.animals.map(animal => ({
  //       value: animal.id,
  //       title: animal.name
  //     }))
  //     setSelectedAnimal(selectedAnimalOptions)
  //   } else if (limits.length > 0) {
  //     setSelectedAnimal(limitsOptions)
  //   }
  // }, [limits])

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
    plotFile && getImageUrl(plotFile)
  }, [plotFile, dispatch])

  const handleAboutChange = (index: number, value: string) => {
    setState(prevState => {
      const updatedAbout = [...prevState.aboutTranslations]
      updatedAbout[index] = {
        ...updatedAbout[index],
        about: value
      }
      return {
        ...prevState,
        aboutTranslations: updatedAbout
      }
    })
  }

  const handlePlotChange = (plot: { value: string; title: string }) => {
    setState(prev => ({ ...prev, plotId: plot.value }))
  }

  // const handleMultipleSelectChange = (options: Option[]) => {
  //   setSelectedAnimal(options)
  //   setState(prevState => ({
  //     ...prevState,
  //     animalIds: options.map(item => item.value)
  //   }))
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0]
      if (newFile.size > 1 * 1024 * 1024) {
        // 1 МБ в байтах
        setFileError("Размер файла превышает 1 МБ")
      } else {
        setFileError(null)
        setPlotFile(newFile)
      }
    }
  }

  const handleOnDrop = (newFile: File) => {
    if (newFile.size > 1 * 1024 * 1024) {
      // 1 МБ в байтах
      setFileError("Размер файла превышает 1 МБ")
    } else {
      setFileError(null)
      setPlotFile(newFile)
    }
  }

  const deleteImgHandler = () => {
    setPlotFile(null)
    setState(prev => ({ ...prev, imageUrl: "" }))
  }

  return (
    <>
      {fileError && (
        <Modal close={() => setFileError(null)}>
          <p>{fileError}</p>
        </Modal>
      )}
      {!loading ? (
        <div className="new-plot-description-step1">
          <h3>Угодье</h3>
          <Select
            options={getPlotsOptions(plots)}
            selected={{ value: state.plotId, title: plotById?.name || "" }}
            label="Выберите из списка"
            onChange={handlePlotChange}
          />
          <h3>Об угодье</h3>
          <span>Описание ландшафта участка, его площади и пр.</span>
          <Textarea
            value={state.aboutTranslations[0].about}
            placeholder="На русском"
            onChange={e => handleAboutChange(0, e.target.value)}
          />
          <Textarea
            value={state.aboutTranslations[1].about}
            placeholder="На казахском"
            onChange={e => handleAboutChange(1, e.target.value)}
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
              <div className="preview-icon" onClick={deleteImgHandler}>
                <Icon name="delete" size={16} />
              </div>
            </div>
          ) : (
            <FileInput
              name="imageUrl"
              onChange={handleChange}
              onDrop={handleOnDrop}
            />
          )}

          {/* <h3>Охотничьи виды</h3>
          <MutipleSelect
            options={limitsOptions}
            selected={selectedAnimal}
            label="Выберите из списка"
            onChange={handleMultipleSelectChange}
          /> */}
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default PlotDescriptionStep1
