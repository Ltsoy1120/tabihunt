import { BannerDto } from "@/models/banner"
import { API_URL } from "@/services/http.service"

export const fetchBanners = async (regionId: string, locale: string) => {
  const response = await fetch(`${API_URL}regions/${regionId}/banners`, {
    method: "GET",
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })
  const data: BannerDto[] = await response.json()
  return data
}

export const fetchBannerById = async (bannerId: string, locale: string) => {
  const response = await fetch(`${API_URL}banners/${bannerId}`, {
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
