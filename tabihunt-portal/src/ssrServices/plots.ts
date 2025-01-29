import { GetPlotsResponse } from "@/models/plots"
import { API_URL } from "@/services/http.service"

export const fetchPlotsByRegion = async (regionId: string, locale: string) => {
  const response = await fetch(
    `${API_URL}regions/${regionId}/plots?page=0&size=10`,
    {
      method: "GET",
      headers: {
        "Accept-Language": locale,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    }
  )
  const data: GetPlotsResponse = await response.json()
  return data.content
}
