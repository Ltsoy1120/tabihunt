"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { VoucherAnimalDto } from "@/models/vouchers"
import "swiper/css"
import "swiper/css/virtual"
import "./style.scss"
import VoucherAnimalCard from "../VoucherAnimalCard"

interface VoucherAnimalsProps {
  animals: VoucherAnimalDto[]
}

const VoucherAnimalsSlider = ({ animals }: VoucherAnimalsProps) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView="auto"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: any) => console.log(swiper)}
      loop={true}
      className="voucherAnimals-slider"
    >
      {animals.map(animal => (
        <SwiperSlide key={animal.id} style={{ width: "220px" }}>
          <VoucherAnimalCard voucherAnimal={animal} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default VoucherAnimalsSlider
