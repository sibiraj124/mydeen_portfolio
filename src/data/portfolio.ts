export const personalInfo = {
  name: "Mydheen",
  fullName: "Mohammed Mydheen",
  role: "Full Stack Developer",
  tagline: "Building digital experiences that matter",
  email: "mydheen@example.com",
  phone: "+91 98765 43210",
  location: "Chennai, Tamil Nadu, India",
  github: "https://github.com/mydheen",
  linkedin: "https://linkedin.com/in/mydheen",
  twitter: "https://twitter.com/mydheen",
  resumeUrl: "/resume.pdf",
  about: `I'm a passionate Full Stack Developer with 3+ years of experience crafting robust and scalable web applications. I specialize in building end-to-end solutions using modern technologies like React, Next.js, Node.js, and cloud platforms.

I thrive on solving complex problems and turning ideas into reality through clean, maintainable code. When I'm not coding, I'm exploring new technologies, contributing to open-source projects, or mentoring aspiring developers.`,
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "25+" },
    { label: "Technologies", value: "20+" },
    { label: "Happy Clients", value: "15+" },
  ],
};

export const skills = [
  {
    category: "Frontend",
    icon: "FaReact",
    color: "#0ea5e9",
    items: [
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    category: "Backend",
    icon: "FaNodeJs",
    color: "#06b6d4",
    items: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    category: "Database",
    icon: "FaDatabase",
    color: "#8b5cf6",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "MySQL", level: 80 },
      { name: "Redis", level: 72 },
      { name: "Prisma ORM", level: 78 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "FaCloud",
    color: "#ec4899",
    items: [
      { name: "Docker", level: 78 },
      { name: "Git / GitHub", level: 92 },
      { name: "AWS", level: 70 },
      { name: "CI/CD", level: 75 },
      { name: "Linux", level: 80 },
    ],
  },
];

export const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "Chennai, India",
    period: "2023 – Present",
    type: "Full-time",
    description:
      "Led the development of a microservices-based e-commerce platform serving 50K+ daily users. Architected real-time features using WebSockets, improved API performance by 40%, and mentored a team of 4 junior developers.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
  },
  {
    title: "Full Stack Developer",
    company: "InnovateSoft Pvt Ltd",
    location: "Chennai, India",
    period: "2022 – 2023",
    type: "Full-time",
    description:
      "Developed and maintained SaaS applications for 10+ enterprise clients. Built RESTful APIs, integrated third-party payment gateways, and reduced page load time by 35% through optimization strategies.",
    tech: ["React.js", "Express.js", "MongoDB", "Tailwind CSS", "Git"],
  },
  {
    title: "Frontend Developer Intern",
    company: "DigitalMinds Agency",
    location: "Remote",
    period: "2021 – 2022",
    type: "Internship",
    description:
      "Built responsive UI components for 5+ client projects. Collaborated with designers to implement pixel-perfect interfaces and gained hands-on experience with modern React patterns.",
    tech: ["React.js", "JavaScript", "CSS3", "Figma", "REST APIs"],
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Anna University",
    location: "Chennai, Tamil Nadu",
    period: "2018 – 2022",
    grade: "CGPA: 8.4 / 10",
    description:
      "Specialized in software engineering and web technologies. Final year project on real-time collaborative tools won the Best Project Award.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "St. Joseph's Higher Secondary School",
    location: "Chennai, Tamil Nadu",
    period: "2016 – 2018",
    grade: "92.5%",
    description: "Science stream with Computer Science as major subject.",
  },
];

export const certifications = [
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-CDA-2023-XXXX",
    color: "#FF9900",
    icon: "FaAws",
    link: "#",
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "2023",
    credentialId: "META-FED-2023-XXXX",
    color: "#0ea5e9",
    icon: "FaReact",
    link: "#",
  },
  {
    title: "MongoDB Developer Certification",
    issuer: "MongoDB University",
    date: "2022",
    credentialId: "MDB-DEV-2022-XXXX",
    color: "#4DB33D",
    icon: "SiMongodb",
    link: "#",
  },
  {
    title: "Node.js Application Developer",
    issuer: "OpenJS Foundation",
    date: "2022",
    credentialId: "OPENJS-JSNAD-XXXX",
    color: "#339933",
    icon: "FaNodeJs",
    link: "#",
  },
  {
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
    credentialId: "GCP-PRO-2023-XXXX",
    color: "#4285F4",
    icon: "FaGoogle",
    link: "#",
  },
  {
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2023",
    credentialId: "DCA-2023-XXXX",
    color: "#2496ED",
    icon: "FaDocker",
    link: "#",
  },
];

export const projects = [
  {
    title: "ShopSphere – E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory, payment integration (Razorpay), admin dashboard, and PWA support. Handles 10K+ products with advanced search and filtering.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "Docker"],
    github: "#",
    live: "#",
    featured: true,
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    title: "CollabSpace – Real-time Collaboration Tool",
    description:
      "Notion-inspired workspace with real-time document collaboration, kanban boards, and video conferencing. Supports 100+ concurrent users with WebSocket-powered sync.",
    tech: ["React.js", "Socket.io", "Express.js", "MongoDB", "WebRTC"],
    github: "#",
    live: "#",
    featured: true,
    gradient: "from-purple-600 to-blue-500",
  },
  {
    title: "DevHire – Job Board Platform",
    description:
      "A tech-focused job board connecting developers with startups. Features AI-powered job matching, skill assessments, and live coding interviews.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI"],
    github: "#",
    live: "#",
    featured: false,
    gradient: "from-cyan-600 to-teal-500",
  },
  {
    title: "FinTrack – Personal Finance App",
    description:
      "Smart personal finance tracker with expense categorization, budget planning, investment portfolio tracking, and AI-generated financial insights.",
    tech: ["React Native", "Node.js", "MongoDB", "Chart.js", "JWT"],
    github: "#",
    live: "#",
    featured: false,
    gradient: "from-emerald-600 to-cyan-500",
  },
  {
    title: "SmartBlog – CMS Platform",
    description:
      "Headless CMS with markdown editor, SEO optimization, dark/light mode, and multi-author support. Lighthouse score of 98/100.",
    tech: ["Next.js", "MDX", "Tailwind CSS", "Supabase", "Vercel"],
    github: "#",
    live: "#",
    featured: false,
    gradient: "from-pink-600 to-purple-500",
  },
  {
    title: "WeatherNow – Weather Dashboard",
    description:
      "Beautiful weather dashboard with 7-day forecast, interactive maps, air quality index, and weather alerts. Built with OpenWeather API.",
    tech: ["React.js", "TypeScript", "Leaflet.js", "Chart.js", "PWA"],
    github: "#",
    live: "#",
    featured: false,
    gradient: "from-blue-500 to-indigo-600",
  },
];
