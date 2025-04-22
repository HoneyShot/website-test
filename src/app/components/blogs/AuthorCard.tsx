// src/app/blogs/[slug]/components/AuthorCard.tsx
'use client';

import Image from 'next/image';
import { useLanguage } from '@/app/components/LanguageContext';

interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

export default function AuthorCard({ author }: { author: Author }) {
  const { t } = useLanguage();
  
  return (
    <div className="border rounded-lg p-6 flex flex-col items-center text-center" style={{ borderColor: 'var(--border-color)' }}>
      <div className="relative w-20 h-20 mb-4 overflow-hidden rounded-full">
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      
      <h3 className="text-lg font-semibold">{author.name}</h3>
      <p className="text-sm text-[var(--muted)] mt-2">{author.bio}</p>
      
      <a
        href={`/authors/${author.id}`}
        className="mt-4 text-sm font-medium text-[var(--navy)] hover:underline"
      >
        {t.blog.BlogDetail.viewAllArticles}
      </a>
    </div>
  );
}