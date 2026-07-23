const BASE_URL = 'https://angeloconsulta-portfolio.vercel.app'

export default function ShareHead({
  title = 'Angelo Consulta Portfolio',
  description = 'Welcome to my portfolio and blog where I share projects, insights, and experiences.',
  url = BASE_URL,
  image = `${BASE_URL}/profile.png`,
  imageLogo = `${BASE_URL}/Tech-Angelo-logo.png`,
  imageAlt = 'Angelo Consulta profile',
  siteName = 'Angelo Consulta Portfolio',
  canonicalURL,
}) {
  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalURL || url} />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:image:logo" content={imageLogo} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
