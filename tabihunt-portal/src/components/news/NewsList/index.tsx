"use client"
import { NewsDto } from "@/models/new"
import NewsCard from "../NewsCard"

interface NewsListProps {
  news: NewsDto[]
}

const NewsList = ({ news }: NewsListProps) => {
  return (
    <>
      {news.slice(0, 4).map((oneNews, index) => (
        <NewsCard key={oneNews.id} oneNews={oneNews} index={index + 1} />
      ))}
    </>
  )
}

export default NewsList
