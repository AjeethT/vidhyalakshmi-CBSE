import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Careers - Vidhyalakshmi Senior Secondary School',
  description: 'Career opportunities at Vidhyalakshmi School.',
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">Careers</h1>
            <p className="text-lg text-gray-600">
              Join our team of dedicated educators and professionals
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center mb-12">Open Positions</h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                { role: 'English Teacher', dept: 'Academic', exp: '2+ years' },
                { role: 'Mathematics Teacher', dept: 'Academic', exp: '2+ years' },
                { role: 'Science Teacher', dept: 'Academic', exp: '2+ years' },
                { role: 'Computer Lab Instructor', dept: 'IT', exp: '1+ year' },
              ].map((job, i) => (
                <div key={i} className="card p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{job.role}</h3>
                    <span className="bg-sky-100 text-sky-600 px-3 py-1 rounded text-sm">
                      {job.dept}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">Experience Required: {job.exp}</p>
                  <button className="text-sky-600 font-semibold hover:text-sky-700">
                    Apply Now →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center">Why Join Vidhyalakshmi?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                { title: 'Growth', desc: 'Career development and professional growth' },
                { title: 'Culture', desc: 'Collaborative and supportive work environment' },
                { title: 'Benefits', desc: 'Competitive salary and benefits package' },
              ].map((benefit) => (
                <div key={benefit.title} className="card p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
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
