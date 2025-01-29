import { AnimalDto } from "./animals"
import { PlotDto } from "./plots"

export interface LimitDto {
  id: string
  animal: AnimalDto
  plot: PlotDto
  number: string
  availableHeads: number
  reservedHeads: number
  createdAt: string
  updatedAt: string
}
