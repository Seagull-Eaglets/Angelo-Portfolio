import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import rehypeHighlight from 'rehype-highlight'

export const runtime = 'nodejs'

export const dynamic = 'force-static'

export async function generateMetadata({ params }) {
  const { slug } = params
  const fileName = slug.endsWith('.md') ? slug : `${slug}.md`
  const filePath = path.join(process.cwd(), 'src/blog-posts', fileName)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  const url = `https://angeloconsulta-portfolio.vercel.app/blog/${slug}`
  return {
    title: data.title,
    description: data.summary || data.description || '',
    openGraph: {
      title: data.title,
      description: data.summary || data.description || '',
      url,
      type: 'article',
      images: [
        {
          url: data.image ? data.image : '/profile.png',
          width: 800,
          height: 520,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.summary || data.description || '',
      images: [data.image ? data.image : '/profile.png'],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogPost({ params }) {
  const { slug } = params
  const fileName = slug.endsWith('.md') ? slug : `${slug}.md`
  const filePath = path.join(process.cwd(), 'src/blog-posts', fileName)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const url = `https://angeloconsulta-portfolio.vercel.app/blog/${slug}`

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': data.title,
            'description': data.summary || data.description || '',
            'image': data.image ? `https://angeloconsulta-portfolio.vercel.app/${data.image}` : 'https://angeloconsulta-portfolio.vercel.app/profile.png',
            'author': {
              '@type': 'Person',
              'name': 'Angelo Consulta'
            },
            'datePublished': data.date,
            'url': url
          })
        }} />
      </Head>
      <div className="max-w-2xl mx-auto py-20 px-4">
        <Link href="/blog" className="text-primary hover:underline mb-6 inline-block">← Back to Blog</Link>
        <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
        <div className="text-sm text-muted-foreground mb-6">{data.date}</div>
        <article className="prose prose-invert dark:prose-invert mb-8">
          <MDXRemote source={content} options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }} />
        </article>
        {data.tags && (
          <div className="mb-4">
            {data.tags.map(tag => (
              <span key={tag} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs mr-2 mb-2">#{tag}</span>
            ))}
          </div>
        )}
        <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        <div className="mt-12">
          {/*
            To enable Giscus comments:
            1. Go to https://giscus.app and configure your repo (public, with Discussions enabled).
            2. Replace the 'data-repo' and 'data-repo-id' below with your own values.
            3. Optionally, adjust category and theme.
          */}
          <script src="https://giscus.app/client.js"
            data-repo="YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"
            data-repo-id="YOUR_REPO_ID"
            data-category="General"
            data-category-id="YOUR_CATEGORY_ID"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="bottom"
            data-theme="preferred_color_scheme"
            data-lang="en"
            crossOrigin="anonymous"
            async>
          </script>
          <noscript>
            <p className="text-muted-foreground">Enable JavaScript to view comments.</p>
          </noscript>
        </div>
      </div>
    </>
  )
} 