// All portfolio content lives here. Edit this file to update the site.

export const person = {
  name: 'Praveen R S',
  role: 'Java, Python developer, AI & ML student, software developer',
  summary:
    'AI & ML student with hands-on experience in cloud technologies, security practices, Linux administration and web development. I work with Java and Python, and I like building things that run end to end: desktop apps, ML systems and web tools.',
  education: {
    degree: "Bachelor's Degree in Artificial Intelligence and Machine Learning",
    school: 'AMET University, Chennai',
    year: 'Expected 2027',
  },
}

export const links = {
  email: 'praveen7200429516@gmail.com',
  github: 'https://github.com/Praveen-ASML24026',
  linkedin: 'https://www.linkedin.com/in/praveen0825/',
  hackerrank: 'https://www.hackerrank.com/profile/praveenr25',
  leetcode: 'https://leetcode.com/u/Praveen2508/',
}

export const projects = [
  {
    name: 'MAX',
    tech: 'Local-first AI assistant',
    featured: true,
    tags: ['Python', 'AI & ML', 'Local AI', 'VS Code', 'Git'],
    text: 'A local-first AI computer assistant for task planning, coding assistance and computer automation.',
  },
  {
    name: 'Random Password Generator with RSA',
    tech: 'Java, Swing, MySQL',
    tags: ['Java', 'MySQL', 'Git'],
    text: 'Desktop password manager using RSA 2048-bit asymmetric encryption. Generates random passwords, keeps an encrypted vault organised by label, decrypts on demand, and stores the key pair in MySQL.',
  },
  {
    name: 'AI Insurance Claim Approval',
    tech: 'Python, MySQL, XGBoost',
    tags: ['Python', 'MySQL', 'XGBoost', 'Jupyter Notebook'],
    text: 'Claim analysis system that identifies why claims are rejected and suggests corrective actions.',
  },
  {
    name: 'Face Recognition Attendance System',
    tech: 'Python',
    tags: ['Python', 'Git'],
    text: 'Real-time attendance from a live webcam feed. Matches faces against a known image database and logs names and timestamps to CSV, with duplicate prevention per session.',
  },
  {
    name: 'Library Management System',
    tech: 'Python, MySQL',
    tags: ['Python', 'MySQL', 'Data Structures'],
    text: 'Terminal-based library system with custom HashMap, linked list, stack, queue and BST implementations. Powers member and book management, queue-based borrowing, stack-based undo/redo and a capped activity log.',
  },
  {
    name: 'Student Registration System',
    tech: 'HTML, CSS, MySQL',
    tags: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    text: 'Web-based registration form with client-side validation using HTML5 form attributes.',
  },
]

export const experience = [
  {
    title: 'Machine Learning Model',
    org: 'healthOmation',
    when: 'Jun 2026 to Jul 2026',
    text: 'Built an AI-based insurance claim analysis system in Python, MySQL and XGBoost to identify rejection reasons and suggest corrective actions.',
  },
  {
    title: 'Intern',
    org: 'Corizo',
    when: 'Nov 2025 to Dec 2025',
    text: 'Worked on coding, testing and documentation, with hands-on exposure to the SDLC and team-based development.',
  },
  // {
  //   title: 'Intern, Security and Server Management',
  //   org: 'AKTech Information Technology Solutions',
  //   when: '',
  //   text: 'Worked on cloud infrastructure, deployment processes, Linux systems and DevOps workflows.',
  // },
]

export const skills = [
  { group: 'Languages', items: ['Java', 'Python'] },
  { group: 'Web', items: ['HTML', 'CSS', 'JavaScript', 'Reactjs'] },
  { group: 'Machine learning', items: ['XGBoost'] },
  { group: 'Database', items: ['MySQL'] },
  { group: 'Tools', items: ['VS Code', 'Power BI', 'Figma', 'GitHub', 'Tableau','Jupyter Notebook','Git','MS Office'] },
  // { group: 'Operating System', items:['Linux','Windows'] }
]

export const certs = {
  summary: '150+ certifications across Microsoft, UiPath, Salesforce and MongoDB.',
  highlights: [
    'Java Programming Certificate, Besant Technologies, 2025',
    'MongoDB Database Admin Path Certificate',
    'Salesforce Agentforce Specialist (Agent Blazer), Nov 2025',
    'UiPath Data Fabric (v2024.10)',
  ],
}
