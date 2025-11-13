export const contactConfig = {
  hero: {
    title: "Contact Us",
    description: "Get in touch with our team. We're here to help you succeed with your interview preparation."
  },
  contactInfo: {
    title: "Get in Touch",
    description: "Have questions about Mivvo? We're here to help. Reach out to us via email.",
    methods: [
      {
        icon: "Mail",
        title: "Email Us",
        description: "Send us an email and we'll respond as soon as possible.",
        contact: "hello@mivvo.com",
        action: "mailto:hello@mivvo.com"
      }
    ]
  },
  form: {
    title: "Send us a message",
    description: "Fill out the form below and we'll get back to you as soon as possible.",
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
