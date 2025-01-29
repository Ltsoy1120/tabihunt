import { PlotDescriptionDto } from "@/models/plots"
import PlotDescriptionCardMain from "../PlotDescriptionCardMain"

interface PlotDescriptionsListMainProps {
  plotDescriptions: PlotDescriptionDto[]
}

const PlotDescriptionListMain = ({
  plotDescriptions
}: PlotDescriptionsListMainProps) => {
  return (
    <>
      {plotDescriptions.length > 0 &&
        plotDescriptions
          .slice(0, 4)
          .map(plotDescription => (
            <PlotDescriptionCardMain
              key={plotDescription.id}
              plotDescription={plotDescription}
            />
          ))}
    </>
  )
}

export default PlotDescriptionListMain
