// Quick test to verify module loading
import { loadModules } from './app/test/loaders/moduleLoader.js';

async function testModules() {
  try {
    console.log('🔍 Testing module loading...');
    const modules = await loadModules();

    console.log(`✅ Found ${modules.length} modules:`);
    modules.forEach(module => {
      console.log(`  - Module ${module.id}: ${module.title} (${module.subLessons.length} topics, ${module.exercises.length} exercises)`);
    });

    // Check if Module 3 was loaded
    const module3 = modules.find(m => m.id === 3);
    if (module3) {
      console.log('\n🎉 Module 3 was automatically loaded!');
      console.log(`   Title: ${module3.title}`);
      console.log(`   Topics: ${module3.subLessons.map(t => t.title).join(', ')}`);
      console.log(`   Exercises: ${module3.exercises.map(e => e.title).join(', ')}`);
    } else {
      console.log('\n❌ Module 3 was not found');
    }

  } catch (error) {
    console.error('❌ Error loading modules:', error.message);
    console.error('Stack:', error.stack);
  }
}

testModules();
