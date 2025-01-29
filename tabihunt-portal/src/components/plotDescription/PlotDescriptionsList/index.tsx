"use client"
import { PlotDescriptionDto } from "@/models/plots"
import PlotDescriptionCard from "../PlotDescriptionCard"
import "./style.scss"

interface PlotDescriptionsListProps {
  plotDescriptions: PlotDescriptionDto[]
}

const PlotDescriptionsList = ({
  plotDescriptions
}: PlotDescriptionsListProps) => {
  return (
    <div className="plotDescriptions-list">
      {plotDescriptions &&
        plotDescriptions.length > 0 &&
        plotDescriptions.map(plotDescription => (
          <PlotDescriptionCard
            key={plotDescription.id}
            plotDescription={plotDescription}
          />
        ))}
    </div>
  )
}

export default PlotDescriptionsList
