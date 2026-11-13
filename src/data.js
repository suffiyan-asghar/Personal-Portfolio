// All of the site's content lives in this file.
// Edit text, links and lists here; the layout updates on its own.

export const profile = {
  name: 'Suffiyan Asghar Ali',
  shortName: 'Suffiyan',
  role: 'Development & AI',
  intro:
    'Computer Science student at IBA Karachi. I have interned at TechMonkeys and CORRTEC, building AI applications and full-stack web products.',
  email: 'suffiyan.asghar10@gmail.com',
  github: 'https://github.com/suffiyan-asghar',
  githubHandle: 'suffiyan-asghar',
  linkedin: 'https://linkedin.com/in/suffiyan-asghar-ali',
  linkedinHandle: 'suffiyan-asghar-ali',
  location: 'Karachi, Pakistan',
  cv: '/Suffiyan_Asghar_CV.pdf',
};

export const about = [
  'I am a Computer Science student at the Institute of Business Administration, Karachi. My work focuses on applied AI, particularly retrieval-augmented generation and machine learning, alongside full-stack web development.',
  'During my internships I have built LLM-powered features, API endpoints and web applications for clients, working with Python, Next.js, React and Spring Boot. I am comfortable working in Agile teams and taking a project from requirements to delivery.',
];

// `repo` and `live` are optional. Replace the placeholder repo links with the
// real repository for each project, and add a `live` URL to show a demo link.
export const projects = [
  {
    category: 'NLP · Retrieval',
    title: 'Football RAG Question-Answering System',
    description:
      'A retrieval-augmented question-answering system for football. It combines dense and BM25 hybrid retrieval with cross-encoder re-ranking and MMR, and is deployed on Hugging Face Spaces.',
    stack: ['Python', 'Pinecone', 'Sentence-Transformers', 'Llama 3.1', 'Gradio'],
    repo: 'https://github.com/suffiyan-asghar',
    live: '',
  },
  {
    category: 'Machine learning',
    title: 'World Cup 2026 Match Predictor',
    description:
      'A match outcome predictor built on a custom Elo rating system and recent-form features, trained on historical international results and deployed as a Gradio win-probability app.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Gradio'],
    repo: 'https://github.com/suffiyan-asghar',
    live: '',
  },
  {
    category: 'Full-stack',
    title: 'Quiz Management Platform',
    description:
      'A real-time assessment platform with anti-cheating measures and automated grading, developed from faculty requirements and managed with Agile Scrum.',
    stack: ['React', 'Node.js', 'ClickUp', 'Trello'],
    repo: 'https://github.com/suffiyan-asghar',
    live: '',
  },
];

export const experience = [
  {
    org: 'TechMonkeys',
    role: 'Software Engineering Intern',
    period: 'Jun – Oct 2026',
    description:
      'Delivered a RAG assistant, a lead generation platform and a locksmith service portal for international clients. Built Python API endpoints for LLM features using Ollama, with Next.js frontends and Twilio integration.',
  },
  {
    org: 'CORRTEC',
    role: 'Software Development Intern',
    period: 'Jul 2025',
    description:
      'Developed a full-stack Hotel Management System using Java Spring Boot and React.js. Worked in an Agile team and tested the RESTful API endpoints with Postman.',
  },
  {
    org: 'IBA Karachi',
    role: 'BS Computer Science',
    period: '2023 – present',
    description:
      'Creatives Team Member at Google Developer Groups IBA, Management Team at the IBA Computer Science Society, and Social Intern at Foundation Fighting Poverty.',
  },
];

export const skills = [
  {
    label: 'AI and data',
    items: ['LLMs', 'RAG', 'Ollama', 'Sentence-Transformers', 'Pinecone', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy'],
  },
  {
    label: 'Languages and frameworks',
    items: ['Python', 'C++', 'SQL', 'JavaScript', 'React.js', 'Next.js', 'Node.js', 'Spring Boot'],
  },
  {
    label: 'Tools',
    items: ['Git', 'Postman', 'MongoDB', 'Oracle', 'Twilio', 'Apollo', 'Figma', 'Jira', 'ClickUp', 'Trello'],
  },
];

export const certifications = {
  issuer: 'DataCamp',
  items: ['Git Fundamentals', 'SQL', 'Supervised Learning', 'MLflow', 'Scikit-learn'],
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
];
