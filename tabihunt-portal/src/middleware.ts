import { NextResponse } from "next/server"
import i18nConfig from "../i18nConfig"

export function middleware(request: any) {
  const url = request.nextUrl
  const pathname = url.pathname

  if (pathname === "/") {
    const defaultLocale = i18nConfig.defaultLocale || "ru"
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/((?!api|static|.*\\..*|_next).*)"]
}
