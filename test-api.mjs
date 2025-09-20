// Test the API endpoint
async function testAPI() {
  try {
    console.log('🔍 Testing API endpoint...');

    // Test GET request
    const response = await fetch('http://localhost:3000/api/modules');
    if (!response.ok) {
      console.log('❌ API not responding (make sure Next.js is running)');
      return;
    }

    const data = await response.json();
    console.log(`✅ Found ${data.modules?.length || 0} modules via API:`);
    data.modules?.forEach(module => {
      console.log(`  - Module ${module.id}: ${module.title}`);
    });

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

testAPI();
