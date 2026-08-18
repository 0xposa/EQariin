const fs = require('fs');
let content = fs.readFileSync('src/constants/landingTranslations.ts', 'utf-8');

content = content.replace(/viewGithub: string;/g, 'viewGithub: string;\n  getApi: string;\n  soonBadge: string;');

const getApiTranslations = {
  'English': 'Get API',
  'Bahasa Indonesia': 'Dapatkan API',
  'Arabic': 'احصل على API',
  'Mandarin': '获取 API',
  'Spanish': 'Obtener API',
  'Japanese': 'APIを取得',
  'Turkish': 'API Al',
  'French': "Obtenir l'API",
  'Malay': 'Dapatkan API'
};

const soonTranslations = {
  'English': 'Soon',
  'Bahasa Indonesia': 'Segera',
  'Arabic': 'قريباً',
  'Mandarin': '即将推出',
  'Spanish': 'Pronto',
  'Japanese': '近日公開',
  'Turkish': 'Yakında',
  'French': 'Bientôt',
  'Malay': 'Akan Datang'
};

content = content.replace(/viewGithub:\s*"([^"]+)",/g, (match, p1, offset, string) => {
  const textBefore = string.substring(0, offset);
  const langMatch = textBefore.match(/([a-zA-Z\s]+):\s*\{[^}]*$/);
  
  let lang = 'English';
  if (langMatch) {
    let rawLang = langMatch[1].trim();
    if (rawLang === "'Bahasa Indonesia'") lang = 'Bahasa Indonesia';
    else lang = rawLang;
  }
  
  const getApi = getApiTranslations[lang] || 'Get API';
  const soon = soonTranslations[lang] || 'Soon';
  
  return `${match}\n    getApi: "${getApi}",\n    soonBadge: "${soon}",`;
});

fs.writeFileSync('src/constants/landingTranslations.ts', content);
console.log('Updated landingTranslations.ts');
