// Technology icons from the simple-icons package. Only the icons listed here
// end up in the bundle. To give a skill in data.js an icon, add its key here
// (browse names at https://simpleicons.org) and set `icon` on the skill.
import {
  siApollographql,
  siClickup,
  siCplusplus,
  siDatacamp,
  siFigma,
  siGit,
  siJavascript,
  siJira,
  siMlflow,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOllama,
  siPandas,
  siPostman,
  siPython,
  siReact,
  siScikitlearn,
  siSpringboot,
  siTensorflow,
  siTrello,
} from 'simple-icons';

const icons = {
  apollographql: siApollographql,
  clickup: siClickup,
  cplusplus: siCplusplus,
  datacamp: siDatacamp,
  figma: siFigma,
  git: siGit,
  javascript: siJavascript,
  jira: siJira,
  mlflow: siMlflow,
  mongodb: siMongodb,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  numpy: siNumpy,
  ollama: siOllama,
  pandas: siPandas,
  postman: siPostman,
  python: siPython,
  react: siReact,
  scikitlearn: siScikitlearn,
  springboot: siSpringboot,
  tensorflow: siTensorflow,
  trello: siTrello,
};

// Generic icons drawn here, for topics that have no brand logo. Line style,
// on the same 24×24 grid as simple-icons.
const drawn = {
  // A database cylinder.
  sql: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  // Two labelled groups of points split by a decision boundary.
  supervised: (
    <>
      <path d="M3 21 21 3" strokeDasharray="2.5 2.5" />
      <circle cx="6" cy="7" r="1.8" fill="currentColor" />
      <circle cx="10.5" cy="4.5" r="1.8" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1.8" fill="currentColor" />
      <circle cx="18" cy="13" r="1.8" />
      <circle cx="13.5" cy="19.5" r="1.8" />
      <circle cx="19.5" cy="18" r="1.8" />
    </>
  ),
};

export const hasIcon = (name) => Boolean(icons[name] || drawn[name]);

// Monochrome: the icon takes the colour of the text around it.
export function TechIcon({ name, size = 18 }) {
  if (drawn[name]) {
    return (
      <svg className="tech-icon" aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {drawn[name]}
      </svg>
    );
  }
  const icon = icons[name];
  if (!icon) return null;
  return (
    <svg className="tech-icon" aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
