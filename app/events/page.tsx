import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Events - Vidhyalakshmi Senior Secondary School',
  description: 'Upcoming and past events at Vidhyalakshmi School.',
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">School Events</h1>
            <p className="text-lg text-gray-600">
              Celebrations and programs throughout the academic year
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-12">Upcoming Events</h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                { date: 'June 1, 2024', title: 'Annual Sports Day', desc: 'Celebrate athletics and sports' },
                { date: 'August 15, 2024', title: 'Independence Day Celebration', desc: 'National flag hoisting ceremony' },
                { date: 'September 5, 2024', title: 'Teachers Day', desc: 'Honoring our educators' },
                { date: 'October 2, 2024', title: 'Gandhi Jayanti', desc: 'Cultural program and awareness' },
              ].map((event, i) => (
                <div key={i} className="card p-6 border-l-4 border-primary-600">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded text-sm font-semibold">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-gray-600">{event.desc}</p>
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
