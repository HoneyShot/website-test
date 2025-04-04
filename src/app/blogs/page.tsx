'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../components/LanguageContext';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    excerpt: 'Next.js is a powerful React framework that makes building fullstack applications simple and efficient.',
    date: 'April 12, 2023',
    category: 'Development',
    readTime: '5 min read',
    slug: '/blogs/getting-started-with-nextjs'
  },
  {
    id: 2,
    title: 'The Power of Tailwind CSS',
    excerpt: 'Discover how Tailwind CSS can transform your frontend workflow with its utility-first approach.',
    date: 'March 28, 2023',
    category: 'Design',
    readTime: '4 min read',
    slug: '/blogs/power-of-tailwind-css'
  },
  {
    id: 3,
    title: 'Modern Authentication Strategies',
    excerpt: 'Learn about the latest authentication methods to keep your applications secure and user-friendly.',
    date: 'February 15, 2023',
    category: 'Security',
    readTime: '8 min read',
    slug: '/blogs/modern-authentication-strategies'
  },
  {
    id: 4,
    title: 'Building Accessible Web Applications',
    excerpt: 'Making your web applications accessible is not just good practice, it\'s essential for reaching all users.',
    date: 'January 22, 2023',
    category: 'Accessibility',
    readTime: '6 min read',
    slug: '/blogs/building-accessible-web-applications'
  },
  {
    id: 5,
    title: 'Performance Optimization Techniques',
    excerpt: 'Explore various strategies to make your web applications faster and more efficient.',
    date: 'December 10, 2022',
    category: 'Performance',
    readTime: '7 min read',
    slug: '/blogs/performance-optimization-techniques'
  }
];

export default function BlogsPage() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Handle client-side rendering for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter blog posts based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm]);

  if (!mounted) {
    return null; // Avoid rendering until client-side to prevent hydration issues
  }

  return (
    <main className="flex flex-col min-h-screen px-4 md:px-8 py-12">
      <section className="max-w-5xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[var(--navy)] to-[var(--color-primary)] text-transparent bg-clip-text">
          Blog
        </h1>
        
        <div className="mb-10">
          <p className="text-lg text-[var(--muted)] max-w-3xl">
            Explore my latest thoughts, tutorials, and insights on web development, 
            design patterns, and technology trends.
          </p>
          
          {/* Search */}
          <div className="mt-6 relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--navy)] bg-transparent"
              style={{ borderColor: "var(--border-color)" }}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 absolute left-3 top-3.5 text-[var(--muted)]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
        
        {/* Blog Posts */}
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
                        {post.category}
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
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-[var(--muted)]">No articles found</h3>
              <p className="mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}