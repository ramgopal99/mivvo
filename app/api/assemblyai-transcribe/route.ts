// Start by making sure the `assemblyai` and `node-record-lpcm16` packages are installed.
// If not, you can install it by running the following command:
// npm install assemblyai node-record-lpcm16

import { AssemblyAI } from "assemblyai";
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Global transcriber instance for the session
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let globalTranscriber: any = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let currentTranscript = '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request) {
  try {
    const client = new AssemblyAI({
      // Replace with your chosen API key
      apiKey: process.env.ASSEMBLYAI_API_KEY || "dc1853a2ab084b188703bde7a8ee6ed4",
    });

    const CONNECTION_PARAMS = {
      sampleRate: 16000,
      formatTurns: true,
      endOfTurnConfidenceThreshold: 0.7,
      minEndOfTurnSilenceWhenConfident: 160,
      maxTurnSilence: 2400,
      keytermsPrompt: [],
      language: "en"
    }

    // Initialize transcriber if not already done
    if (!globalTranscriber) {
      globalTranscriber = client.streaming.transcriber(CONNECTION_PARAMS);

      globalTranscriber.on("open", ({ id }: { id: string }) => {
        console.log(`Session opened with ID: ${id}`);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      globalTranscriber.on("error", (error: any) => {
        console.error("Transcription error:", error);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      globalTranscriber.on("close", (code: any, reason: any) =>
        console.log("Session closed:", code, reason)
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      globalTranscriber.on("turn", (turn: any) => {
        if (turn.transcript && turn.transcript.trim()) {
          currentTranscript += ' ' + turn.transcript;
          console.log("Turn:", turn.transcript);
        }
      });

      // Connect to the streaming service
      await globalTranscriber.connect();
    }

    return NextResponse.json({
      message: "AssemblyAI transcription service initialized",
      status: "ready",
      connectionParams: CONNECTION_PARAMS
    });

  } catch (error) {
    console.error("Error initializing AssemblyAI:", error);
    return NextResponse.json(
      { error: "Failed to initialize transcription service" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_API_KEY || "dc1853a2ab084b188703bde7a8ee6ed4",
    });

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Convert audio file to buffer
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());

    // Create a temporary file for the audio
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `audio-chunk-${Date.now()}.webm`);

    // Write audio buffer to temporary file
    fs.writeFileSync(tempFilePath, audioBuffer);

    try {
      // Upload the audio file to AssemblyAI
      const uploadResponse = await client.files.upload(tempFilePath);

      // Start transcription
      const transcriptResponse = await client.transcripts.transcribe({
        audio: uploadResponse,
        language_code: 'en',
        punctuate: true,
        format_text: true,
        speaker_labels: false,
      });

      // Wait for transcription to complete
      const transcript = await client.transcripts.get(transcriptResponse.id);

      // Clean up temporary file
      fs.unlinkSync(tempFilePath);

      return NextResponse.json({
        transcript: transcript.text || '',
        confidence: transcript.confidence,
        timestamp: new Date().toISOString()
      });

    } catch (transcriptionError) {
      // Clean up temporary file even if transcription fails
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      throw transcriptionError;
    }

  } catch (error) {
    console.error("Error processing audio chunk:", error);
    return NextResponse.json(
      { error: "Failed to process audio chunk" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(_request: Request) {
  try {
    if (globalTranscriber) {
      await globalTranscriber.close();
      globalTranscriber = null;
      currentTranscript = '';
    }

    return NextResponse.json({
      message: "Transcription session closed",
      status: "disconnected"
    });

  } catch (error) {
    console.error("Error closing transcription session:", error);
    return NextResponse.json(
      { error: "Failed to close transcription session" },
      { status: 500 }
    );
  }
}
