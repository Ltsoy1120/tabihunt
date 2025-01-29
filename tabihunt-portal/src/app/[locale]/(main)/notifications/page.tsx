"use client"
import React, { useEffect, useState } from "react"
import "./style.scss"
import { useTranslation } from "react-i18next"
import { notificationsService } from "@/services/notifications.service"
import { NotificationDto } from "@/models/notification"
import { classMerge } from "@/helpers/common"

const Notifications = () => {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState<NotificationDto[]>([])

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const result = await notificationsService.getNotifications()
        if (result) {
          setNotifications(result.data.content)
        }
      } catch (error) {}
    }

    getNotifications()
  }, [])

  return (
    <div className="notifications">
      <h2>{t("personal-notifications.title")}</h2>
      {notifications.length > 0 &&
        notifications.map(notification => (
          <div key={notification.id} className="notification">
            <span
              className={classMerge(
                "marker",
                notification.isViewed ? "active" : null
              )}
            ></span>
            <div>
              <h3>{notification.subject}</h3>
              <p>{notification.body}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Notifications
