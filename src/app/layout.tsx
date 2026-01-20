import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ChatBotWrapper from "@/components/ChatBotWrapper";
import CallbackPopup from "@/components/CallbackPopup";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://soniachna.com'),
  title: "Пансіонат 'Сонячна Долина' | Одеса, с. Лески | Затишок та турбота",
  description: "Пансіонат 'Сонячна Долина' в Одесі (с.Лески) - місце, де про вас подбають з турботою та повагою. Комфортні умови проживання та професійний догляд для людей похилого віку.",
  keywords: "пансіонат, будинок для літніх людей, догляд за літніми людьми, Одеса, с.Лески, пансіонат Одеса, Сонячна Долина, пансіонат для літніх",
  authors: [{ name: "Пансіонат 'Сонячна Долина'" }],
  creator: "Пансіонат 'Сонячна Долина'",
  publisher: "Пансіонат 'Сонячна Долина'",
  alternates: {
    canonical: 'https://soniachna.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Пансіонат 'Сонячна Долина' | Одеса, с. Лески",
    description: "Пансіонат 'Сонячна Долина' в Одесі (с.Лески) - комфортні умови проживання та професійний догляд для людей похилого віку.",
    url: 'https://soniachna.com',
    siteName: "Пансіонат 'Сонячна Долина'",
    locale: 'uk_UA',
    type: 'website',
    images: [
      {
        url: 'https://soniachna.com/pensionat.jpg',
        width: 1200,
        height: 630,
        alt: "Пансіонат 'Сонячна Долина' в Одесі",
      },
    ],
  },
  icons: {
    icon: 'https://soniachna.com/favicon.ico',
    shortcut: 'https://soniachna.com/favicon.ico',
    apple: 'https://soniachna.com/favicon.ico'
  },
  verification: {
    google: 'google0e462aaa1ed0868a.html', // Замінити на реальний код верифікації google-site-verification: google0e462aaa1ed0868a.html
  },
  category: 'пансіонат, догляд за літніми людьми, Одеса, пансіонат Одеса, с.Лески'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17306290470" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17306290470');
          `}
        </Script>
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NursingHome',
            name: "Пансіонат 'Сонячна Долина'",
            legalName: "Пансіонат 'Сонячна Долина'",
            url: 'https://soniachna.com',
            telephone: '+380974757157',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'с. Лески',
              addressRegion: 'Одеська область',
              addressCountry: 'UA',
              postalCode: '65000',
              streetAddress: 'вул. Шевченка, 4Б',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 46.542,
              longitude: 30.781,
            },
            sameAs: [
              'https://www.facebook.com',
              'https://www.instagram.com',
            ],
            description:
              "Пансіонат 'Сонячна Долина' в Одесі (с. Лески) – комфортне проживання та професійний догляд за людьми похилого віку.",
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                ],
                opens: '08:00',
                closes: '20:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '09:00',
                closes: '18:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Sunday',
                opens: '10:00',
                closes: '16:00',
              },
            ],
          })}
        </Script>
        {/* End Google tag (gtag.js) */}
      </head>
      <body
        className={`${roboto.variable} font-sans antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <ChatBotWrapper />
        <CallbackPopup />
      </body>
    </html>
  );
}
