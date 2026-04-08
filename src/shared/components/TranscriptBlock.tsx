import { useState } from "react";

export function TranscriptBlock({ transcript }: { transcript: string }) {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 250;
  const isLong = transcript.length > MAX_LENGTH;

  const displayText = expanded
    ? transcript
    : transcript.slice(0, MAX_LENGTH) + (isLong ? "..." : "");

  return (
    <div>
      <span className="font-semibold text-neutral-400">Transcripción:</span>

      <p className="text-neutral-300 whitespace-pre-wrap">{displayText}</p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-400 text-xs mt-1 hover:underline"
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}
