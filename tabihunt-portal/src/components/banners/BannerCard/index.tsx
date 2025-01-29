import { BannerDto } from "@/models/banner"
import { API_URL } from "@/services/http.service"
import Image from "next/image"
import "./style.scss"

interface BannerCardProps {
  banner: BannerDto
}

const BannerCard = ({ banner }: BannerCardProps) => {
  return (
    <div className="banner-card">
      <Image
        src={`${API_URL}files/${banner.imageUrl}`}
        alt="banner-img"
        fill
        priority
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 40vw"
      />
      <div className="banner__info">
        <div>
          <h1>{banner.title}</h1>
          <p>{banner.subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export default BannerCard
