import { GetNewsResponse } from "@/models/new"
import { API_URL } from "@/services/http.service"

export const fetchNews = async (locale: string) => {
  const response = await fetch(`${API_URL}news`, {
    method: "GET",
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })
  const data: GetNewsResponse = await response.json()
  return data.content
}

export const fetchNewsById = async (newsId: string, locale: string) => {
  const response = await fetch(`${API_URL}news/${newsId}`, {
    method: "GET",
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })
  const data = await response.json()
  return data
}
