'use client'

export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Angelo Consulta',
    url: 'https://angeloconsulta-portfolio.vercel.app/',
    image: 'https://angeloconsulta-portfolio.vercel.app/profile.png',
    jobTitle: 'Full-Stack Developer',
    email: 'contact@example.com',
    sameAs: [
      'https://www.linkedin.com/in/angeloconsulta',
      'https://github.com/angeloconsulta',
      'https://www.facebook.com/angeloconsulta',
    ],
    description: 'Full-Stack Developer specializing in modern web and cloud technologies',
    knowsAbout: [
      'JavaScript',
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'Java',
      'PHP',
      'Web Development',
      'Cloud Technologies',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Angelo Consulta Portfolio',
    url: 'https://angeloconsulta-portfolio.vercel.app/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate:
          'https://angeloconsulta-portfolio.vercel.app/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
