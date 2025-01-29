"use client"
import { useEffect, useState } from "react"

// Функция для получения isTablet в зависимости от ширины экрана
const useIsMobile = (): boolean => {
  const [isTablet, setIsTablet] = useState<boolean>(false)

  const handleResize = () => {
    // Определяем, является ли устройство планшетом (например, до 900px)
    setIsTablet(window.innerWidth <= 560)
  }

  useEffect(() => {
    // Инициализируем состояние при первом рендере
    handleResize()

    // Добавляем слушатель изменения размера экрана
    window.addEventListener("resize", handleResize)

    return () => {
      // Убираем слушатель при размонтировании компонента
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isTablet
}

export default useIsMobile
