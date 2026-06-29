'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { NAVIGATION, SCHOOL_INFO } from '@/lib/config';
import { getR2ImageUrl, getR2UrlWithDevProxy } from '@/lib/cloudflare';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                <img
                  src={getR2UrlWithDevProxy('Site Photos/School logo.png')}
                  alt={`${SCHOOL_INFO.name} logo`}
                  className="h-8 w-8 rounded-lg object-contain bg-white"
                />
              </div>
              <span className="hidden sm:inline font-bold text-gray-900">Vidhyalakshmi</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAVIGATION.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-sky-600 transition font-medium"
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={`${subitem.label}-${subitem.href}`}
                        href={subitem.href}
                        className="block px-4 py-2 text-gray-700 hover:text-sky-600 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link href="/admission/" className="hidden md:inline-block btn-primary">
            Admission
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            {NAVIGATION.map((item) => (
              <div key={item.href}>
                {item.submenu ? (
                  <button
                    onClick={() => setOpenSubmenu(openSubmenu === item.href ? null : item.href)}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:text-sky-600 font-medium flex justify-between items-center"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition ${openSubmenu === item.href ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:text-sky-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}

                {item.submenu && openSubmenu === item.href && (
                  <div className="pl-4">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={`${subitem.label}-${subitem.href}`}
                        href={subitem.href}
                        className="block px-4 py-2 text-gray-600 hover:text-sky-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/admission/"
              className="block px-4 py-2 mt-4 btn-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admission
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
