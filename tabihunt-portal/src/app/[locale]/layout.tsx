import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrapper from "./ClientWrapper";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import "@/assets/scss/base.scss";
import Script from "next/script";
import { Suspense } from "react";
import YandexMetrika from "@/components/YandexMetrika";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tabihunt.kz - Купить путевку на охоту Online в Казахстане",
  description:
    "Tabihunt цифровой помощник охотников. Онлайн путевки на охоту доступны 24 часа. Информация об охоте в Казахстане, видах дичи, услугах охотничьих хозяйств и мест для охоты.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["common", "auth"],
  });

  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <Script
          src="https://widget.tiptoppay.kz/bundles/widget.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Script id="metrika-counter" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
    ym(99197226, "init", {
          defer: true,
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
    });`}
        </Script>
        <Suspense fallback={<></>}>
          <YandexMetrika />
        </Suspense>

        <TranslationsProvider
          resources={resources}
          locale={locale}
          namespaces={["common", "auth"]}
        >
          <ClientWrapper>{children}</ClientWrapper>
        </TranslationsProvider>
      </body>
    </html>
  );
}
