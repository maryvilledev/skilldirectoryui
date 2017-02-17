const skillTypesMap = {
  compiled: 'Programming Language (Compiled)',
  scripted: 'Programming Language (Scripted)',
  database: 'Database Language',
  orchestration: 'DevOps Tool',
}

// Maps the skill type received from API to a nicer string/description
export const mapSkillType = (skillType) => {
  return skillTypesMap[skillType];
}

const linkTypesMap = {
  'blog':           'Blog',
  'webpage':        'Webpage',
  'tutorial':       'Tutorial',
  'developer-tool': 'Developer Tool',
}

// Maps the link type received from API to a nicer string/description
export const mapLinkType = (linkType) => {
  return linkTypesMap[linkType];
}