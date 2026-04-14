const PROJECTS = [
  {
    id: 1,
    number: '01',
    title: 'Enterprise Real Estate Platform',
    org: 'Century 21',
    period: 'Jan 2025 – Sep 2025',
    type: 'Full Stack Developer',
    description:
      'Engineered a full-stack web and mobile platform for one of North America\'s largest real estate networks. Built a high-performance Angular web app and a cross-platform Flutter mobile app, backed by a secure Spring Boot REST API. Implemented real-time Firestore listeners for live property sync, JWT-based authentication, and automated lead capture workflows used by thousands of agents daily.',
    impact: [
      'Deployed to thousands of agents across North America',
      'Real-time property sync via Firestore listeners',
      'Reduced perceived load time by 40% with lazy loading & caching',
      'Secure JWT auth with role-based agent access control',
    ],
    tags: ['Angular', 'Flutter', 'Spring Boot', 'Firestore', 'REST API', 'TypeScript'],
    link: null,
  },
  {
    id: 2,
    number: '02',
    title: 'Housing Management System',
    org: 'First Nations Housing Services',
    period: '4-Month Contract',
    type: 'Software Developer',
    description:
      'Architected and delivered a full housing management system from the ground up for a First Nations community, replacing entirely manual paper-based workflows. Designed the PostgreSQL schema, built ETL data pipelines to migrate legacy records, and created a dashboard for housing coordinators to track allocation, maintenance requests, and occupancy — cutting planning cycles from weeks to days.',
    impact: [
      'Digitized 100% of previously manual housing records',
      'ETL pipelines migrating years of legacy data into PostgreSQL',
      'Dashboard reduced planning cycle time from weeks to days',
      'Delivered complete system within 4-month contract window',
    ],
    tags: ['System Design', 'PostgreSQL', 'Database Modeling', 'ETL Pipeline', 'Dashboard'],
    link: null,
  },
  {
    id: 3,
    number: '03',
    title: 'AI Life Planner',
    org: 'Personal Project',
    period: 'Oct 2025 – Present',
    type: 'Software Developer',
    description:
      'A RESTful task management API built in Java, using object-oriented cascading logic to dynamically reprioritize tasks based on deadlines, dependencies, and user-defined weights. The priority engine recursively resolves task chains so that blocking tasks automatically surface first. Fully containerized with Docker, documented with Postman collections and a live OpenAPI/Swagger UI.',
    impact: [
      'OO cascading engine resolves task dependency chains automatically',
      'Full OpenAPI/Swagger UI with live endpoint documentation',
      'Docker containerized for one-command local and cloud deployment',
      'Postman collection covering all CRUD and prioritization endpoints',
    ],
    tags: ['Java', 'Spring Boot', 'Docker', 'REST API', 'Swagger', 'OpenAPI'],
    link: null,
  },
  {
    id: 4,
    number: '04',
    title: 'AI Translation & Assistant Tool',
    org: 'Professional Project',
    period: 'Mar 2025 – Aug 2025',
    type: 'AI Integration Developer',
    description:
      'Integrated Azure Cognitive Services and OpenAI GPT APIs into an internal productivity tool to provide real-time multi-language translation, text summarization, and conversational assistance. Built an async processing pipeline so large document transformations stream results progressively to the UI, keeping the experience fluid even on heavy payloads. Delivered across 6-month Agile sprint cycles with weekly demos.',
    impact: [
      'Real-time multi-language translation via Azure Cognitive Services',
      'GPT-powered summarization reducing document review time',
      'Async streaming pipeline for fluid UI on large data loads',
      'Agile delivery with weekly sprint demos across 6 months',
    ],
    tags: ['Azure AI', 'OpenAI', 'Async Streaming', 'Agile', 'Node.js', 'REST API'],
    link: null,
  },
];

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return res.json(PROJECTS);
}
