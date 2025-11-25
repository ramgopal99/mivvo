/**
 * Job Description Templates
 *
 * Pre-defined job description templates for different interview types
 */

export const JD_TEMPLATES = {
  technical: {
    python: `Python Developer Position

We are looking for a skilled Python Developer to join our development team. You will be responsible for designing, developing, and maintaining Python-based applications and systems.

Key Responsibilities:
- Design and develop Python applications and scripts
- Work with Django, Flask, or FastAPI frameworks
- Implement data processing and automation solutions
- Build RESTful APIs and web applications
- Collaborate on data analysis and visualization projects
- Optimize Python code performance
- Stay updated with Python ecosystem and best practices

Requirements:
- 2-5 years of experience in Python development
- Proficiency in Python frameworks (Django, Flask, FastAPI)
- Experience with data processing and analysis libraries
- Knowledge of RESTful APIs and web development
- Familiarity with database technologies (PostgreSQL, MongoDB)
- Understanding of testing frameworks (pytest, unittest)
- Experience with version control and CI/CD pipelines`
  },

  general: {
    upse: `UPSE Civil Service Position

We are recruiting for civil service positions through the Union Public Service Commission (UPSE). This role involves administrative responsibilities in the Indian civil service, focusing on governance, policy implementation, and public service.

Key Responsibilities:
- Administrative decision-making and policy implementation
- Governance and public administration
- Rural development and welfare programs
- Crisis management and emergency response
- Policy analysis and strategic planning
- Public service delivery and accountability

Requirements:
- Knowledge of Indian Constitution and polity
- Understanding of public administration principles
- Analytical and decision-making skills
- Ethical framework and integrity
- Communication and leadership abilities
- Commitment to public service`
  },

  hr: {
    behavioral: `HR Management Position

We are seeking an experienced HR professional to join our team. This role focuses on talent management, employee relations, and organizational development.

Key Responsibilities:
- Talent acquisition and recruitment
- Employee relations and conflict resolution
- Performance management and development
- HR policy development and implementation
- Training and organizational development
- Employee engagement initiatives

Requirements:
- 3-5 years of HR experience
- Strong interpersonal and communication skills
- Knowledge of labor laws and HR best practices
- Problem-solving and conflict resolution abilities
- Leadership and team management skills
- Understanding of organizational behavior`
  }
}

export const getJDTemplate = (
  interviewType: string,
  subType?: string
): string => {
  if (interviewType === 'Technical' && subType === 'python-developer') {
    return JD_TEMPLATES.technical.python
  } else if (interviewType === 'General' && subType === 'UPSE') {
    return JD_TEMPLATES.general.upse
  } else if (interviewType === 'HR' && subType === 'Behavioral') {
    return JD_TEMPLATES.hr.behavioral
  }

  // No default templates - only return available templates
  return ''
}
