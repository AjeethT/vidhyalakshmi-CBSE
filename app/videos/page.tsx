import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Videos - Vidhyalakshmi Senior Secondary School',
  description: 'Video gallery featuring school events and programs.',
};

export default function VideosPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">Video Gallery</h1>
            <p className="text-lg text-gray-600">
              Watch highlights from school events and programs
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="card overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl mb-2">▶️</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition">
                        Video Title {i + 1}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">Video description goes here</p>
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
