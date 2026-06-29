import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Admission - Vidhyalakshmi Senior Secondary School',
  description: 'Apply for admission to Vidhyalakshmi Senior Secondary School. Learn about admission criteria and process.',
};

export default function AdmissionPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-12 bg-gradient-to-r from-sky-600 to-sky-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission to Vidhyalakshmi</h1>
            <p className="text-xl opacity-90">
              Join our community of learners and achievers
            </p>
          </div>
        </section>

        {/* Admission Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center">Admission Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {[
                { step: '1', title: 'Application', desc: 'Fill out the admission form' },
                { step: '2', title: 'Entrance Test', desc: 'Appear for the entrance examination' },
                { step: '3', title: 'Interview', desc: 'Participate in the personal interview' },
                { step: '4', title: 'Enrollment', desc: 'Complete registration and join' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-sky-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility & Classes */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Eligibility Criteria</h2>
                <ul className="space-y-3">
                  {[
                    'Indian national or valid visa holder',
                    'Age as per CBSE norms',
                    'Medical fitness certificate',
                    'Previous academic records',
                    'Character certificate from previous school',
                  ].map((criterion, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-sky-600 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Classes Offered</h2>
                <div className="space-y-3">
                  {['Nursery', 'KG', 'Classes I - V', 'Classes VI - VIII', 'Classes IX - XII'].map((cls, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200">
                      <div className="w-8 h-8 bg-sky-100 text-sky-600 rounded flex items-center justify-center font-semibold text-sm">
                        📚
                      </div>
                      <span className="font-semibold text-gray-900">{cls}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center">Apply Now</h2>
            <div className="max-w-2xl mx-auto card p-8 mt-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Parent/Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Desired Class *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                    <option>Select Class</option>
                    <option>Nursery</option>
                    <option>KG</option>
                    <option>I</option>
                    <option>II</option>
                    <option>III</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
