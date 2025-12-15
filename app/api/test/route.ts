import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.log('Test API called');
  return NextResponse.json({
    success: true,
    message: "API is working",
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: NextRequest) {
  console.log('Test API POST called');
  try {
    const body = await req.json();
    console.log('Request body:', body);
    return NextResponse.json({
      success: true,
      message: "API POST is working",
      received: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({
      error: "Test API failed",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
