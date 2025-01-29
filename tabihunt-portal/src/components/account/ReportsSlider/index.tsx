"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/virtual"
import ReportCard from "../ReportCard"
import "./style.scss"
import { PurchasedVoucherDto } from "@/models/vouchers"
import useIsMobile from "@/hooks/useIsMobile"

interface ReportsSliderProps {
  meVouchers: PurchasedVoucherDto[]
}

const ReportsSlider = ({ meVouchers }: ReportsSliderProps) => {
  const isMobile = useIsMobile()

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView="auto"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: any) => console.log(swiper)}
      loop={true}
      className="reports-slider"
    >
      {meVouchers.map(voucher => (
        <SwiperSlide
          key={voucher.id}
          style={{ width: isMobile ? "290px" : "380px" }}
        >
          <ReportCard voucher={voucher} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ReportsSlider
