const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing courses API...');

    // Test courses list
    const coursesResponse = await fetch('http://localhost:3001/api/courses');
    if (coursesResponse.ok) {
      const courses = await coursesResponse.json();
      console.log('Courses:', courses.length);
      console.log('First course:', JSON.stringify(courses[0], null, 2));
    } else {
      console.log('Courses API failed:', coursesResponse.status);
    }

    // Test specific course
    const courseResponse = await fetch('http://localhost:3001/api/courses/python');
    if (courseResponse.ok) {
      const course = await courseResponse.json();
      console.log('Python course modules:', course.modules?.length || 0);
      console.log('First module exercises:', course.modules?.[0]?.exercises?.length || 0);
      console.log('First exercise MCQ questions:', course.modules?.[0]?.exercises?.[0]?.mcqQuestions?.length || 0);
    } else {
      console.log('Course API failed:', courseResponse.status);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
