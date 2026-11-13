// All of the site's content lives in this file.
// Edit text, links and lists here; the layout updates on its own.
//
// Image and video paths are relative to src/assets (see src/media.js).
// A path whose file does not exist yet shows a placeholder until you add it.

export const profile = {
  name: 'Suffiyan Asghar Ali',
  shortName: 'Suffiyan',
  role: 'Development & AI',
  email: 'suffiyan.asghar10@gmail.com',
  github: 'https://github.com/suffiyan-asghar',
  githubHandle: 'suffiyan-asghar',
  linkedin: 'https://linkedin.com/in/suffiyan-asghar-ali',
  linkedinHandle: 'suffiyan-asghar-ali',
  location: 'Karachi, Pakistan',
  cv: '/Suffiyan_Asghar_CV.pdf',
  portraitAlt: 'Portrait of Suffiyan Asghar Ali',
};

// Shown in the hero, under your name.
export const about = [
  'I am a Computer Science student at the Institute of Business Administration, Karachi. My work focuses on applied AI, particularly retrieval-augmented generation and machine learning, alongside full-stack web development.',
  'During my internships I have built LLM-powered features, API endpoints and web applications for clients, working with Python, Next.js, React and Spring Boot. I am comfortable working in Agile teams and taking a project from requirements to delivery.',
];

// `repo` and `live` are optional. Replace the placeholder repo links with the
// real repository for each project, and add a `live` URL to show a demo link.
//
// images:  screenshots at 16:10, e.g. 'projects/<slug>-1.png'. The first one
//          appears on the card; all of them appear in the detail view.
// video:   optional short muted loop, played on hover over the card.
// details: optional extra paragraphs shown only in the detail view.
// diagram: optional built-in diagram for the detail view ('rag').
export const projects = [
  {
    slug: 'football-rag',
    category: 'NLP · Retrieval',
    title: 'Football RAG Question-Answering System',
    description:
      'A retrieval-augmented question-answering system for football. It combines dense and BM25 hybrid retrieval with cross-encoder re-ranking and MMR, and is deployed on Hugging Face Spaces.',
    details: [],
    stack: ['Python', 'Pinecone', 'Sentence-Transformers', 'Llama 3.1', 'Gradio'],
    repo: 'https://github.com/suffiyan-asghar',
    live: '',
    images: [
      { src: 'projects/football-rag-1.jpg', alt: 'Football RAG app answering a question about Lionel Messi, with faithfulness and relevancy scores' },
      { src: 'projects/football-rag-2.png', alt: 'Football RAG app, second screenshot' },
    ],
    video: 'projects/football-rag-preview.mp4',
    diagram: 'rag',
  },
  {
    slug: 'world-cup-predictor',
    category: 'Machine learning',
    title: 'World Cup 2026 Match Predictor',
    description:
      'A match outcome predictor built on a custom Elo rating system and recent-form features, trained on historical international results and deployed as a Gradio win-probability app.',
    details: [],
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Gradio'],
    repo: 'https://github.com/suffiyan-asghar',
    live: '',
    images: [
      { src: 'projects/world-cup-predictor-1.jpg', alt: 'Bar chart of model win probabilities for two World Cup 2026 semifinal matchups' },
      { src: 'projects/world-cup-predictor-2.png', alt: 'World Cup predictor, second screenshot' },
    ],
    video: 'projects/world-cup-predictor-preview.mp4',
  },
  {
    slug: 'quiz-platform',
    category: 'Full-stack',
    title: 'Quiz Management Platform',
    description:
      'A real-time assessment platform with anti-cheating measures and automated grading, developed from faculty requirements and managed with Agile Scrum.',
    details: [],
    stack: ['React', 'Node.js', 'ClickUp', 'Trello'],
    repo: 'https://github.com/suffiyan-asghar',
    live: '',
    images: [
      { src: 'projects/quiz-platform-1.png', alt: 'Student view of a timed quiz with proctoring on and a question navigator' },
      { src: 'projects/quiz-platform-2.png', alt: 'Quiz platform, second screenshot' },
    ],
    video: 'projects/quiz-platform-preview.mp4',
  },
];

// logo: square SVG or PNG in src/assets/logos. Shown in greyscale until hover.
// affiliations: optional smaller rows under an entry, each with its own logo.
export const experience = [
  {
    org: 'TechMonkeys',
    role: 'Software Engineering Intern',
    period: 'Jun – Oct 2026',
    description:
      'Delivered a RAG assistant, a lead generation platform and a locksmith service portal for international clients. Built Python API endpoints for LLM features using Ollama, with Next.js frontends and Twilio integration.',
    logo: 'logos/techmonkeys.svg',
    logoAlt: 'TechMonkeys logo',
  },
  {
    org: 'CORRTEC',
    role: 'Software Development Intern',
    period: 'Jul 2025',
    description:
      'Developed a full-stack Hotel Management System using Java Spring Boot and React.js. Worked in an Agile team and tested the RESTful API endpoints with Postman.',
    logo: 'logos/corrtec.svg',
    logoAlt: 'CORRTEC logo',
  },
  {
    org: 'IBA Karachi',
    role: 'BS Computer Science',
    period: '2023 – present',
    description:
      'Creatives Team Member at Google Developer Groups IBA, Management Team at the IBA Computer Science Society, and Social Intern at Foundation Fighting Poverty.',
    logo: 'logos/iba.svg',
    logoAlt: 'Institute of Business Administration Karachi logo',
    affiliations: [{ name: 'Google Developer Groups IBA', logo: 'logos/gdg.svg', logoAlt: 'Google Developer Groups logo' }],
  },
];

// `icon` is a key from src/icons.jsx (simple-icons). Leave it out for no icon.
export const skills = [
  {
    label: 'AI and data',
    items: [
      { name: 'LLMs' },
      { name: 'RAG' },
      { name: 'Ollama', icon: 'ollama' },
      { name: 'Sentence-Transformers' },
      { name: 'Pinecone' },
      { name: 'Scikit-learn', icon: 'scikitlearn' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'Pandas', icon: 'pandas' },
      { name: 'NumPy', icon: 'numpy' },
    ],
  },
  {
    label: 'Languages and frameworks',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'C++', icon: 'cplusplus' },
      { name: 'SQL', icon: 'sql' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React.js', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Spring Boot', icon: 'springboot' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Postman', icon: 'postman' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Oracle' },
      { name: 'Twilio' },
      { name: 'Apollo', icon: 'apollographql' },
      { name: 'Figma', icon: 'figma' },
      { name: 'Jira', icon: 'jira' },
      { name: 'ClickUp', icon: 'clickup' },
      { name: 'Trello', icon: 'trello' },
    ],
  },
];

// `url` links to the certificate and opens in a new tab. Replace each '#'.
// `icon` is a key from src/icons.jsx; without one the card shows an award badge.
export const certifications = {
  issuer: 'DataCamp',
  items: [
    { name: 'Git Fundamentals', url: '#', icon: 'git' },
    { name: 'SQL', url: '#', icon: 'sql' },
    { name: 'Supervised Learning', url: '#', icon: 'supervised' },
    { name: 'MLflow', url: '#', icon: 'mlflow' },
    { name: 'Scikit-learn', url: '#', icon: 'scikitlearn' },
  ],
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
];
