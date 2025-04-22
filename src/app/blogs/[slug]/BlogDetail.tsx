// src/app/blogs/[slug]/components/BlogDetail.tsx
'use client';

import { useState, useEffect, createElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/app/components/LanguageContext';
import { FaCalendarAlt, FaClock, FaTag, FaChevronLeft, FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaEye, FaHeart } from 'react-icons/fa';
import TableOfContents from '@/app/components/blogs/TableOfContents';
import RelatedPosts from '@/app/components/blogs/RelatedPosts';
import AuthorCard from '@/app/components/blogs/AuthorCard';

// Update the content type to support Editor.js block structure
interface EditorJSBlock {
  type: string;
  data: {
    text?: string;
    level?: number;
    code?: string;
    language?: string;
    src?: string;
    alt?: string;
    caption?: string;
    [key: string]: any;
  };
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | EditorJSBlock[]; // Support both string and EditorJS blocks
  titleTr?: string;
  excerptTr?: string;
  contentTr?: string;
  date: string;
  formattedDate: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readTime: string;
  difficulty: string;
  author: {
    id: string;
    name: string;
    bio: string;
    avatar: string;
  };
  featuredImage: {
    url: string;
    alt: string;
    caption: string;
  };
  tableOfContents: {
    title: string;
    anchor: string;
  }[];
  series?: {
    title: string;
    order: number;
  };
  relatedPosts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    date: string;
  }[];
  views: number;
  likes: number;
  codeRepository: string;
}

