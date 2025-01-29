import initTranslations from "@/app/i18n"
import { Metadata } from "next"
import PlotDescriptionsHead from "@/components/plotDescription/PlotDescriptionsHead"
import PlotDescriptionsList from "@/components/plotDescription/PlotDescriptionsList"
import TranslationsProvider from "@/components/TranslationsProvider"
import { AnimalType } from "@/models/animals"
import { PlotDescriptionDto } from "@/models/plots"
import { fetchPlotDescriptions } from "@/ssrServices/plot-descriptions"
import "./style.scss"

export const metadata: Metadata = {
  title: "Охотничьи хозяйства (угодья) Казахстана",
  description:
    "Охотничье хозяйство – это вид хозяйственной деятельности по устойчивому использованию объектов животного мира в охотничьих угодьях, сохранению среды обитания животного мира, их охране и воспроизводству.",
  twitter: {
    card: "summary_large_image"
  }
}

interface PlotDescriptionsProps {
  params: {
    locale: string
    regionId: string
  }
  searchParams: {
    animalType: AnimalType
    plotName: string
    animalIds: string
  }
}

export default async function PlotDescriptionsPage({
  params: { locale, regionId },
  searchParams: { animalType, plotName, animalIds }
}: PlotDescriptionsProps) {
  const { t, resources } = await initTranslations({
    locale,
    namespaces: ["plot-descriptions", "common"]
  })

  const defaultId = "518fd3e8-5b63-4b63-b0a9-000000000001" // Алматинская область

  const plotDescriptions: PlotDescriptionDto[] = await fetchPlotDescriptions(
    {
      regionId: regionId ?? defaultId,
      animalType,
      plotName,
      animalIds
    },
    locale
  )

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["plot-descriptions", "common"]}
    >
      <main className="plot-descriptions-page">
        <h1>{t("main.title")}</h1>
        <p>{t("main.text")}</p>
        <div className="plot-descriptions">
          <PlotDescriptionsHead
            animalType={animalType}
            animalIds={animalIds ? animalIds.split(",") : []}
          />
          <PlotDescriptionsList plotDescriptions={plotDescriptions} />
        </div>
      </main>
    </TranslationsProvider>
  )
}
