'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { SCHOOL_INFO, NAVIGATION } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pt-4">
          <div>
            <h3 className="text-xl font-bold mb-4">{SCHOOL_INFO.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Managed by {SCHOOL_INFO.trust}, providing CBSE-affiliated senior secondary education since {SCHOOL_INFO.established}.
            </p>
            <p className="text-gray-400 text-sm mt-4">{SCHOOL_INFO.displayWebsite}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {NAVIGATION.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Important</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/mandatory-disclosure/" className="hover:text-white transition">
                  Mandatory Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/careers/" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <span>{SCHOOL_INFO.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <span>
                  {SCHOOL_INFO.email}
                  <br />
                  {SCHOOL_INFO.admissionEmail}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>{SCHOOL_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
            <p>&copy; {currentYear} {SCHOOL_INFO.name}. All rights reserved.</p>
            <p>
              Design developed and maintained by{' '}
              <a href="https://firrham.com" className="hover:text-white transition" target="_blank" rel="noreferrer">
                Firrham Technologies Pvt Ltd
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
