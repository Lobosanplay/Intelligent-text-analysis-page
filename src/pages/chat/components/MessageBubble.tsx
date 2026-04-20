import { FileText, Image, FileAudio, Check, Copy } from "lucide-react";
import type { Message } from "../../../shared/models/messages/messages.model";
import { TranscriptBlock } from "../../../shared/components/TranscriptBlock";
import { useCopy } from "../../../shared/hooks/copyHook";

type Props = {
  message: Message;
};

function getFileIcon(type?: string) {
  if (!type) return <FileText size={14} />;

  if (type.includes("image")) return <Image size={14} />;
  if (type.includes("audio")) return <FileAudio size={14} />;

  return <FileText size={14} />;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const { copy, copied } = useCopy();
  const analysis = message.analysis;
  const document = message.document;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-3 rounded-lg text-sm text-start ${
          isUser
            ? "max-w-[70%] bg-blue-600 text-white"
            : "w-full bg-neutral-800 text-neutral-200"
        }`}
      >
        {isUser && (
          <div className="space-y-2">
            {document && (
              <div className="flex items-center gap-2 bg-blue-500/70 px-2 py-1 rounded">
                {getFileIcon(document.type)}
                <span className="text-xs font-medium truncate">
                  {document.filename}
                </span>
              </div>
            )}

            {message.content && <p>{message.content}</p>}
          </div>
        )}

        {!analysis && !isUser && <span>{message.content}</span>}

        {!isUser && analysis && document && (
          <div className="space-y-2 pt-2 text-xs">
            {document.filename && (
              <div>
                <span className="font-semibold text-neutral-400">Title:</span>
                <p className="font-bold text-lg">{document.filename}</p>
              </div>
            )}
            {message.content?.trim() && (
              <div>
                <span className="font-semibold text-neutral-400">Answer:</span>
                <p className="text-neutral-300">{message.content}</p>
              </div>
            )}

            {analysis.summary && (
              <div>
                <span className="font-semibold text-neutral-400">Summary:</span>
                <p className="text-neutral-300">{analysis.summary}</p>
              </div>
            )}

            {analysis.sentiment && (
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-neutral-400">
                  Sentiment:
                </span>
                <p>
                  {analysis.sentiment.overall === "POSITIVE" && "😊 Positive"}
                  {analysis.sentiment.overall === "NEGATIVE" && "😟 Negative"}
                  {analysis.sentiment.overall === "NEUTRAL" && "😐 Neutral"}
                </p>
                <p className="text-neutral-400 text-[11px]">
                  Positive: {analysis.sentiment.positive_chunks} | Negative:{" "}
                  {analysis.sentiment.negative_chunks}
                </p>
              </div>
            )}

            {analysis.topics && analysis.topics.length > 0 && (
              <div>
                <span className="font-semibold text-neutral-400">
                  key themes:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {analysis.topics
                    .flat()
                    .slice(0, 10)
                    .map((topic, i) => (
                      <span
                        key={i}
                        className="bg-neutral-700 px-2 py-1 rounded text-[11px]"
                      >
                        {topic}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {analysis.transcript && (
              <TranscriptBlock transcript={analysis.transcript} />
            )}

            {(analysis.duration || analysis.language) && (
              <div className="text-neutral-400 text-[11px]">
                {analysis.duration && (
                  <span>Duración: {analysis.duration}s </span>
                )}
                {analysis.language && (
                  <span>• Idioma: {analysis.language}</span>
                )}
              </div>
            )}
          </div>
        )}
        {message.role === "assistant" && analysis && (
          <div className="flex justify-end mt-2">
            <button
              onClick={() => copy(analysis.summary!)}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
