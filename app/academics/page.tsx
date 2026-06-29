import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Academics - Vidhyalakshmi Senior Secondary School',
  description: 'Learn about our academic programs, curriculum, and educational approach.',
};

export default function AcademicsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">Academic Excellence</h1>
            <p className="text-lg text-gray-600">
              Comprehensive CBSE curriculum combined with modern teaching methods
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Scholastic Activities', 'Co-Scholastic Activities', 'Language Program', 'STEM Focus', 'Arts & Culture', 'Sports Program'].map((prog) => (
                <div key={prog} className="card p-6">
                  <h3 className="text-xl font-bold mb-3 text-sky-600">{prog}</h3>
                  <p className="text-gray-600">Comprehensive program designed to develop student skills and interests in {prog.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center">Our Teaching Methodology</h2>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {['Concept-based learning', 'Activity-oriented teaching', 'Digital classroom resources', 'Continuous assessment', 'Student-centric approach'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-sm">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
