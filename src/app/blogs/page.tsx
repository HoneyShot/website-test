// src/app/blogs/page.tsx
import { connectToDatabase } from '@/lib/mongodb';
import BlogPageWrapper from './BlogPageWrapper';
export const revalidate = 3600;

async function getBlogPosts() {
  const { db } = await connectToDatabase();
  const posts = await db.collection('blogs')
    .find({ status: "published" })
    .sort({ date: -1 })
    .project({
      slug: 1,
      title: 1,
      excerpt: 1,
      category: 1,
      readTime: 1,
      date: 1
    })
    .toArray();

  return posts.map(post => ({
    id: post._id.toString(),
    title: post.title,
    excerpt: post.excerpt,
    date: new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    category: post.category,
    readTime: post.readTime,
    slug: `/blogs/${post.slug}`
  }));
}

export default async function BlogsPage() {
  const blogPosts = await getBlogPosts();

  return <BlogPageWrapper initialPosts={blogPosts} />;
}