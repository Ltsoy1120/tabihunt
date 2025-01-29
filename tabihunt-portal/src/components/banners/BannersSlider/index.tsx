"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import { BannerDto } from "@/models/banner"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import Icon from "../../UI/Icon"
import "./style.scss"
import "swiper/css"
import "swiper/css/virtual"
import { useParams } from "next/navigation"
import { API_URL } from "@/services/http.service"
interface BannersSliderProps {
  banners: BannerDto[]
}
const BannersSlider = ({ banners }: BannersSliderProps) => {
  const params = useParams()
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={"auto"}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: any) => console.log(swiper)}
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      speed={1000}
      className="banners-slider"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={banner.id} className="banners-slider-slide">
          <Link
            href={`/${params.locale}/banners/${banner.id}`}
            className="banner"
          >
            <Image
              src={`${API_URL}files/${banner.imageUrl}`}
              alt="banner-img"
              fill
              priority
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 520px, 520px"
            />
            <div className="banner__info">
              <div>
                <h1>{banner.title}</h1>
                <p>{banner.subtitle}</p>
              </div>
              <span className="arrow-circle">
                <Icon name="arrow-right" size={16} />
              </span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default BannersSlider
