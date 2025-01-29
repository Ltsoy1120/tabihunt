import BannerCard from "@/components/banners/BannerCard"
import Button from "@/components/UI/buttons/Button"
import { fetchBannerById } from "@/ssrServices/banners"
import Link from "next/link"
import "./style.scss"

interface BannerPageProps {
  params: {
    locale: string
    id: string
  }
}

const BannerPage = async ({ params: { locale, id } }: BannerPageProps) => {
  const banner = await fetchBannerById(id, locale)

  return (
    <div className="banner-page">
      <BannerCard banner={banner} />
      <p>{banner.description}</p>
      <Link href={`/${locale}/vouchers`}>
        <Button>Перейти к путевкам</Button>
      </Link>
    </div>
  )
}

export default BannerPage
