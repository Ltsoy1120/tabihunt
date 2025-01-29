import { HuntingSocietyDto } from "@/models/huntingSociety"
import HuntingSocietyCardMain from "../HuntingSocietyCardMain"

interface HuntingSocietiesListMainProps {
  huntingSocieties: HuntingSocietyDto[]
}

const HuntingSocietiesListMain = ({
  huntingSocieties
}: HuntingSocietiesListMainProps) => {
  return (
    <>
      {huntingSocieties.slice(0, 4).map((huntingSociety, index) => (
        <HuntingSocietyCardMain
          key={huntingSociety.id}
          huntingSociety={huntingSociety}
          index={index + 1}
        />
      ))}
    </>
  )
}

export default HuntingSocietiesListMain
