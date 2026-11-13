// Technology icons from the simple-icons package. Only the icons listed here
// end up in the bundle. To give a skill in data.js an icon, add its key here
// (browse names at https://simpleicons.org) and set `icon` on the skill.
import {
  siApollographql,
  siClickup,
  siCplusplus,
  siFigma,
  siGit,
  siJavascript,
  siJira,
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
  figma: siFigma,
  git: siGit,
  javascript: siJavascript,
  jira: siJira,
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

// Monochrome: the icon takes the colour of the text around it.
export function TechIcon({ name, size = 18 }) {
  const icon = icons[name];
  if (!icon) return null;
  return (
    <svg className="tech-icon" aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
