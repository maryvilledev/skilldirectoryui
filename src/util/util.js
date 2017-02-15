const skillTypesMap = {
  compiled: 'Programming Language (Compiled)',
  scripted: 'Programming Language (Scripted)',
  database: 'Database Language',
  orchestration: 'DevOps Tool',
}

// Maps the skill type received from API to a nicer string/description
export const mapSkillType = (skillType) => {
  console.log('mapping' + skillType);
  return skillTypesMap[skillType];
}