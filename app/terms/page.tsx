import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Vidhyalakshmi Senior Secondary School',
  description: 'Terms and conditions for using our website.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">Terms & Conditions</h1>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms
                  and provision of this agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information
                  or software) on Vidhyalakshmi School website for personal, non-commercial transitory viewing only.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">3. Disclaimer</h2>
                <p>
                  The materials on our website are provided on an &quot;as is&quot; basis. Vidhyalakshmi School
                  makes no warranties, expressed or implied, and hereby disclaims and negates any other
                  warranties including, without limitation, implied warranties or conditions of merchantability.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">4. Limitations</h2>
                <p>
                  In no event shall Vidhyalakshmi School or its suppliers be liable for any damages
                  (including, without limitation, damages for loss of data or profit).
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">5. Accuracy of Materials</h2>
                <p>
                  The materials appearing on our website could include technical, typographical, or
                  photographic errors. We do not warrant that any of the materials on our website are accurate,
                  complete, or current.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">6. Modifications</h2>
                <p>
                  We may revise these terms of service for our website at any time without notice.
                  By using this website, you are agreeing to be bound by the then current version of these
                  terms of service.
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
