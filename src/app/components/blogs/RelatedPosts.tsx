// src/app/blogs/[slug]/components/RelatedPosts.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/components/LanguageContext';

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
}

export default function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <Link key={post.id} href={post.slug}>
          <div 
            className="border rounded-lg p-5 h-full flex flex-col hover:shadow-md transition-shadow duration-300"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
          >
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--navy-subtle)] text-[var(--navy)] inline-block mb-3 self-start">
              {t.blog.categories[post.category as keyof typeof t.blog.categories] || post.category}
            </span>
            
            <h3 className="font-medium mb-3 flex-grow">
              {post.title}
            </h3>
            
            <div className="text-xs text-[var(--muted)]">
              {post.date}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}