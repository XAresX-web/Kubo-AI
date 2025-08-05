import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function SEOHead({
  title = "KUBO AI - La Revolución del Desarrollo de Software",
  description = "Únete a la lista de espera de KUBO AI, la IA más avanzada para desarrollo de software. Crea aplicaciones completas 10x más rápido que cualquier herramienta actual.",
  image = "/og-image.jpg",
  url = "https://kubo-ai.com",
}: SEOHeadProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="AI, desarrollo software, programación, código automático, KUBO AI, herramientas desarrollo"
      />
      <meta name="author" content="KUBO AI Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="KUBO AI" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "KUBO AI",
            description: description,
            url: url,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </Head>
  )
}
