import { RegionDto } from "@/models/common"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface RegionsModalProps {
  regions: RegionDto[]
  activeRegion: RegionDto | null
  selectRegion: (region: RegionDto) => void
  close: () => void
}

const RegionsModal = ({
  regions,
  activeRegion,
  selectRegion,
  close
}: RegionsModalProps) => {
  return (
    <Modal size={"360px"} hasScroll={true} close={close}>
      <div className="regions-modal">
        <h2 className="regions-modal__title">Область</h2>
        <div className="regions-modal__list">
          {regions &&
            regions.length &&
            regions.map(region => (
              <Radio
                key={region.id}
                label={region.name}
                checked={region.id === activeRegion?.id}
                onChangeHandler={() => selectRegion(region)}
              />
            ))}
        </div>
      </div>
    </Modal>
  )
}

export default RegionsModal
