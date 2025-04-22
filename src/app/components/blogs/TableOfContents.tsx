// src/app/blogs/[slug]/components/TableOfContents.tsx
'use client';

import { useLanguage } from '@/app/components/LanguageContext';

interface TOCItem {
  title: string;
  anchor: string;
}

export default function TableOfContents({ 
  items, 
  currentId,
  isMobile = false
}: { 
  items: TOCItem[];
  currentId: string;
  isMobile?: boolean;
}) {
  const { t } = useLanguage();
  
  return (
    <div className={`${!isMobile && 'border rounded-lg p-4'}`} style={!isMobile ? { borderColor: 'var(--border-color)' } : {}}>
      {!isMobile && <h3 className="text-lg font-semibold mb-3">{t.blog.BlogDetail.tableOfContents}</h3>}
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.anchor}>
              <a
                href={item.anchor}
                className={`
                  block text-sm py-1 px-2 rounded transition-colors duration-200
                  ${currentId === item.anchor.substring(1) 
                    ? 'bg-[var(--navy)] text-white' 
                    : 'hover:bg-[var(--navy-subtle)] text-[var(--text-color)]'}
                `}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}