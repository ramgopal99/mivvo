import { NextResponse } from "next/server";

interface RunRequest {
    code: string;
    language: string;
}

export async function POST(request: Request) {
    const body: RunRequest = await request.json();
    const { code, language } = body;

    try {

        if (!code || !language) {
            return NextResponse.json(
                { error: "Code and language are required" },
                { status: 400 }
            );
        }


        // Execute the code
        const result = await executeCode(code, language);


        // Format the response
        const response = {
            output: result.output,
            language: language,
            executionTime: result.metrics.cpu_time || 0,
            memoryUsage: result.metrics.memory || 0,
            exitCode: result.metrics.exit_code || 0
        };

        return NextResponse.json(response, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });

    } catch (_error) {
        return NextResponse.json(
            {
                output: "",
                error: _error instanceof Error ? _error.message : String(_error),
                language: language,
                executionTime: 0,
                memoryUsage: 0,
                exitCode: 1
            },
            {
                status: 200, // Return 200 so the frontend can display the error nicely
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            }
        );
    }
}

// Helper function to execute code using Piston API
async function executeCode(code: string, language: string) {
    const API_URL = process.env.NEXT_PUBLIC_PISTON_API_URL || "https://api.mockopedia.com/api/v2";
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const executeUrl = `${baseUrl}/execute`;

    // Map language to correct version
    const languageVersions: { [key: string]: string } = {
        "python": "3.12.0",
        "javascript": "20.11.1",
        "java": "15.0.2",
        "c++": "10.2.0"
    };

    const requestBody = {
        language: language.toLowerCase(),
        version: languageVersions[language.toLowerCase()] || "*",
        files: [{
            content: code
        }]
    };


    const response = await fetch(executeUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error("Failed to execute code");
    }

    const result = await response.json();

    // Handle timeout errors
    if (result.run.status === 'TO' || result.run.message?.includes('Time limit exceeded')) {
        throw new Error('Code execution timed out. Please try simpler code or avoid infinite loops.');
    }

    // Handle other runtime errors
    if (result.run.status && result.run.status !== 'success') {
        throw new Error(`Runtime error: ${result.run.status}`);
    }

    if (result.run.stderr) {
        // Clean up error message for better readability
        const errorMessage = result.run.stderr
            .replace(/File "<string>", line \d+\n/, '') // Remove Python file reference
            .replace(/^\s+at\s+/gm, '') // Remove JavaScript stack trace
            .trim();
        throw new Error(errorMessage);
    }

    // Return the raw output as-is
    const output = result.run.stdout.trim();

    return {
        output: output,
        metrics: {
            memory: result.run.memory || 0,
            cpu_time: result.run.cpu_time || 0,
            wall_time: result.run.wall_time || 0,
            exit_code: result.run.code || 0
        }
    };
}

