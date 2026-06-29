import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - Vidhyalakshmi Senior Secondary School',
  description: 'Privacy policy and data protection information.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">Privacy Policy</h1>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl prose prose-invert">
            <div className="space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">1. Introduction</h2>
                <p>
                  This Privacy Policy outlines how Vidhyalakshmi Senior Secondary School collects,
                  uses, and protects your personal information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">2. Information We Collect</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Contact information (name, email, phone)</li>
                  <li>Academic records and enrollment details</li>
                  <li>Student photographs and performance data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">3. How We Use Information</h2>
                <p>
                  The information collected is used for administrative purposes, academic record-keeping,
                  communication with parents/guardians, and school operations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">4. Data Protection</h2>
                <p>
                  We implement appropriate security measures to protect your personal information
                  from unauthorized access or disclosure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">5. Contact Us</h2>
                <p>
                  For privacy-related queries, please contact: privacy@vidhyalakshmi.edu.in
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
