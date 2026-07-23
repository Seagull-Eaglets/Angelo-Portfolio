import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default async function sitemap() {
  const baseUrl = 'https://angeloconsulta-portfolio.vercel.app'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic blog posts
  const postsDirectory = path.join(process.cwd(), 'src/blog-posts')
  let blogPosts = []

  try {
    const filenames = fs.readdirSync(postsDirectory)
    blogPosts = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        const slug = filename.replace(/\.md$/, '')

        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: data.date ? new Date(data.date) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        }
      })
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error)
  }

  return [...staticPages, ...blogPosts]
}
