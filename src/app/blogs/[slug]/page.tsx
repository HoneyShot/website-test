// src/app/blogs/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import BlogDetail from './BlogDetail';
import { ObjectId } from 'mongodb';

export const revalidate = 3600; // Revalidate content every hour

interface BlogPostParams {
  slug: string;
}

async function getBlogPost(slug: string) {
  try {
    const { db } = await connectToDatabase();
    const post = await db.collection('blogs').findOne({ slug, status: 'published' });
    
    if (!post) {
      return null;
    }
    
    // Get related posts based on tags
    const relatedPosts = await db.collection('blogs')
      .find({ 
        slug: { $ne: slug }, // Not the current post
        status: 'published',
        tags: { $in: post.tags || [] }
      })
      .limit(3)
      .project({
        slug: 1,
        title: 1, 
        category: 1,
        date: 1
      })
      .toArray();

    // Format related posts
    const formattedRelatedPosts = relatedPosts.map(related => ({
      id: related._id.toString(),
      title: related.title,
      slug: `/blogs/${related.slug}`,
      category: related.category,
      date: new Date(related.date).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      })
    }));
    
    // Increment view count
    await db.collection('blogs').updateOne(
      { _id: post._id },
      { $inc: { views: 1 } }
    );
    
    // Format post data for component
    return {
      id: post._id.toString(),
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      formattedDate: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      updatedAt: post.updatedAt,
      category: post.category,
      tags: post.tags || [],
      readTime: post.readTime,
      difficulty: post.difficulty,
      author: post.author,
      featuredImage: post.featuredImage,
      tableOfContents: post.tableOfContents || [],
      series: post.series,
      relatedPosts: formattedRelatedPosts,
      views: post.views || 0,
      likes: post.likes || 0,
      codeRepository: post.codeRepository || ''
    };
    
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: BlogPostParams }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  return <BlogDetail post={post} />;
}