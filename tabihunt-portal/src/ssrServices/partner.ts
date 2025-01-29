import {
  PartnershipApplyData,
  PartnershipContentDto,
  PartnershipDto
} from "@/models/partner"
import { API_URL } from "@/services/http.service"

export const fetchPartnerShipContent = async (locale: string) => {
  const response = await fetch(`${API_URL}contents/partnership`, {
    method: "GET",
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })
  const data: PartnershipContentDto = await response.json()
  return data
}
