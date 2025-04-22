// src/app/blogs/components/BlogList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
}

export default function BlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [mounted, setMounted] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  // Handle client-side rendering for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter blog posts based on search params
  useEffect(() => {
    if (!searchQuery) {
      setFilteredPosts(initialPosts);
    } else {
      const filtered = initialPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, initialPosts]);

  if (!mounted) {
    return null; // Avoid rendering until client-side to prevent hydration issues
  }

  return (
    <div className="space-y-8">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => (
          <Link href={post.slug} key={post.id}>
            <article 
              className="group border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
              style={{ 
                borderColor: "var(--border-color)",
                backgroundColor: "var(--card-bg)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${0.1 * index}s`
              }}
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--navy-subtle)] text-[var(--navy)]">
                    {t.blog.categories[post.category as keyof typeof t.blog.categories] || post.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-transparent text-[var(--muted)]" style={{ border: '1px solid var(--border-color)' }}>
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[var(--navy)] transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-[var(--muted)] mb-4">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--muted)]">
                    {post.date}
                  </span>
                  <span className="text-[var(--navy)] font-medium group-hover:translate-x-1 transition-transform duration-300">
                    {t.blog.readMore} →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-[var(--muted)]">{t.blog.noArticlesFound}</h3>
          <p className="mt-2">{t.blog.tryDifferentSearch}</p>
        </div>
      )}
    </div>
  );
}