'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SCHOOL_INFO } from '@/lib/config';
import { getR2ImageUrl, getR2UrlWithDevProxy } from '@/lib/cloudflare';

export default function ManagementPage() {
  const { management } = SCHOOL_INFO;
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  const managers = [
    {role:'founder', data:management.founder},
    { role: 'correspondent', data: management.correspondent },
    { role: 'managingDirector', data: management.managingDirector },
    { role: 'principal', data: management.principal },
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">Management Messages</h1>
            <p className="text-lg text-gray-600">
              Words of wisdom from our school leadership
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {managers.map(({ role, data }) => (
                <div key={role} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  {/* Image */}
                  <div className="flex justify-center md:justify-start">
                    <div className="w-64 h-80 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                      {!imageErrors[role] ? (
                        <img
                          src={getR2UrlWithDevProxy(`Site Photos/${data.image}`)}
                          alt={data.name}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(role)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400">Photo</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold text-primary-600 mb-2">{data.name}</h2>
                    <p className="text-lg font-semibold text-gray-700 mb-4">{data.title}</p>
                    {data.qualification && (
                      <p className="text-gray-600 mb-6 text-sm">{data.qualification}</p>
                    )}
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      {data.message.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
