import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/components/TranslationsProvider"
import VouchersHead from "@/components/vouchers/VouchersHead"
import { AnimalType } from "@/models/animals"
import { PlotDto } from "@/models/plots"
import { VoucherDto, VoucherType } from "@/models/vouchers"
import { fetchPlotsByRegion } from "@/ssrServices/plots"
import { fetchVouchers } from "@/ssrServices/vouchers"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
const VouchersList = dynamic(
  () => import("@/components/vouchers/VouchersList"),
  { suspense: true }
)
import "./style.scss"

export const metadata: Metadata = {
  title: "Онлайн путевки на охоту в Казахстане"
}

interface VouchersPageProps {
  params: {
    locale: string
    regionId: string
  }
  searchParams: {
    plotId: string
    animalType: AnimalType
    type: VoucherType
    animalName: string
  }
}

export default async function VouchersPage({
  params: { locale, regionId },
  searchParams: { plotId, animalType, type, animalName }
}: VouchersPageProps) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["vouchers"]
  })
  const defaultId = "518fd3e8-5b63-4b63-b0a9-000000000001" // Алматинская область
  const plots: PlotDto[] = await fetchPlotsByRegion(defaultId, locale)
  const vouchers: VoucherDto[] = await fetchVouchers(
    {
      regionId: regionId ?? defaultId,
      plotId,
      animalType,
      type,
      animalName
    },
    locale
  )

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["vouchers"]}
    >
      <main className="vouchers-page">
        <VouchersHead
          plots={plots}
          plotId={plotId}
          animalType={animalType}
          type={type}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <VouchersList vouchers={vouchers} />
        </Suspense>
      </main>
    </TranslationsProvider>
  )
}
