import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Facilities - Vidhyalakshmi Senior Secondary School',
  description: 'Explore our world-class facilities and infrastructure.',
};

export default function FacilitiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">Our Facilities</h1>
            <p className="text-lg text-gray-600">
              State-of-the-art infrastructure supporting holistic development
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Science Laboratory', icon: '🧪' },
                { name: 'Computer Lab', icon: '💻' },
                { name: 'Library', icon: '📚' },
                { name: 'Sports Facilities', icon: '⚽' },
                { name: 'Auditorium', icon: '🎭' },
                { name: 'Cafeteria', icon: '🍽️' },
                { name: 'Medical Room', icon: '⚕️' },
                { name: 'Transport', icon: '🚌' },
              ].map((facility) => (
                <div key={facility.name} className="card p-6 text-center hover:shadow-lg transition">
                  <div className="text-5xl mb-4">{facility.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900">{facility.name}</h3>
                  <p className="text-gray-600 text-sm mt-2">Modern and well-equipped facility</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center">Transport & Accommodation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-2xl mx-auto">
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Transport Services</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Extensive route coverage</li>
                  <li>✓ GPS tracking enabled vehicles</li>
                  <li>✓ Trained and courteous staff</li>
                  <li>✓ Regular maintenance</li>
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Safety & Security</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ 24/7 CCTV surveillance</li>
                  <li>✓ Trained security personnel</li>
                  <li>✓ Visitor management system</li>
                  <li>✓ Emergency response protocols</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
