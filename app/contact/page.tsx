import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact Us - Vidhyalakshmi Senior Secondary School',
  description: 'Contact Vidhyalakshmi Senior Secondary School in Keelpudur, Vellore for admissions and general enquiries.',
  keywords: ['Vidhyalakshmi contact', 'Vidhyalakshmi CBSE School', 'Keelpudur school admission', 'Vellore CBSE school'],
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Reach our campus for admissions, enquiries, and school information.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-8">Our Campus</h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                      {SCHOOL_INFO.phoneNumbers.map((phone) => (
                        <p key={phone} className="text-gray-600">{phone}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      {SCHOOL_INFO.contactPageEmails.map((email) => (
                        <p key={email} className="text-gray-600">{email}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">{SCHOOL_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Office Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 7:00 AM - 4:00 PM<br />
                        Saturday: 7:00 AM - 1:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="96265 96111"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Message
                    </label>
                    <textarea
                      placeholder="Your message here..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center">Our Location</h2>
            <div className="mt-8 rounded-lg overflow-hidden bg-gray-200 p-8 text-center">
              <p className="text-gray-700 font-semibold">{SCHOOL_INFO.name}</p>
              <p className="text-gray-600 mt-2">{SCHOOL_INFO.address}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
