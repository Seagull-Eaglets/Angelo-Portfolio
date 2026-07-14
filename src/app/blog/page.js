import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

export const metadata = {
  title: 'Blog | Angelo Consulta',
  description: 'Read articles, tutorials, and insights about web development, modern technologies, and best practices in full-stack development.',
  openGraph: {
    title: 'Blog | Angelo Consulta',
    description: 'Read articles, tutorials, and insights about web development, modern technologies, and best practices in full-stack development.',
    url: 'https://angeloconsulta-portfolio.vercel.app/blog',
    type: 'website',
    images: [
      {
        url: '/profile.png',
        width: 800,
        height: 520,
        alt: 'Angelo Consulta Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Angelo Consulta',
    description: 'Read articles, tutorials, and insights about web development, modern technologies, and best practices in full-stack development.',
    images: ['/profile.png'],
  },
  alternates: {
    canonical: 'https://angeloconsulta-portfolio.vercel.app/blog',
  },
};

function getAllTags(posts) {
  const tagSet = new Set();
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}

function filterPosts(posts, selectedTag, searchQuery) {
  let filtered = posts;
  if (selectedTag) {
    filtered = filtered.filter(post => post.tags && post.tags.includes(selectedTag));
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(q) ||
      post.summary.toLowerCase().includes(q) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  }
  return filtered;
}

function getReadingTime(text) {
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `~${minutes} min read`;
}

export default async function Blog({ searchParams }) {
  const postsDirectory = path.join(process.cwd(), 'src/blog-posts');
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug: filename.replace(/\.md$/, ''),
      ...data,
      content,
      readingTime: getReadingTime(content),
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const allTags = getAllTags(posts);
  const selectedTag = searchParams?.tag;
  const searchQuery = searchParams?.q || '';
  const filteredPosts = filterPosts(posts, selectedTag, searchQuery);
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto py-20 px-4 grid grid-cols-1 lg:grid-cols-4 gap-12">
      <div className="lg:col-span-3">
        <Link href="/" className="text-primary hover:underline mb-6 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <div className="mb-10 p-6 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/10 border border-primary/30 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2 text-primary">Why This Blog Matters</h2>
          <p className="text-lg text-foreground mb-2">This blog is more than just a collection of articles—it's a showcase of my passion for technology, learning, and sharing knowledge with the community.</p>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>Discover in-depth tutorials and guides on modern web development.</li>
            <li>Read about real-world project case studies and lessons learned.</li>
            <li>Stay updated with the latest trends, tools, and best practices.</li>
            <li>See my commitment to continuous learning and community contribution.</li>
          </ul>
        </div>
        <p className="mb-8 text-muted-foreground">Articles, tutorials, and thoughts on development.</p>
        {/* Search Bar */}
        <form action="/blog" method="get" className="mb-8 flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search posts..."
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {selectedTag && <input type="hidden" name="tag" value={selectedTag} />}
          <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">Search</button>
          {searchQuery && (
            <Link href={selectedTag ? `/blog?tag=${encodeURIComponent(selectedTag)}` : '/blog'} className="ml-2 text-xs text-muted-foreground underline self-center">Clear</Link>
          )}
        </form>
        {/* Tag Filter Bar */}
        {allTags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-3 items-center">
            <span className="font-medium text-foreground">Filter by tag:</span>
            {allTags.map(tag => (
              <Link
                key={tag}
                href={tag === selectedTag ? '/blog' : `/blog?tag=${encodeURIComponent(tag)}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${tag === selectedTag ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-foreground hover:bg-primary/10'}`}
              >
                #{tag}
              </Link>
            ))}
            {selectedTag && (
              <Link href={searchQuery ? `/blog?q=${encodeURIComponent(searchQuery)}` : '/blog'} className="ml-2 text-xs text-muted-foreground underline">Clear filter</Link>
            )}
          </div>
        )}
        <div className="space-y-8">
          {filteredPosts.length === 0 && (
            <div className="text-muted-foreground">No posts found for this search or tag.</div>
          )}
          {filteredPosts.map(post => (
            <div key={post.slug} className="bg-background rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <div className="text-sm text-muted-foreground mb-2">{post.date} <span className="mx-1">•</span> {post.readingTime}</div>
              <p className="mb-2">{post.summary}</p>
              {post.tags && (
                <div className="mb-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs mr-2 mb-2">#{tag}</span>
                  ))}
                </div>
              )}
              <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-medium">Read More →</Link>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Posts Widget */}
      <aside className="lg:col-span-1 mb-12 lg:mb-0">
        <div className="bg-background border border-border rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-primary">Recent Posts</h3>
          <ul className="space-y-3">
            {recentPosts.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="font-medium text-foreground hover:text-primary transition-colors">
                  {post.title}
                </Link>
                <div className="text-xs text-muted-foreground">{post.date} <span className="mx-1">•</span> {post.readingTime}</div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
} 