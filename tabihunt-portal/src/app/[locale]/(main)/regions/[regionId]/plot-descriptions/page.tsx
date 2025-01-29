import initTranslations from "@/app/i18n"
import PlotDescriptionsHead from "@/components/plotDescription/PlotDescriptionsHead"
import PlotDescriptionsList from "@/components/plotDescription/PlotDescriptionsList"
import TranslationsProvider from "@/components/TranslationsProvider"
import { AnimalType } from "@/models/animals"
import { PlotDescriptionDto } from "@/models/plots"
import { fetchPlotDescriptions } from "@/ssrServices/plot-descriptions"
import { Metadata } from "next"
import "./style.scss"

export const metadata: Metadata = {
  title: "Охотничьи хозяйства (угодья) Казахстана",
  description:
    "Охотничье хозяйство – это вид хозяйственной деятельности по устойчивому использованию объектов животного мира в охотничьих угодьях, сохранению среды обитания животного мира, их охране и воспроизводству."
}

interface PlotDescriptionsProps {
  params: {
    locale: string
    regionId: string
  }
  searchParams: {
    animalType: AnimalType
    plotName: string
  }
}

export default async function PlotDescriptionsPage({
  params: { locale, regionId },
  searchParams: { animalType, plotName }
}: PlotDescriptionsProps) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["plot-descriptions", "common"]
  })
  const plotDescriptions: PlotDescriptionDto[] = await fetchPlotDescriptions(
    {
      regionId,
      animalType,
      plotName
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
        <PlotDescriptionsHead animalType={animalType} />
        <PlotDescriptionsList plotDescriptions={plotDescriptions} />
      </main>
    </TranslationsProvider>
  )
}
