"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ExecutionResult {
  output: string;
  error?: string;
  language?: string;
  executionTime?: number;
  memoryUsage?: number;
  exitCode?: number;
}

interface ConsoleOutputProps {
  consoleOutput: string;
}

const ConsoleOutput = ({ consoleOutput }: ConsoleOutputProps) => {
  // Try to parse the consoleOutput as JSON (API response)
  let parsedResult: ExecutionResult | null = null;
  let isJsonResponse = false;

  if (consoleOutput && consoleOutput.trim().startsWith('{') && consoleOutput.trim().endsWith('}')) {
    try {
      parsedResult = JSON.parse(consoleOutput);
      isJsonResponse = true;
    } catch {
      // If it's not valid JSON, treat it as plain text
      parsedResult = null;
      isJsonResponse = false;
    }
  }

  return (
    <div className="h-full flex flex-col min-h-0">
      {consoleOutput ? (
        isJsonResponse && parsedResult ? (
          // Display structured API response with tabs
          <Tabs defaultValue="output" className="flex-1 flex flex-col min-h-0">
            <div className="flex-shrink-0 px-3 pt-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="output" className="text-foreground cursor-pointer">Output</TabsTrigger>
                <TabsTrigger value="details" className="text-foreground cursor-pointer">Execution Details</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="output" className="flex-1 min-h-0 p-3 bg-background border border-border text-foreground text-xs font-mono overflow-y-auto overflow-x-auto mt-0">
              <div className="space-y-3">
                {/* Output Section */}
                <div>
                  <div className="text-green-600 font-semibold mb-1">Output:</div>
                  <div className="bg-muted/50 p-2 rounded border overflow-x-auto">
                    <pre className="whitespace-pre-wrap leading-relaxed text-green-700 break-words">
                      {parsedResult.output || 'No output'}
                    </pre>
                  </div>
                </div>

                {/* Error Section (if any) */}
                {parsedResult.error && (
                  <div>
                    <div className="text-red-600 font-semibold mb-1">Error:</div>
                    <div className="bg-red-50 p-2 rounded border overflow-x-auto">
                      <pre className="whitespace-pre-wrap leading-relaxed text-red-700 break-words">
                        {parsedResult.error}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="details" className="flex-1 min-h-0 p-3 bg-background border border-border text-foreground text-xs font-mono overflow-y-auto overflow-x-auto mt-0">
              <div className="space-y-3">
                <div className="text-blue-600 font-semibold mb-3">Execution Details:</div>
                <div className="grid grid-cols-2 gap-3">
                  {parsedResult.language && (
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="font-medium capitalize">{parsedResult.language}</span>
                    </div>
                  )}
                  {parsedResult.executionTime !== undefined && (
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-muted-foreground">Execution Time:</span>
                      <span className="font-medium">{parsedResult.executionTime}ms</span>
                    </div>
                  )}
                  {parsedResult.memoryUsage !== undefined && (
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-muted-foreground">Memory Usage:</span>
                      <span className="font-medium">{Math.round(parsedResult.memoryUsage / 1024)}KB</span>
                    </div>
                  )}
                  {parsedResult.exitCode !== undefined && (
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-muted-foreground">Exit Code:</span>
                      <span className={`font-medium ${parsedResult.exitCode === 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parsedResult.exitCode}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          // Display plain text (fallback)
          <div className="flex-1 min-h-0 p-3 bg-background border border-border text-foreground text-xs font-mono overflow-y-auto overflow-x-auto">
            <pre className="whitespace-pre-wrap leading-relaxed break-words">{consoleOutput}</pre>
          </div>
        )
      ) : (
        <div className="flex-1 flex items-center justify-center p-3">
          <div className="text-muted-foreground italic text-center">
            Click &quot;Run Code&quot; to see output here...
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsoleOutput;