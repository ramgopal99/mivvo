"use server";

import { VapiClient } from "@vapi-ai/server-sdk";
import { prisma } from "@/lib/prisma";

const PRIVATE_API_KEY = process.env.VAPI_API_KEY!;

interface CreateVapiMockInterviewParams {
  mockInterviewId: string;
  voiceId: "Harry" | "Hana" | "Rohan" | "Neha" | "Elliot" | "Paige" | "Lily" | "Cole" | "Kylie" | "Savannah" | "Spencer";
  voiceProvider: "vapi";
  customInstructions?: string;
}

export interface CreateVapiMockInterviewResponse {
  success: boolean;
  assistantId?: string;
  error?: string;
}

export async function createVapiMockInterviewInternal(params: CreateVapiMockInterviewParams): Promise<CreateVapiMockInterviewResponse> {
  try {
    const { mockInterviewId, voiceId, voiceProvider, customInstructions } = params;

    const mockInterview = await prisma.mockInterview.findUnique({
      where: { id: mockInterviewId }
    });

    if (!mockInterview) {
      throw new Error("Mock interview not found");
    }

    if (!PRIVATE_API_KEY) {
      throw new Error("VAPI API key not configured. Please set VAPI_API_KEY environment variable.");
    }

    const vapi = new VapiClient({
      token: PRIVATE_API_KEY
    });

    console.log('✅ VAPI client initialized for mock interview creation');
    const systemPrompt = `You are interviewing for ${mockInterview.position} at ${mockInterview.companyName}.

Context: ${mockInterview.interviewType} interview for ${mockInterview.experienceLevel} level in ${mockInterview.industry}.

Company: ${mockInterview.companyDescription?.slice(0, 100) || "Tech company"}

Job: ${mockInterview.jobDescription?.slice(0, 100) || "Software development role"}

IMPORTANT: Keep ALL responses under 100 words. Ask only 1 question per response. Give feedback in 1 sentence only. Be direct and concise.${customInstructions ? ` Instructions: ${customInstructions}` : ""}`;

    const companyName = mockInterview.companyName?.slice(0, 15) || "Company";
    const position = mockInterview.position?.slice(0, 15) || "Position";
    const assistantName = `Mock: ${companyName} - ${position}`;
    const finalName = assistantName.length > 40 ? assistantName.slice(0, 37) + "..." : assistantName;

    const assistant = await vapi.assistants.create({
      name: finalName,
      firstMessage: `Hi! Interviewing for ${mockInterview.position} at ${mockInterview.companyName}. I'll ask questions and give brief feedback. Ready?`,
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        temperature: 0.3,
        maxTokens: 150,
        messages: [{
          role: "system",
          content: systemPrompt
        }]
      },
      voice: {
        provider: "vapi",
        voiceId: voiceId
      },

    });

    console.log(`✅ VAPI assistant created successfully for interview: ${finalName}`)
    console.log(`Assistant ID: ${assistant.id}`)
    console.log(`Voice: ${voiceId} (${voiceProvider})`)

    return {
      success: true,
      assistantId: assistant.id
    };

  } catch (error) {
    console.error("❌ Error creating VAPI mock interview assistant:", error);

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return {
          success: false,
          error: "VAPI service not configured. Please check your API key."
        };
      }
      if (error.message.includes("rate limit")) {
        return {
          success: false,
          error: "VAPI rate limit exceeded. Please try again later."
        };
      }
      if (error.message.includes("quota")) {
        return {
          success: false,
          error: "VAPI quota exceeded. Please check your account."
        };
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create VAPI assistant"
    };
  }
}

export async function createVapiMockInterview(params: CreateVapiMockInterviewParams): Promise<CreateVapiMockInterviewResponse> {
  return createVapiMockInterviewInternal(params)
}

export async function deleteVapiMockInterviewInternal(assistantId: string): Promise<CreateVapiMockInterviewResponse> {
  try {
    if (!PRIVATE_API_KEY) {
      throw new Error("VAPI API key not configured. Please set VAPI_API_KEY environment variable.");
    }

    const vapi = new VapiClient({
      token: PRIVATE_API_KEY
    });

    await vapi.assistants.delete(assistantId);

    console.log(`✅ VAPI assistant deleted successfully: ${assistantId}`)

    return {
      success: true,
      assistantId: assistantId
    }

  } catch (error) {
    console.error("❌ Error deleting VAPI mock interview assistant:", error);

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return {
          success: false,
          error: "VAPI service not configured. Please check your API key."
        };
      }
      if (error.message.includes("not found")) {
        return {
          success: false,
          error: "VAPI assistant not found."
        };
      }
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete VAPI assistant"
    }
  }
}

export async function deleteVapiMockInterview(assistantId: string): Promise<CreateVapiMockInterviewResponse> {
  return deleteVapiMockInterviewInternal(assistantId)
}
