import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SCHOOL_INFO } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About Us - Vidhyalakshmi Senior Secondary School',
  description: 'Learn about Vidhyalakshmi Senior Secondary School, a CBSE senior secondary school managed by Paakeezaa Educational Trust in Vellore.',
  keywords: ['Vidhyalakshmi Senior Secondary School', 'Paakeezaa Educational Trust', 'CBSE school Vellore', 'Keelpudur school'],
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">About Vidhyalakshmi</h1>
            <p className="text-lg text-gray-600">
              A CBSE senior secondary school committed to values, technology, quality, and excellence in education
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary-600">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To provide quality education that empowers students with knowledge, skills, and values
                  necessary for their personal and professional growth, enabling them to become responsible
                  citizens and leaders of tomorrow.
                </p>
              </div>
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-4 text-primary-600">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To be a premier institution recognized for academic excellence, character development,
                  and innovation, fostering an environment where every student can discover their potential
                  and contribute meaningfully to society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CBSE Affiliation */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center">CBSE Affiliation & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                { title: 'CBSE Affiliated', description: 'Central Board of Secondary Education affiliation' },
                { title: 'Recognized School', description: 'Recognized by the State Education Department' },
                { title: 'NOC Approved', description: 'No Objection Certificate from authorities' },
              ].map((item) => (
                <div key={item.title} className="card p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title">Our Journey</h2>
            <div className="max-w-3xl">
              <p className="text-gray-600 mb-4 leading-relaxed">
                {SCHOOL_INFO.homepageIntro}
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The school operates from {SCHOOL_INFO.addressWithPin} and continues to nurture students through
                academic rigor, character development, co-scholastic exposure, and modern infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Explore More About Our School</h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/management/" className="btn-primary">
                Management Messages
              </a>
              <a href="/facilities/" className="btn-outline">
                Our Facilities
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
