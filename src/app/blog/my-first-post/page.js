'use client'
import Link from 'next/link'

export default function MyFirstPost() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-4">My First Blog Post</h1>
      <div className="text-sm text-muted-foreground mb-6">2024-06-22</div>
      <article className="prose prose-invert dark:prose-invert mb-8">
        <p>Welcome to my blog! This is a sample post. Here you can write about your projects, share tutorials, or discuss new technologies you're learning.</p>
        <p>Stay tuned for more articles and updates!</p>
      </article>
      <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
    </div>
  )
} 