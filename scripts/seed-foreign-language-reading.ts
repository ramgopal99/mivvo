import { PrismaClient } from '@prisma/client'
import { getActiveLanguages } from '../app/dashboard/foreign-lang/languages-config'

const prisma = new PrismaClient()

async function main() {
  console.log('🌍 Seeding Foreign Language Reading Data...')

  // Create Language Configs from config file
  console.log('📝 Creating Language Configurations...')
  const activeLanguages = getActiveLanguages();

  const languageConfigs = [];
  for (const langDef of activeLanguages) {
    const langConfig = await prisma.languageConfig.upsert({
      where: { language: langDef.language },
      update: {
        name: langDef.name,
        code: langDef.code,
        isActive: langDef.isActive
      },
      create: {
        language: langDef.language,
        name: langDef.name,
        code: langDef.code,
        isActive: langDef.isActive
      }
    });
    languageConfigs.push(langConfig);
  }

  const englishLang = languageConfigs.find(l => l.language === 'ENGLISH');
  const frenchLang = languageConfigs.find(l => l.language === 'FRENCH');

  if (!englishLang || !frenchLang) {
    throw new Error('Required languages (English, French) not found in config');
  }

  console.log('✅ Language configs created:', languageConfigs.map(l => `${l.name} (${l.code})`))

  // Create CEFR Level Configs
  console.log('🎯 Creating CEFR Level Configurations...')
  const cefrLevels = [
    { level: 'A1', name: 'A1 - Beginner', totalTargetScore: 200, skillTargetScore: 50, order: 1 },
    { level: 'A2', name: 'A2 - Elementary', totalTargetScore: 400, skillTargetScore: 100, order: 2 },
    { level: 'B1', name: 'B1 - Intermediate', totalTargetScore: 600, skillTargetScore: 150, order: 3 },
    { level: 'B2', name: 'B2 - Upper Intermediate', totalTargetScore: 800, skillTargetScore: 200, order: 4 },
    { level: 'C1', name: 'C1 - Advanced', totalTargetScore: 1000, skillTargetScore: 250, order: 5 },
    { level: 'C2', name: 'C2 - Proficient', totalTargetScore: 1200, skillTargetScore: 300, order: 6 }
  ]

  for (const level of cefrLevels) {
    for (const lang of [englishLang, frenchLang]) {
      await prisma.cEFRLevelConfig.upsert({
        where: {
          level_languageId: {
            level: level.level as any,
            languageId: lang.id
          }
        },
        update: {},
        create: {
          level: level.level as any,
          name: level.name,
          description: `${level.name} level proficiency`,
          totalTargetScore: level.totalTargetScore,
          skillTargetScore: level.skillTargetScore,
          order: level.order,
          languageId: lang.id
        }
      })
    }
  }

  console.log('✅ CEFR levels created for both languages')

  // Create Skill Configs
  console.log('🛠️ Creating Skill Configurations...')
  const skills = [
    { skill: 'READING', name: 'Reading', description: 'Reading comprehension and text analysis skills' },
    { skill: 'WRITING', name: 'Writing', description: 'Writing and composition skills' },
    { skill: 'SPEAKING', name: 'Speaking + Listening', description: 'Oral communication and listening skills' },
    { skill: 'MCQ', name: 'MCQ-Based Section', description: 'Grammar, vocabulary, and language structure knowledge' }
  ]

  for (const skill of skills) {
    for (const lang of [englishLang, frenchLang]) {
      await prisma.skillConfig.upsert({
        where: {
          skill_languageId: {
            skill: skill.skill as any,
            languageId: lang.id
          }
        },
        update: {},
        create: {
          skill: skill.skill as any,
          name: skill.name,
          description: skill.description,
          languageId: lang.id
        }
      })
    }
  }

  console.log('✅ Skill configs created for both languages')

  // Get CEFR levels for reference
  const englishA1 = await prisma.cEFRLevelConfig.findFirst({
    where: { languageId: englishLang.id, level: 'A1' }
  })

  const frenchA1 = await prisma.cEFRLevelConfig.findFirst({
    where: { languageId: frenchLang.id, level: 'A1' }
  })

  if (!englishA1 || !frenchA1) {
    throw new Error('CEFR levels not found')
  }

  // Create Reading Sessions for English A1
  console.log('📖 Creating English A1 Reading Sessions...')
  const englishReadingSession = await prisma.readingSession.upsert({
    where: { id: 'reading-session-english-1' },
    update: {},
    create: {
      id: 'reading-session-english-1',
      title: 'English Language Evolution',
      sessionType: 'READING_COMPREHENSION',
      languageId: englishLang.id,
      cefrLevelId: englishA1.id,
      timeLimit: 30
    }
  })

  // Create Reading Comprehension Question
  await prisma.readingComprehension.upsert({
    where: { id: 'comp-en-1' },
    update: {},
    create: {
      id: 'comp-en-1',
      sessionId: englishReadingSession.id,
      passage: "The English language has become the global language of business, science, and technology. Millions of people around the world learn English as a second language. The rise of the internet has further accelerated this trend, making English essential for international communication.",
      question: "What has accelerated the trend of English becoming a global language?",
      options: [
        "The development of new technologies",
        "The rise of the internet",
        "Increased business travel",
        "Scientific discoveries"
      ],
      correctAnswer: 1,
      explanation: "The passage states that 'The rise of the internet has further accelerated this trend', making it the correct answer.",
      order: 1
    }
  })

  // Create Reading Rearrange Task
  await prisma.readingRearrange.upsert({
    where: { id: 'rearrange-en-1' },
    update: {},
    create: {
      id: 'rearrange-en-1',
      sessionId: englishReadingSession.id,
      scrambledWords: ["language", "English", "the", "global", "become", "has"],
      correctOrder: ["English", "has", "become", "the", "global", "language"],
      explanation: "The correct grammatical order is: Subject (English) + Auxiliary verb (has) + Past participle (become) + Article (the) + Adjective (global) + Noun (language).",
      order: 1
    }
  })

  // Create Reading Sessions for French A1
  console.log('📖 Creating French A1 Reading Sessions...')
  const frenchReadingSession = await prisma.readingSession.upsert({
    where: { id: 'reading-session-french-1' },
    update: {},
    create: {
      id: 'reading-session-french-1',
      title: 'Évolution de la Langue Française',
      sessionType: 'READING_COMPREHENSION',
      languageId: frenchLang.id,
      cefrLevelId: frenchA1.id,
      timeLimit: 30
    }
  })

  // Create French Reading Comprehension Question
  await prisma.readingComprehension.upsert({
    where: { id: 'comp-fr-1' },
    update: {},
    create: {
      id: 'comp-fr-1',
      sessionId: frenchReadingSession.id,
      passage: "La langue française est devenue une langue internationale importante dans la diplomatie, la littérature et la culture. Des millions de personnes dans le monde apprennent le français comme langue étrangère. L'influence de la culture française continue de croître grâce au cinéma, à la musique et à la gastronomie.",
      question: "Qu'est-ce qui contribue à l'importance internationale du français?",
      options: [
        "Le développement des nouvelles technologies",
        "La culture française (cinéma, musique, gastronomie)",
        "Les voyages d'affaires",
        "Les découvertes scientifiques"
      ],
      correctAnswer: 1,
      explanation: "Le passage mentionne que 'L'influence de la culture française continue de croître grâce au cinéma, à la musique et à la gastronomie'.",
      order: 1
    }
  })

  // Create French Reading Rearrange Task
  await prisma.readingRearrange.upsert({
    where: { id: 'rearrange-fr-1' },
    update: {},
    create: {
      id: 'rearrange-fr-1',
      sessionId: frenchReadingSession.id,
      scrambledWords: ["langue", "française", "la", "internationale", "devenue", "est"],
      correctOrder: ["La", "langue", "française", "est", "devenue", "internationale"],
      explanation: "L'ordre grammatical correct est : Article défini (La) + Nom (langue) + Adjectif (française) + Verbe auxiliaire (est) + Participe passé (devenue) + Adjectif (internationale).",
      order: 1
    }
  })

  console.log('✅ Reading sessions and content created for both languages')
  console.log('🎉 Foreign Language Reading seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding foreign language reading data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })