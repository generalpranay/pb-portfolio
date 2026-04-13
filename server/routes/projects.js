import { Router } from 'express';

const router = Router();

const PROJECTS = [
  {
    id: 1,
    number: '01',
    title: 'Enterprise Real Estate Platform',
    org: 'Century 21',
    period: 'Jan 2025 – Sep 2025',
    type: 'Full Stack Developer',
    description:
      'Engineered high-performance web and mobile apps for a global real estate network. Real-time Firestore sync, secure REST APIs for property data, user authentication, and lead generation workflows.',
    impact: [
      'Served thousands of agents across North America',
      'Real-time property sync with Firestore listeners',
      'Reduced perceived load time by 40% via lazy loading',
    ],
    tags: ['Angular', 'Flutter', 'Expo', 'Firestore', 'REST API', 'TypeScript'],
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
      'Architected a comprehensive housing management system, digitizing manual community workflows. Built data pipelines feeding into housing execution plans for resource allocation.',
    impact: [
      'Digitized 100% of previously manual housing records',
      'Data pipelines reducing planning cycles by weeks',
      'Delivered full system within contract timeline',
    ],
    tags: ['System Design', 'PostgreSQL', 'Database Modeling', 'Data Pipeline'],
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
      'RESTful API in Java with OO cascading logic to automate dynamic task prioritization. Containerized with Docker, documented with Postman and OpenAPI/Swagger.',
    impact: [
      'Full OpenAPI/Swagger documentation suite',
      'Docker containerization for portable deployment',
      'OO cascading priority engine for intelligent scheduling',
    ],
    tags: ['Java', 'Docker', 'REST API', 'Swagger', 'OpenAPI'],
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
      'Integrated Azure Cognitive Services and OpenAI APIs for real-time translation and summarization, with async processing for fluid UI updates on large data transformations.',
    impact: [
      'Multi-language real-time translation via Azure AI',
      'Async queue processing for large document batches',
      'Agile delivery across 6-month sprint cycles',
    ],
    tags: ['Azure AI', 'OpenAI', 'Async Processing', 'Agile', 'Node.js'],
    link: null,
  },
];

router.get('/', (req, res) => {
  res.json(PROJECTS);
});

export default router;
