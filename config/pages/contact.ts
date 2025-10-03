export const contactConfig = {
  hero: {
    title: "Contact Us",
    description: "Get in touch with our team. We're here to help you succeed with your interview preparation."
  },
  contactInfo: {
    title: "Get in Touch",
    description: "Have questions about Mivvo? We're here to help. Reach out to us through any of the channels below.",
    methods: [
      {
        icon: "Mail",
        title: "Email Us",
        description: "Send us an email and we'll respond within 24 hours.",
        contact: "support@mivvo.com",
        action: "mailto:support@mivvo.com"
      },
      {
        icon: "Phone",
        title: "Call Us",
        description: "Speak directly with our support team.",
        contact: "+1 (555) 123-4567",
        action: "tel:+15551234567"
      },
      {
        icon: "MapPin",
        title: "Visit Us",
        description: "Come say hello at our office.",
        contact: "123 Innovation Drive\nTech City, TC 12345",
        action: "#"
      },
      {
        icon: "Clock",
        title: "Business Hours",
        description: "When you can reach us.",
        contact: "Mon-Fri: 9AM-6PM PST\nSat-Sun: 10AM-4PM PST",
        action: "#"
      }
    ]
  },
  form: {
    title: "Send us a message",
    description: "Fill out the form below and we'll get back to you within 24 hours.",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        required: true,
        grid: "md:col-span-1"
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        required: true,
        grid: "md:col-span-1"
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
        grid: "md:col-span-2"
      },
      {
        name: "subject",
        label: "Subject",
        type: "select",
        placeholder: "Select a subject",
        required: true,
        options: [
          "General Inquiry",
          "Technical Support",
          "Billing Question",
          "Partnership",
          "Media Inquiry",
          "Other"
        ],
        grid: "md:col-span-2"
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Tell us how we can help you...",
        required: true,
        grid: "md:col-span-2"
      }
    ],
    submitButton: {
      text: "Send Message",
      icon: "Send"
    }
  }
}
