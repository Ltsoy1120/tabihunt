"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { NewsDto } from "@/models/new"
import "swiper/css"
import "swiper/css/virtual"
import "./style.scss"
import NewsCard from "../NewsCard"
import { Autoplay } from "swiper/modules"

interface NewsSliderProps {
  news: NewsDto[]
}

const NewsSlider = ({ news }: NewsSliderProps) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView="auto"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: any) => console.log(swiper)}
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      speed={1000}
      className="news-slider"
    >
      {news.map(oneNews => (
        <SwiperSlide key={oneNews.id} className="news-slider__slide">
          <NewsCard oneNews={oneNews} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default NewsSlider
