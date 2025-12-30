import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkFormulas() {
  try {
    const count = await prisma.courseFormula.count();
    console.log('Total formulas in DB:', count);

    if (count > 0) {
      const sample = await prisma.courseFormula.findFirst();
      console.log('Sample formula:', JSON.stringify(sample, null, 2));

      // Get aptitude modules first
      const aptitudeModules = await prisma.courseModule.findMany({
        where: { courseId: 'aptitude' },
        select: { id: true, title: true }
      });

      console.log('Aptitude modules:', aptitudeModules.length);

      // Count formulas per aptitude module
      const aptitudeModuleIds = aptitudeModules.map(m => m.id);
      const aptitudeFormulas = await prisma.courseFormula.count({
        where: {
          courseModuleId: { in: aptitudeModuleIds }
        }
      });

      console.log('Total aptitude formulas:', aptitudeFormulas);
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error('Error checking formulas:', error);
  }
}

checkFormulas();
