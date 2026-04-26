import { FileText, Image, FileAudio, Check, Copy } from "lucide-react";
import type { Message } from "../../../shared/models/messages/messages.model";
import { useCopy } from "../../../shared/hooks/copyHook";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  message: Message;
};

function getFileIcon(type?: string) {
  if (!type) return <FileText size={14} />;
  if (type.includes("image")) return <Image size={14} />;
  if (type.includes("audio")) return <FileAudio size={14} />;
  return <FileText size={14} />;
}

function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
        h1: ({ children }) => (
          <h1 className="text-lg font-semibold mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-base font-semibold mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-semibold mb-1">{children}</h3>
        ),
        ul: ({ children }) => (
          <ul className="list-disc ml-5 mb-2 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal ml-5 mb-2 space-y-1">{children}</ol>
        ),
        li: ({ children }) => <li>{children}</li>,
        code: ({
          inline,
          children,
        }: {
          inline?: boolean;
          children?: React.ReactNode;
        }) =>
          inline ? (
            <code className="bg-neutral-200 text-black px-1 rounded text-xs">
              {children}
            </code>
          ) : (
            <pre className="bg-neutral-900 text-white p-3 rounded-lg overflow-x-auto text-xs mb-3">
              <code>{children}</code>
            </pre>
          ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

function buildMarkdown(message: Message): string {
  const parts: string[] = [];

  if (message.document?.filename)
    parts.push(`# Title: ${message.document.filename}`);

  if (message.content)
    parts.push(`## Answer
${message.content}`);

  if (message.analysis?.summary) {
    parts.push(`## Summary\n${message.analysis.summary}`);
  }

  if (message.analysis?.sentiment) {
    const s = message.analysis.sentiment;
    parts.push(
      `## Sentiment
- Overall: ${s.overall}
- Positive: ${s.positive_chunks}
- Negative: ${s.negative_chunks}`,
    );
  }

  if (message.analysis?.topics?.length) {
    parts.push(
      `## Topics\n${message.analysis.topics
        .flat()
        .map((t) => `- ${t}`)
        .join("\n")}`,
    );
  }

  if (message.analysis?.transcript) {
    parts.push(`## Transcript\n${message.analysis.transcript}`);
  }

  return parts.join("\n\n");
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
            : "w-full bg-transparent text-neutral-200"
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

            {message.content && <Markdown>{message.content}</Markdown>}
          </div>
        )}

        {!analysis && !isUser && message.content && (
          <Markdown>{message.content}</Markdown>
        )}

        {!isUser && analysis && document && (
          <div className="space-y-4 pt-2 text-sm">
            {document.filename && (
              <div>
                <span className="text-neutral-400 text-xs">Title</span>
                <p className="font-semibold text-base">{document.filename}</p>
              </div>
            )}

            {message.content?.trim() && (
              <div>
                <span className="text-neutral-400 text-xs">Answer</span>
                <Markdown>{message.content}</Markdown>
              </div>
            )}

            {analysis.summary && (
              <div>
                <span className="text-neutral-400 text-xs">Summary</span>
                <Markdown>{analysis.summary}</Markdown>
              </div>
            )}

            {analysis.sentiment && (
              <div>
                <span className="text-neutral-400 text-xs">Sentiment</span>
                <Markdown>
                  {`- Overall: ${analysis.sentiment.overall}
- Positive: ${analysis.sentiment.positive_chunks}
- Negative: ${analysis.sentiment.negative_chunks}`}
                </Markdown>
              </div>
            )}

            {analysis.topics && analysis.topics.length > 0 && (
              <div>
                <span className="text-neutral-400 text-xs">Key themes</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysis.topics
                    .flat()
                    .slice(0, 12)
                    .map((topic, i) => (
                      <span
                        key={i}
                        className="bg-neutral-700/70 hover:bg-neutral-600 px-2 py-1 rounded-full text-xs transition"
                      >
                        {topic}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {analysis.transcript && (
              <div>
                <span className="text-neutral-400 text-xs">Transcript</span>
                <Markdown>{analysis.transcript}</Markdown>
              </div>
            )}
          </div>
        )}

        {message.role === "assistant" && analysis && (
          <div className="flex justify-end mt-3">
            <button
              onClick={() => copy(buildMarkdown(message))}
              className="flex items-center gap-1 text-xs text-neutral-500 hover:text-white transition"
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
