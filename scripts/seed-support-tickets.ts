import { PrismaClient, SupportTicketCategory, SupportTicketPriority, SupportTicketStatus } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seedSupportTickets() {
  try {
    console.log('🌱 Seeding support tickets...')

    // Get the first user (you can modify this to target specific users)
    const user = await prisma.user.findFirst()

    if (!user) {
      console.log('❌ No users found. Please create a user first.')
      return
    }

    console.log(`📝 Creating support tickets for user: ${user.email}`)

    // Create some pending tickets
    const pendingTickets = [
      {
        ticketId: 'SUP-20241105-001',
        subject: 'Interview analysis not loading',
        category: SupportTicketCategory.TECHNICAL_ISSUE,
        priority: SupportTicketPriority.HIGH,
        description: 'The interview analysis page is not loading properly after completing an interview. The page shows a loading spinner indefinitely.',
        status: SupportTicketStatus.PENDING,
      },
      {
        ticketId: 'SUP-20241104-002',
        subject: 'Billing question about subscription',
        category: SupportTicketCategory.BILLING_PAYMENT,
        priority: SupportTicketPriority.MEDIUM,
        description: 'Need clarification on the difference between Basic and Pro plans. Also wondering about the billing cycle and payment methods.',
        status: SupportTicketStatus.PENDING,
      }
    ]

    // Create some completed tickets with replies
    const completedTickets = [
      {
        ticketId: 'SUP-20241102-003',
        subject: 'Password reset issue',
        category: SupportTicketCategory.ACCOUNT_PROFILE,
        priority: SupportTicketPriority.LOW,
        description: 'Unable to reset password using the forgot password link. The email never arrived in my inbox.',
        status: SupportTicketStatus.COMPLETED,
        resolution: 'Issue was resolved by clearing browser cache and cookies. Password reset functionality is now working properly.',
        reply: {
          subject: 'Re: Password reset issue',
          message: 'Hello! Thank you for reaching out about the password reset issue. I\'ve investigated this and found that the problem was caused by browser cache conflicts.\n\nHere\'s what you need to do:\n\n1. Clear your browser cache and cookies\n2. Try the password reset again\n3. If you still have issues, try using an incognito/private browsing window\n\nThis should resolve the issue. The password reset functionality is working correctly on our end. Let me know if you need any further assistance!',
          from: 'Support Team',
        }
      },
      {
        ticketId: 'SUP-20241101-004',
        subject: 'Interview scheduling feature request',
        category: SupportTicketCategory.FEATURE_REQUEST,
        priority: SupportTicketPriority.MEDIUM,
        description: 'Request for calendar integration to schedule interviews at specific times.',
        status: SupportTicketStatus.COMPLETED,
        resolution: 'Feature request has been noted and added to our development roadmap. We\'ll implement calendar integration in the next major release.',
        reply: {
          subject: 'Re: Interview scheduling feature request',
          message: 'Hi there! Thank you for your suggestion about calendar integration for interview scheduling. This is actually a great idea that we\'ve heard from several users.\n\nI\'ve added this to our development roadmap for the next major release. We\'re planning to integrate with popular calendar services like Google Calendar, Outlook, and Apple Calendar.\n\nIn the meantime, you can use external calendar tools to schedule your interviews and just use our platform for the actual interview sessions.\n\nWe\'ll keep you updated on our progress. Thanks for helping us improve the platform!',
          from: 'Product Team',
        }
      }
    ]

    // Insert pending tickets
    for (const ticket of pendingTickets) {
      const createdTicket = await prisma.supportTicket.create({
        data: {
          ...ticket,
          userId: user.id,
        },
      })
      console.log(`✅ Created pending ticket: ${createdTicket.ticketId}`)
    }

    // Insert completed tickets with replies
    for (const ticket of completedTickets) {
      const createdTicket = await prisma.supportTicket.create({
        data: {
          ticketId: ticket.ticketId,
          subject: ticket.subject,
          category: ticket.category,
          priority: ticket.priority,
          status: ticket.status,
          description: ticket.description,
          resolution: ticket.resolution,
          userId: user.id,
        },
      })

      // Create reply for completed ticket
      await prisma.ticketReply.create({
        data: {
          subject: ticket.reply.subject,
          message: ticket.reply.message,
          from: ticket.reply.from,
          ticketId: createdTicket.id,
        },
      })

      console.log(`✅ Created completed ticket with reply: ${createdTicket.ticketId}`)
    }

    console.log('🎉 Support tickets seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding support tickets:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
seedSupportTickets()






