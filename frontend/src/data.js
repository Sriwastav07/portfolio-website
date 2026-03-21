// ── Portfolio Data ─────────────────────────────────────────────────────────────
// Edit this file to update all content across the site.

export const profile = {
  name: 'Anisha Kumari',
  title: 'Full Stack Developer',
  subtitle: 'AI & Data Enthusiast',
  bio: 'I build thoughtful digital products at the intersection of full-stack engineering and artificial intelligence. Passionate about turning complex problems into elegant, user-centered solutions.',
  email: 'anishasriwatav07@gmail.com',
  github: 'https://github.com/sriwastav07',
  linkedin: 'https://linkedin.com/in/anisha172',
  cvFile: '/Anisha_Kumari_CV.pdf',
};

export const skills = [
  { category: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { category: 'Database', items: ['MongoDB', 'Mongoose', 'MySql','PostgreSQL'] },
  { category: 'AI & Data', items: ['Python', 'Machine Learning', 'Power BI', 'Pandas','Numpy'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Figma', 'VS Code', 'Postman', 'Jira'] },
];

export const projects = [
  {
    id: 1,
    title: 'GST Invoice Generator',
    description:
      'A full-stack application to generate GST-compliant invoices with automatic tax calculation, PDF export, and client management — built for small business owners.',
    tech: ['Node.js', 'Express.js', 'React', 'MongoDB'],
    github: 'https://github.com/Sriwastav07/gst-Invoice-Genrator',
    live: null,
    featured: true,
  },
  {
    id: 2,
    title: 'AI Image Generator',
    description:
      'A browser-based AI image generation tool powered by the Pollinations API. Enter any text prompt and generate stunning visuals instantly — no sign-up required.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'Pollinations API'],
    github: 'https://github.com/Sriwastav07/imgGeneretor',
    live: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Pattern Clustering',
    description:
      'A machine learning project that clusters historical weather data to identify regional climate patterns. Includes an interactive Power BI dashboard for visual exploration.',
    tech: ['Python', 'Power BI', 'Machine Learning', 'Pandas'],
    github: 'https://github.com/Sriwastav07/Weather-report-clustering',
    live: null,
    featured: true,
  },
];

export const certificates = [
  {
    title: 'Generative AI ',
    issuer: 'Infosys',
    year: '2025',
    description: 'Learned foundational knowledge of large language models, prompt engineering, and AI-powered content generation.',
  },
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    year: '2025',
    description: 'Studied cloud computing concepts including virtualization, distributed systems, cloud service models, and scalable infrastructure.',
  },
  {
    title: 'Cyber Security v/s Ethical Hacking',
    issuer: 'LPU',
    year: '2023',
    description: 'Studied cybersecurity fundamentals, cyber threats, and ethical hacking concepts through a certification program conducted by Lovely Professional University.',
  },
];
