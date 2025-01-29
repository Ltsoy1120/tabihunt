import { GetPageParameters, PageNotificationDto } from "@/models/notification"
import { AxiosResponse } from "axios"
import http from "./http.service"

export const notificationsService = {
  async getNotifications(
    payload?: GetPageParameters
  ): Promise<AxiosResponse<PageNotificationDto>> {
    let url = `users/me/notifications?page=${payload?.page ?? 0}&size=${
      payload?.size ?? 100
    }`

    return await http.get(url)
  }
}
