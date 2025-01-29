import NewsCard from "@/components/news/NewsCard"
import { fetchNewsById } from "@/ssrServices/news"
import "./style.scss"

interface NewsPageProps {
  params: {
    locale: string
    id: string
  }
}

const NewsPage = async ({ params: { locale, id } }: NewsPageProps) => {
  const oneNews = await fetchNewsById(id, locale)

  return (
    <div className="news-page">
      <NewsCard oneNews={oneNews} />
      <p>{oneNews.description}</p>
    </div>
  )
}

export default NewsPage
