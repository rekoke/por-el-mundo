'use client';

import type { WordPressPost } from '@/services/wordpress';
import Link from 'next/link';
import { useState } from 'react';

export type WordPressPostsResponse = {
  found: number;
  meta: {
    links: {
      counts: string;
    };
    wpcom: boolean;
  };
  posts: WordPressPost[];
};

type NavDropdownProps = {
  label: string;
  href: string;
  items: WordPressPostsResponse;
};

export const NavDropdown = ({ label, href, items }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={href}
        className="border-none text-gray-700 hover:text-gray-900 flex items-center"
      >
        {label}
      </Link>

      {isOpen && items.posts && items.posts.length > 0 && (
        <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {items.posts.map(item => (
              <Link
                key={item.ID}
                href={`${href}/${item.slug}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
