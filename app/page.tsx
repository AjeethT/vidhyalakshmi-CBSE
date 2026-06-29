'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SCHOOL_INFO } from '@/lib/config';
import { getR2ImageUrl, getR2UrlWithDevProxy } from '@/lib/cloudflare';

export default function Home() {
  const [heroImageError, setHeroImageError] = useState(false);
  const [memberImages, setMemberImages] = useState<{ [key: string]: boolean }>({});

  const handleHeroImageError = () => {
    setHeroImageError(true);
  };

  const handleMemberImageError = (name: string) => {
    setMemberImages(prev => ({ ...prev, [name]: true }));
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative h-[500px] bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
          {!heroImageError && (
            <img
              src={getR2UrlWithDevProxy('Site Photos/school.jpeg.JPG')}
              alt="Vidhyalakshmi School campus"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              onError={handleHeroImageError}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-black-900/80"></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {SCHOOL_INFO.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Welcome to {SCHOOL_INFO.name.toUpperCase()}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="/admission/" className="btn-primary">
                  Apply Now
                </a>
                <a href="/about/" className="btn-outline text-white border-white hover:bg-white hover:text-primary-600">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Established', value: String(SCHOOL_INFO.established) },
                { label: 'Students', value: '1500+' },
                { label: 'Teachers', value: '104' },
                { label: 'School Code', value: SCHOOL_INFO.schoolCode },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="section-title text-center">Welcome to Vidhyalakshmi Senior Secondary School</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {SCHOOL_INFO.homepageIntro}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-12">Why Choose Vidhyalakshmi?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Academic Excellence',
                  description: 'CBSE-affiliated senior secondary education with qualified faculty and consistent board results.',
                  icon: 'A',
                },
                {
                  title: 'Holistic Development',
                  description: 'A conducive environment for values, technology, quality learning, sports, and character building.',
                  icon: 'H',
                },
                {
                  title: 'Modern Infrastructure',
                  description: 'Spacious campus with classrooms, laboratories, internet facility, and student amenities.',
                  icon: 'I',
                },
              ].map((feature) => (
                <div key={feature.title} className="card p-8 text-center hover:shadow-lg transition">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-2xl font-bold">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-12">Our Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: SCHOOL_INFO.management.correspondent.name,
                  title: SCHOOL_INFO.management.correspondent.title,
                  image: SCHOOL_INFO.management.correspondent.image,
                },
                {
                  name: SCHOOL_INFO.management.managingDirector.name,
                  title: SCHOOL_INFO.management.managingDirector.title,
                  image: SCHOOL_INFO.management.managingDirector.image,
                },
                {
                  name: SCHOOL_INFO.management.principal.name,
                  title: SCHOOL_INFO.management.principal.title,
                  image: SCHOOL_INFO.management.principal.image,
                },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4 shadow-md">
                    {!memberImages[member.name] ? (
                      <img
                        src={getR2UrlWithDevProxy(`Site Photos/${member.image}`)}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={() => handleMemberImageError(member.name)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">Photo</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary-600">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 opacity-90">
              Discover how Vidhyalakshmi can help your child reach their potential
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/admission/" className="btn-primary">
                Start Application
              </a>
              <a href="/contact/" className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
