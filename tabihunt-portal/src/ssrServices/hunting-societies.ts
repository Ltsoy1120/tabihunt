import {
  GetHuntingSocietiesParameters,
  GetHuntingSocietiesResponse
} from "@/models/huntingSociety"
import { API_URL } from "@/services/http.service"

export const fetchHuntingSocieties = async (
  locale: string,
  payload?: GetHuntingSocietiesParameters
) => {
  let url = `hunting-societies?page=${payload?.page ?? 0}&size=${
    payload?.size ?? 10
  }`

  if (payload?.name) {
    url += `&name=${payload.name}`
  }

  const response = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })
  const data: GetHuntingSocietiesResponse = await response.json()
  return data.content
}

export const fetchHuntingSocietyById = async (
  huntingSocietiesId: string,
  locale: string
) => {
  const response = await fetch(
    `${API_URL}hunting-societies/${huntingSocietiesId}`,
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
