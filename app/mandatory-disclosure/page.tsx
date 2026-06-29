import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SCHOOL_INFO } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Mandatory Disclosure - Vidhyalakshmi Senior Secondary School',
  description: 'CBSE mandatory disclosure, school information, academic results, staff details, and infrastructure details for Vidhyalakshmi School.',
  keywords: ['Vidhyalakshmi mandatory disclosure', 'CBSE disclosure', 'Vidhyalakshmi School affiliation', 'school code 55352'],
};

const generalInformation = [
  ['Name of School', 'VIDHYALAKSHMI SCHOOL'],
  ['Affiliation No. (if applicable)', SCHOOL_INFO.affiliationNo],
  ['School Code (if applicable)', SCHOOL_INFO.schoolCode],
  ['Complete Address with Pin Code', SCHOOL_INFO.addressWithPin],
  ['Principal Name & Qualification', 'KAVITHA S, M.A., M.COM., B.ED.'],
  ['School Email ID', SCHOOL_INFO.principalEmail],
  ['Contact Details (Landline/Mobile)', `${SCHOOL_INFO.landline} / 9626596111`],
];

const documentInformation = [
  'Copies of affiliation/upgradation letter and recent extension of affiliation if any',
  'Copies of societies/trust/company registration/renewal certificate as applicable',
  'Copy of No Objection Certificate (NOC) issued, if applicable by the State Govt/UT',
  "Copies of recognition certificate under RTE Act 2009 and it's renewal if applicable",
  'Copy of valid building safety certificate as per the National Building Code',
  'Copy of valid fire safety certificate issued by the competent authority',
  'Copy of the DEO certificate submitted by the school for affiliation/upgradation/extension of affiliation or self certification by school',
  'Copies of valid water, health and sanitation certificates',
];

const academicDocuments = [
  'Fee structure of the school',
  'Annual academic calendar',
  'List of School Management Committee (SMC)',
  'List of Parents Teachers Association (PTA) members',
  'Last three-year result of the board examination as per applicability',
];

const classXResults = [
  ['2024', '143', '143', '100%', '-'],
  ['2023', '129', '129', '100%', '-'],
  ['2022', '136', '136', '100%', '-'],
];

const classXIIResults = [
  ['2024', '98', '98', '100%', '-'],
  ['2023', '119', '119', '100%', '-'],
  ['2022', '86', '82', '95.83%', '-'],
];

const staffDetails = [
  ['Principal', '1'],
  ['Total No. of Teachers', '104'],
  ['PGT', '14'],
  ['TGT', '35'],
  ['PRT', '30'],
  ['Teachers Section Ratio', '1.5 : 1'],
  ['Details of Special Educator', '01'],
  ['Details of Counsellor and Wellness Teacher', '01'],
];

const infrastructureDetails = [
  ['Total campus area of the school (in square mtr)', '11048'],
  ['No. and size of the class rooms (in sq mtr)', '76 with size 45.46'],
  ['No. and size of laboratories including computer labs (in sq mtr)', '5 with size 114.3'],
  ['Internet facility (Y/N)', 'YES'],
  ['No. of girls toilets', '40'],
  ['No. of boys toilets', '21'],
  ['Link of YouTube video of the inspection of school covering the infrastructure of the school', 'Click Here'],
];

function InfoTable({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-sky-600 text-white">
            <th className="border border-sky-700 px-4 py-3 w-20">SL.No.</th>
            <th className="border border-sky-700 px-4 py-3">Information</th>
            <th className="border border-sky-700 px-4 py-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, value], index) => (
            <tr key={label} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">{index + 1}</td>
              <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800">{label}</td>
              <td className="border border-gray-200 px-4 py-3 text-gray-700">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocumentTable({ rows }: { rows: string[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-sky-600 text-white">
            <th className="border border-sky-700 px-4 py-3 w-20">SL.No.</th>
            <th className="border border-sky-700 px-4 py-3">Documents/Information</th>
            <th className="border border-sky-700 px-4 py-3">Upload Documents</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((label, index) => (
            <tr key={label} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">{index + 1}</td>
              <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800">{label}</td>
              <td className="border border-gray-200 px-4 py-3 text-sky-700 font-semibold">Click Here</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResultTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-700 px-4 py-3">SL.No.</th>
              <th className="border border-gray-700 px-4 py-3">Year</th>
              <th className="border border-gray-700 px-4 py-3">Registered Students</th>
              <th className="border border-gray-700 px-4 py-3">Students Passed</th>
              <th className="border border-gray-700 px-4 py-3">Pass Percentage</th>
              <th className="border border-gray-700 px-4 py-3">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${row[0]}`} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-200 px-4 py-3">{index + 1}</td>
                {row.map((value, cellIndex) => (
                  <td key={`${value}-${cellIndex}`} className="border border-gray-200 px-4 py-3 text-gray-700">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card p-6">
      <h2 className="text-2xl font-bold mb-6 text-sky-600">{title}</h2>
      {children}
    </section>
  );
}

export default function MandatoryDisclosurePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="section-title">Mandatory Disclosure</h1>
            <p className="text-lg text-gray-600">
              CBSE disclosure information for Vidhyalakshmi School
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="space-y-8">
              <SectionCard title="(A) General Information">
                <InfoTable rows={generalInformation} />
              </SectionCard>

              <SectionCard title="(B) Document and Information">
                <DocumentTable rows={documentInformation} />
              </SectionCard>

              <SectionCard title="(C) Result and Academics">
                <DocumentTable rows={academicDocuments} />
                <div className="mt-8 space-y-8">
                  <ResultTable title="Result Class: X" rows={classXResults} />
                  <ResultTable title="Result Class: XII" rows={classXIIResults} />
                </div>
              </SectionCard>

              <SectionCard title="(D) Staff (Teaching)">
                <InfoTable rows={staffDetails} />
              </SectionCard>

              <SectionCard title="(E) School Infrastructure">
                <InfoTable rows={infrastructureDetails} />
              </SectionCard>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
