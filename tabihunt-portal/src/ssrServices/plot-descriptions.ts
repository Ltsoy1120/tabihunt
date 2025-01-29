import {
  GetPlotDescriptionParameters,
  GetPlotDescriptionsResponse
} from "@/models/plots"
import { API_URL } from "@/services/http.service"

export const fetchPlotDescriptions = async (
  payload: GetPlotDescriptionParameters,
  locale: string
) => {
  let url = `regions/${payload.regionId}/plot-descriptions?page=${
    payload.page ?? 0
  }&size=${payload.size ?? 10}`

  if (payload.animalType) {
    url += `&animalType=${payload.animalType}`
  }

  if (payload.plotName) {
    url += `&plotName=${payload.plotName}`
  }
  if (payload.animalIds) {
    url += `&animalIds=${payload.animalIds}`
  }

  const response = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })
  const data: GetPlotDescriptionsResponse = await response.json()
  return data.content
}

export const fetchPlotDescriptionById = async (
  plotDescriptionId: string,
  locale: string
) => {
  const response = await fetch(
    `${API_URL}plot-descriptions/${plotDescriptionId}`,
    {
      method: "GET",
      headers: {
        "Accept-Language": locale,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    }
  )
  const data = await response.json()
  return data
}
