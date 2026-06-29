import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DynamicGallery } from '@/components/DynamicGallery';

export const metadata: Metadata = {
  title: 'Gallery - Vidhyalakshmi Senior Secondary School',
  description: 'View our school gallery featuring events, activities, and student moments.',
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">School Gallery</h1>
            <p className="text-lg text-gray-600">
              Moments from our school life and activities
            </p>
          </div>
        </section>

        {/* Dynamic Gallery */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <DynamicGallery />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
