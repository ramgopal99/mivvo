// Quick test to verify module structure
import fs from 'fs';
import path from 'path';

async function testModules() {
  try {
    console.log('🔍 Testing module directory structure...');

    const modulesPath = path.join(process.cwd(), 'app', 'test', 'modules');
    console.log(`Looking in: ${modulesPath}`);

    if (!fs.existsSync(modulesPath)) {
      console.log('❌ Modules directory not found!');
      return;
    }

    const moduleDirs = fs.readdirSync(modulesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort();

    console.log(`✅ Found ${moduleDirs.length} module directories: ${moduleDirs.join(', ')}`);

    // Check each module
    for (const moduleDir of moduleDirs) {
      const modulePath = path.join(modulesPath, moduleDir);
      console.log(`\n📁 Module: ${moduleDir}`);

      // Check module-info.ts
      const moduleInfoPath = path.join(modulePath, 'module-info.ts');
      if (fs.existsSync(moduleInfoPath)) {
        console.log(`  ✅ module-info.ts exists`);
      } else {
        console.log(`  ❌ module-info.ts missing`);
      }

      // Check topics
      const topicsPath = path.join(modulePath, 'topics');
      if (fs.existsSync(topicsPath)) {
        const topicFiles = fs.readdirSync(topicsPath)
          .filter(file => file.endsWith('.ts') && file.startsWith('topic-'));
        console.log(`  ✅ topics/ (${topicFiles.length} files): ${topicFiles.join(', ')}`);
      } else {
        console.log(`  ❌ topics/ directory missing`);
      }

      // Check exercises
      const exercisesPath = path.join(modulePath, 'exercises');
      if (fs.existsSync(exercisesPath)) {
        const exerciseFiles = fs.readdirSync(exercisesPath)
          .filter(file => file.endsWith('.ts') && file.startsWith('exercise-'));
        console.log(`  ✅ exercises/ (${exerciseFiles.length} files): ${exerciseFiles.join(', ')}`);
      } else {
        console.log(`  ❌ exercises/ directory missing`);
      }
    }

    // Check if Module 3 exists
    const module3Path = path.join(modulesPath, 'module3');
    if (fs.existsSync(module3Path)) {
      console.log('\n🎉 Module 3 directory found and should be automatically loaded!');
    } else {
      console.log('\n❌ Module 3 directory not found');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testModules();
