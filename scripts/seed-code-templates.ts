import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCodeTemplates() {
  console.log('🎨 Seeding code templates into database...');

  // Get the course ID (assuming we want to add templates to the existing course)
  const course = await prisma.course.findFirst({
    orderBy: { createdAt: 'desc' }
  });

  if (!course) {
    console.error('❌ No course found. Please run migration first: npm run migrate-modules');
    process.exit(1);
  }

  console.log(`📚 Adding templates to course: ${course.title} (${course.id})`);

  const templates = [
    {
      language: 'python',
      code: `# Welcome to Python
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))`,
      description: 'Basic Python template with print statement and function'
    },
    {
      language: 'javascript',
      code: `// Welcome to JavaScript
console.log("Hello, World!");

function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));`,
      description: 'Basic JavaScript template with console.log and template literals'
    },
    {
      language: 'java',
      code: `// Welcome to Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        String result = greet("Developer");
        System.out.println(result);
    }

    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,
      description: 'Basic Java template with main method and string concatenation'
    },
    {
      language: 'c',
      code: `// Welcome to C
#include <stdio.h>

void greet(char* name) {
    printf("Hello, %s!\\n", name);
}

int main() {
    printf("Hello, World!\\n");
    greet("Developer");
    return 0;
}`,
      description: 'Basic C template with printf and function calls'
    },
    {
      language: 'cpp',
      code: `// Welcome to C++
#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << greet("Developer") << std::endl;
    return 0;
}`,
      description: 'Basic C++ template with cout and string operations'
    }
  ];

  try {
    for (const template of templates) {
      const result = await prisma.codeTemplate.upsert({
        where: {
          courseId_language: {
            courseId: course.id,
            language: template.language
          }
        },
        update: template,
        create: {
          ...template,
          courseId: course.id
        }
      });
      console.log(`✅ Created/Updated template for ${result.language}`);
    }

    console.log('\n🎉 Code templates seeded successfully!');
    console.log(`📊 Created ${templates.length} code templates for course: ${course.title}`);

  } catch (error) {
    console.error('❌ Failed to seed code templates:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
seedCodeTemplates()
  .then(() => {
    console.log('✅ Code template seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Code template seeding failed:', error);
    process.exit(1);
  });
