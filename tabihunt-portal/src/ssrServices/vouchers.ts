import { GetVouchersParameters, GetVouchersResponse } from "@/models/vouchers"
import { API_URL } from "@/services/http.service"

export const fetchVouchers = async (
  payload: GetVouchersParameters,
  locale: string
) => {
  let url = `regions/${payload.regionId}/vouchers?page=${
    payload.page ?? 0
  }&size=${payload.size ?? 10}`

  if (payload.plotId) {
    url += `&plotId=${payload.plotId}`
  }

  if (payload.type) {
    url += `&type=${payload.type}`
  }

  if (payload.animalType) {
    url += `&animalType=${payload.animalType}`
  }

  if (payload.animalName) {
    url += `&animalName=${payload.animalName}`
  }
  const response = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })
  const data: GetVouchersResponse = await response.json()
  return data.content
}

export const fetchVoucherById = async (voucherId: string, locale: string) => {
  const response = await fetch(`${API_URL}vouchers/${voucherId}`, {
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
