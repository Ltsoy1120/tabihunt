"use client"
import Image from "next/image"
import Icon from "@/components/UI/Icon"
import { NewsDto as NewsDto } from "@/models/new"
import { calculateWidth } from "@/helpers/common"
import "./style.scss"
import { useParams } from "next/navigation"
import { API_URL } from "@/services/http.service"
import Link from "next/link"

interface NewsCardProps {
  oneNews: NewsDto
  index?: number
}

const NewsCard = ({ oneNews, index }: NewsCardProps) => {
  const params = useParams()
  return (
    <Link
      href={`/${params.locale}/news/${oneNews.id}`}
      className="news-card"
      style={{
        width: index ? calculateWidth(index) : "100%"
      }}
    >
      <Image
        src={`${API_URL}files/${oneNews.imageUrl}`}
        alt="news-img"
        fill
        priority
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 40vw"
      />
      <div className="news-card__top">
        <span className="news-card__views">
          <Icon name="view" size={18} />
          {oneNews.views}
        </span>
        {/* {index && index > 0 && ( */}
        <span className="news-card__btn">
          <Icon name="arrow-right" size={18} />
        </span>
        {/* )} */}
      </div>
      <div className="news-card__title">
        <h3>{oneNews.title}</h3>
      </div>
    </Link>
  )
}

export default NewsCard
