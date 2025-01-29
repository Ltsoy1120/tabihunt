"use client"
import useIsTablet from "@/hooks/useIsTablet"
import { NewsDto } from "@/models/new"
import React from "react"
import NewsList from "./NewsList"
import NewsSlider from "./NewsSlider"

interface NewsViewProps {
  news: NewsDto[]
  isMobile: boolean
}

const NewsView = ({ news, isMobile }: NewsViewProps) => {
  const isTablet = useIsTablet()

  return (
    <>
      {isMobile || isTablet ? (
        <NewsSlider news={news} />
      ) : (
        <NewsList news={news} />
      )}
    </>
  )
}

export default NewsView
