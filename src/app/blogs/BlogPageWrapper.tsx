'use client';

import { SearchBar } from './../components/SearchBar';
import BlogList from '../components/blogs/BlogList';
import { useLanguage } from '../components/LanguageContext';

export default function BlogPageWrapper({ initialPosts }: { initialPosts: any[] }) {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col min-h-screen px-4 md:px-8 py-12">
      <section className="max-w-5xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[var(--navy)] to-[var(--color-primary)] text-transparent bg-clip-text">
          {t.blog.title}
        </h1>

        <div className="mb-10">
          <p className="text-lg text-[var(--muted)] max-w-3xl">
            {t.blog.description}
          </p>
          <SearchBar />
        </div>

        <BlogList initialPosts={initialPosts} />
      </section>
    </main>
  );
}
