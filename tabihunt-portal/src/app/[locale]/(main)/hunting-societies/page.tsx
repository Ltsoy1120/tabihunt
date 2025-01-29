import initTranslations from "@/app/i18n"
import HuntingSocietiesHead from "@/components/huntingSocieties/HuntingSocietiesHead"
import HuntingSocietiesList from "@/components/huntingSocieties/HuntingSocietiesList"
import MeHuntingSocieties from "@/components/huntingSocieties/MeHuntingSocieties"
import TranslationsProvider from "@/components/TranslationsProvider"
import { HuntingSocietyDto } from "@/models/huntingSociety"
import { fetchHuntingSocieties } from "@/ssrServices/hunting-societies"
import { Metadata } from "next"
import "./style.scss"

export const metadata: Metadata = {
  title: "Охотничьи сообщества Казахстана"
}

interface HuntingSocietiesProps {
  params: {
    locale: string
  }
  searchParams: {
    hunter: string
    name: string
  }
}

export default async function HuntingSocietiesPage({
  params: { locale },
  searchParams: { hunter, name }
}: HuntingSocietiesProps) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["hunting-societies", "common"]
  })
  const huntingSocieties: HuntingSocietyDto[] = await fetchHuntingSocieties(
    locale,
    {
      name
    }
  )

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["hunting-societies", "common"]}
    >
      {hunter === "me" ? (
        <MeHuntingSocieties />
      ) : (
        <main className="hunting-societies-page">
          <HuntingSocietiesHead />
          <HuntingSocietiesList huntingSocieties={huntingSocieties} />
        </main>
      )}
    </TranslationsProvider>
  )
}
