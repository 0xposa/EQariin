const fs = require('fs');
let content = fs.readFileSync('src/constants/uiLabels.ts', 'utf-8');

// Add to interface
content = content.replace(/followX: string;/g, 'followX: string;\n  joinDiscord: string;');

// Add translations
const translations = {
  'Bahasa Indonesia': 'Gabung Discord',
  'English': 'Join Discord',
  'Arabic': 'انضم إلى ديسكورد',
  'Mandarin': '加入 Discord',
  'Spanish': 'Únete a Discord',
  'Japanese': 'Discordに参加する',
  'Turkish': "Discord'a Katıl",
  'French': 'Rejoindre Discord',
  'Malay': 'Sertai Discord'
};

content = content.replace(/followX:\s*'([^']+)',/g, (match, p1, offset, string) => {
  // Find which language this block belongs to by looking backwards
  const textBefore = string.substring(0, offset);
  const langMatch = textBefore.match(/([a-zA-Z\s]+):\s*\{[^}]*$/);
  
  // Default to english if something goes wrong
  let lang = 'English';
  if (langMatch) {
    let rawLang = langMatch[1].trim();
    if (rawLang === "'Bahasa Indonesia'") lang = 'Bahasa Indonesia';
    else lang = rawLang;
  }
  
  const translated = translations[lang] || 'Join Discord';
  return `${match}\n    joinDiscord: '${translated}',`;
});

fs.writeFileSync('src/constants/uiLabels.ts', content);
console.log('Updated uiLabels.ts');
