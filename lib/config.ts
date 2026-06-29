// R2 Configuration
export const R2_CONFIG = {
  PUBLIC_BASE_URL: 'https://cdn.vidhyalakshmi.cus.firrham.com',
  ROOT_FOLDER: 'CBSE',
  FOLDER_STRUCTURE: {
    site: 'site/',
    documents: 'documents/',
    mandatory_disclosure: 'documents/mandatory-disclosure/',
    gallery: 'gallery/',
    gallery_2026: 'gallery/2026/',
    gallery_2025: 'gallery/2025/',
  },
};

// School Information - Real Data
export const SCHOOL_INFO = {
  name: 'Vidhyalakshmi Senior Secondary School',
  fullName: 'Vidhyalakshmi Group of Educational Institutions',
  email: 'info@vidhyalakshmi.edu.in',
  admissionEmail: 'admission@vidhyalakshmi.edu.in',
  contactPageEmails: ['info@vidhyalakshmi.edu.in', 'admission@vidhyalakshmi.edu.in'],
  phone: '96265 96111, 95855 36111, 9443320156',
  phoneNumbers: ['96265 96111', '95855 36111', '9443320156'],
  landline: '04171-299217',
  website: 'https://www.vidhyalakshmi.edu.in',
  displayWebsite: 'www.vidhyalakshmi.edu.in',
  address: 'Katpadi-Gudiyattam Road, Keelpudur Village, Chennangkuppam Post, K V Kuppam Taluk, Vellore District',
  addressWithPin: 'Katpadi - Gudiyatham Road, Keelpudur Village, Chennangkuppam Post, K.V. Kuppam, Vellore - 632 209.',
  established: 2012,
  affiliation: 'CBSE Affiliated Senior Secondary School',
  affiliationNo: '1930446',
  schoolCode: '55352',
  trust: 'Paakeezaa Educational Trust',
  principalEmail: 'vidhyalakshmi.principal@gmail.com',
  homepageIntro:
    'Vidhyalakshmi School, managed by the Paakeezaa Educational Trust, established in 2012, is a Senior Secondary School affiliated with the Central Board of Secondary Education (CBSE), situated at Katpadi-Gudiyatham Road, Chennangkuppam. Our school provides a conducive environment for holistic education. We are committed to fostering a blend of values, technology and a quest for quality and excellence in education.',
  
  // Management Details
  management: {
    correspondent: {
      name: 'Shri. S. AshokKhumar',
      title: 'Correspondent',
      qualification: '',
      message: `Dear Parents, Students and Well-Wishers

As the Correspondent of Vidhyalakshmi Group of Educational Institutions, it is both an honour and a privilege to address you. At Vidhyalakshmi School, we are dedicated to providing a nurturing environment where each child can thrive mentally, emotionally, and physically.

Our commitment extends beyond academic excellence; we strive to equip every student with the skills and knowledge necessary to excel in their chosen fields and face the challenges of the globalized world. We understand the importance of holistic development, and our aim is to foster well-rounded individuals who are prepared to make meaningful contributions to society.

It is our belief that education should be accessible to all, with this in mind, Vidhyalakshmi School operates on a service-oriented ethos with a reasonable fee structure. Our priority lies in the well-being of our students and staff. We ensure a comfortable and supportive infrastructure where no child or employee suffers due to discomfort.

As a management team, we are unwavering in our commitment to the betterment of our pupils, employees, and the institution as a whole. We prioritize support and encouragement, fostering an environment where everyone can thrive and succeed.

To our students, staff, parents, and well-wishers, I extend my heartfelt wishes. May the divine guide us on the path of righteousness, leading us towards success and fulfillment in all our endeavours.`,
      image: 'correspondent sir.jpg',
    },
    managingDirector: {
      name: 'Dr. M. A. Vidhyalakshmi',
      title: 'Managing Director',
      qualification: 'MD(General Medicine)',
      message: `Dear Parents, Students and Well-Wishers

Welcome to Vidhyalakshmi School, where we are committed to providing a nurturing and inclusive environment for all our students. As Managing Director, I am deeply invested in ensuring that every child who walks through our doors receives a high-quality education that prepares them for success in an ever-changing world.

At Vidhyalakshmi, we strive to foster not only academic excellence but also character development, critical thinking and creativity. Our dedicated faculty and staff work tirelessly to create engaging learning experiences that inspire a lifelong love of learning in our students.

As a proud affiliate of the Central Board of Secondary Education, we adhere to the highest educational standards, ensuring that our students receive a well-rounded education that equips them with the skills and knowledge they need to thrive in the 21st century.

Located in the serene surroundings of Keelpudur Village, our school provides a safe and supportive environment where students can explore their interests, develop their talents and build lasting friendships.

I invite you to explore our website to learn more about our programs, facilities, and the vibrant community that makes Vidhyalakshmi School truly special.

Thank you for considering Vidhyalakshmi School for your child's education. We look forward to welcoming you into our family.`,
      image: 'Managing Director.JPG',
    },
    principal: {
      name: 'KAVITHA S',
      title: 'Principal',
      qualification: '',
      message: `Dear Parents, Students, And Well-Wishers

It is with great pleasure and pride that I welcome you to Vidhyalakshmi School, where we are dedicated to nurturing young minds and fostering a love for learning. As the Principal, I am committed to providing a safe, supportive, and enriching environment where every student can thrive academically, socially, and emotionally.

At Vidhyalakshmi, we believe in the power of education to transform lives and shape futures. With a team of passionate educators and staff, we strive to inspire curiosity, creativity, and critical thinking in our students, equipping them with the skills and knowledge they need to succeed in an ever-evolving world.

Our holistic approach to education focuses not only on academic excellence but also on character development, leadership skills, and community engagement. We encourage our students to explore their interests, embrace challenges, and become confident, compassionate individuals who make positive contributions to society.

I invite you to explore our website to learn more about our academic programs, extracurricular activities, and the supportive community that makes Vidhyalakshmi School a truly special place. Whether you are a prospective parent, a current student, or an alumna/alumnus, we are excited to have you join us on this journey of growth and discovery.

Thank you for considering Vidhyalakshmi School for your child's education. Together, let us inspire excellence and unlock the potential within each and every student.`,
      image: 'principal.jpg',
    },
  },
};

type NavigationItem = {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
};

// Navigation Menu
export const NAVIGATION: NavigationItem[] = [
  { label: 'Home', href: '/', submenu: [] },
  {
    label: 'About',
    href: '/about/',
    submenu: [
      { label: 'About School', href: '/about/' },
      { label: 'Management Messages', href: '/management/' },
      { label: 'Facilities', href: '/facilities/' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics/',
    submenu: [
      { label: 'Scholastic', href: '/academics/' },
      { label: 'Co-Scholastic', href: '/academics/' },
    ],
  },
  {
    label: 'Students',
    href: '/gallery/',
    submenu: [
      { label: 'Gallery', href: '/gallery/' },
      { label: 'Videos', href: '/videos/' },
      { label: 'Events', href: '/events/' },
    ],
  },
  { label: 'Admission', href: '/admission/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Contact', href: '/contact/' },
];

export type SiteConfig = typeof SCHOOL_INFO & {
  r2: typeof R2_CONFIG;
  navigation: typeof NAVIGATION;
};
