/**
 * Test college admin login
 */

async function testCollegeAdminLogin() {
  console.log('Testing college admin login...')

  try {
    const response = await fetch('http://localhost:3000/api/auth/college-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collegeId: 'demo',
        password: 'college123'
      }),
    })

    const data = await response.json()

    if (response.ok && data.success) {
      console.log('✅ College admin login successful!')
      console.log('User:', data.data.user.name)
      console.log('Role:', data.data.user.role)
      console.log('College Admin ID:', data.data.user.collegeAdminId)
    } else {
      console.log('❌ College admin login failed:', data.error)
    }
  } catch (error) {
    console.log('❌ Error testing login:', error.message)
  }
}

// Run the test
testCollegeAdminLogin()