export default function BlogDetail({ post }: { post: BlogPost }) {
  const { lang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [currentHeading, setCurrentHeading] = useState('');
  const [liked, setLiked] = useState(false);
  
  // Content based on language
  const title = post.title;
  const excerpt = post.excerpt;
  const content = post.content;
  
  // Handle client-side rendering
  useEffect(() => {
    setMounted(true);
    
    // Check if user has liked this post before
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    setLiked(likedPosts.includes(post.id));
    
    // Intersection Observer for headings to update active TOC item
    const headings = document.querySelectorAll('h2, h3');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentHeading(entry.target.id);
        }
      });
    }, { threshold: 0.1, rootMargin: '-80px 0px -80% 0px' });
    
    headings.forEach(heading => observer.observe(heading));
    
    return () => observer.disconnect();
  }, [post.id]);

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    
    if (!liked) {
      // Update likes in database via API call
      fetch(`/api/blogs/${post.id}/like`, { method: 'POST' })
        .catch(error => console.error('Error liking post:', error));
      
      // Update UI optimistically
      likedPosts.push(post.id);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      setLiked(true);
    }
  };

  // Social sharing URLs
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  
  if (!mounted) return null; // Prevent hydration issues
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div 
        className="w-full bg-gradient-to-r py-16 px-4"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${post.featuredImage.url})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          color: 'white'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-white opacity-80 hover:opacity-100 mb-6 transition-opacity duration-200"
          >
            <FaChevronLeft className="mr-2" /> {t.blog.BlogDetail.backToBlog}
          </Link>
          
          <div className="space-y-4">
            {post.series && (
              <div className="text-sm font-medium px-3 py-1 bg-[var(--navy)] inline-block rounded-full">
                {post.series.title} - {t.blog.BlogDetail.part} {post.series.order}
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl opacity-90">
              {excerpt}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm opacity-75">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" /> {post.formattedDate}
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" /> {post.readTime}
              </div>
              <div className="flex items-center">
                <FaEye className="mr-2" /> {post.views.toLocaleString()} {t.blog.BlogDetail.views}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar for desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            {/* Table of Contents */}
            {post.tableOfContents.length > 0 && (
              <TableOfContents 
                items={post.tableOfContents} 
                currentId={currentHeading} 
              />
            )}
            
            {/* Author Card - Mobile position is different */}
            <div className="hidden lg:block">
              <AuthorCard author={post.author} />
            </div>
            
            {/* Tags */}
            <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-semibold mb-3">
                {t.blog.BlogDetail.tags}
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/blogs?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-sm rounded-full transition-colors duration-200 bg-[var(--navy-subtle)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Social Share */}
            <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-semibold mb-3">
                {t.blog.BlogDetail.shareArticle}
              </h3>
              <div className="flex gap-3">
                <a 
                  href={twitterShareUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
                >
                  <FaTwitter />
                </a>
                <a 
                  href={facebookShareUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                >
                  <FaFacebook />
                </a>
                <a 
                  href={linkedinShareUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0077B5] text-white hover:opacity-90 transition-opacity"
                >
                  <FaLinkedin />
                </a>
                {post.codeRepository && (
                  <a 
                    href={post.codeRepository} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#24292e] text-white hover:opacity-90 transition-opacity"
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Mobile table of contents toggle */}
          <div className="lg:hidden mb-6">
            <details className="border rounded-lg p-4" style={{ borderColor: 'var(--border-color)' }}>
              <summary className="font-medium cursor-pointer">
                {t.blog.BlogDetail.tableOfContents}
              </summary>
              <div className="mt-3 pl-4">
                <TableOfContents 
                  items={post.tableOfContents}
                  currentId={currentHeading} 
                  isMobile
                />
              </div>
            </details>
          </div>
          
          {/* Category and stats - Mobile */}
          <div className="lg:hidden flex flex-wrap gap-3 mb-6">
            <Link 
              href={`/blogs?category=${encodeURIComponent(post.category)}`}
              className="px-3 py-1 text-sm font-medium rounded-full bg-[var(--navy)] text-white"
            >
              {t.blog.categories[post.category as keyof typeof t.blog.categories] || post.category}
            </Link>
            <div className="px-3 py-1 text-sm rounded-full bg-transparent border text-[var(--muted)]" style={{ borderColor: 'var(--border-color)' }}>
              {post.difficulty}
            </div>
          </div>
          
          {/* Content */}
          {Array.isArray(content) ? (
            <article className="prose prose-lg max-w-none dark:prose-invert" style={{ color: 'var(--text-color)' }}>
              {content.map((block, index) => {
                switch (block.type) {
                  case 'header': 
                    return createElement(
                      `h${block.data.level}`, 
                      { key: index, className: "mt-8 mb-4 font-bold" }, 
                      block.data.text
                    );

                  case 'paragraph':
                    return <p key={index} className="mb-4">{block.data.text}</p>;

                  case 'code':
                    return (
                      <pre key={index} className="bg-black text-white p-4 rounded">
                        <code>{block.data.code}</code>
                      </pre>
                    );

                  case 'image':
                    return (
                      <figure key={index} className="my-6">
                        <img 
                          src={block.data.src} 
                          alt={block.data.alt || ''} 
                          className="rounded-lg w-full"
                        />
                        {block.data.caption && (
                          <figcaption className="text-center text-sm text-[var(--muted)] mt-2">
                            {block.data.caption}
                          </figcaption>
                        )}
                      </figure>
                    );

                  default:
                    console.log(`Unsupported block type: ${block.type}`, block);
                    return null;
                }
              })}
            </article>
          ) : (
            // fallback for legacy HTML content
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              style={{ color: 'var(--text-color)' }}
              dangerouslySetInnerHTML={{ __html: content as string }}
            />
          )}
          
          {/* Like button */}
          <div className="mt-10 flex items-center gap-2">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full
                transition-all duration-300
                ${liked 
                  ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' 
                  : 'hover:bg-pink-50 dark:hover:bg-pink-900/10'}
              `}
            >
              <FaHeart className={liked ? 'text-pink-600 dark:text-pink-400' : 'text-[var(--muted)]'} />
              <span>{liked ? t.blog.BlogDetail.liked : t.blog.BlogDetail.like}</span>
              <span className="text-sm font-medium ml-1">({post.likes + (liked ? 0 : 0)})</span>
            </button>
            
            {/* Show update date if available */}
            {post.updatedAt && (
              <span className="text-sm text-[var(--muted)]">
                {t.blog.BlogDetail.updatedOn} {new Date(post.updatedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
          
          {/* Mobile Author Card */}
          <div className="mt-10 lg:hidden">
            <AuthorCard author={post.author} />
          </div>
          
          {/* Mobile Social Share */}
          <div className="mt-8 lg:hidden">
            <h3 className="text-lg font-semibold mb-3">
              {t.blog.BlogDetail.shareArticle}
            </h3>
            <div className="flex gap-3">
              <a 
                href={twitterShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1DA1F2] text-white hover:opacity-90"
              >
                <FaTwitter />
              </a>
              <a 
                href={facebookShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1877F2] text-white hover:opacity-90"
              >
                <FaFacebook />
              </a>
              <a 
                href={linkedinShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0077B5] text-white hover:opacity-90"
              >
                <FaLinkedin />
              </a>
              {post.codeRepository && (
                <a 
                  href={post.codeRepository} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#24292e] text-white hover:opacity-90"
                >
                  <FaGithub />
                </a>
              )}
            </div>
          </div>
          
          {/* Mobile Tags */}
          <div className="mt-8 lg:hidden">
            <h3 className="text-lg font-semibold mb-3">
              {t.blog.BlogDetail.tags}
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  href={`/blogs?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-sm rounded-full bg-[var(--navy-subtle)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors duration-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Related Articles */}
          {post.relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">
                {t.blog.BlogDetail.relatedArticles}
              </h2>
              <RelatedPosts posts={post.relatedPosts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}