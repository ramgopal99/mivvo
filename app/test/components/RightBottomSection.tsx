"use client";

interface RightBottomSectionProps {
  consoleOutput: string;
}

const RightBottomSection = ({ consoleOutput }: RightBottomSectionProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-3 bg-white border text-slate-800 text-xs font-mono overflow-auto">
        {consoleOutput ? (
          <pre className="whitespace-pre-wrap leading-relaxed">{consoleOutput}</pre>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-slate-500 italic text-center">
              Click &quot;Run Code&quot; to see output here...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightBottomSection;
