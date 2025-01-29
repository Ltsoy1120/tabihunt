"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import VoucherCard from "../VoucherCard"
import "swiper/css"
import "swiper/css/virtual"
import "./style.scss"
import { PurchasedVoucherDto } from "@/models/vouchers"
import useIsMobile from "@/hooks/useIsMobile"

interface VoucherSliderProps {
  meVouchers: PurchasedVoucherDto[]
}

const VoucherSlider = ({ meVouchers }: VoucherSliderProps) => {
  const isMobile = useIsMobile()
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView="auto"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: any) => console.log(swiper)}
      loop={true}
      className="voucher-slider"
    >
      {meVouchers.map(voucher => (
        <SwiperSlide
          key={voucher.id}
          style={{ width: isMobile ? "290px" : "680px" }}
        >
          <VoucherCard voucher={voucher} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default VoucherSlider
