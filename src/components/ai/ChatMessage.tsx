import React from "react";
import { User } from "lucide-react";

// Define the structure of the message object
export type MessageType = {
  type: "user" | "bot" | "answer";
  content: string;
  timestamp: Date;
  imageUrl?: string;
};

interface ChatMessageProps {
  message: MessageType;
}

// Bot icon
const PawPrintIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
    <path d="M11.5 7.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    <path d="M15.5 7.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    <path d="M12 16v-3" />
    <path d="M7.5 10.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
    <path d="M19.5 10.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
  </svg>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { type, content, timestamp, imageUrl } = message;

  const isUser = type === "user";
  const isAnswer = type === "answer";

  const formattedTime = timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex mb-4 ${
        type === "user" ? "justify-end" : "justify-start"
      } animate-fade-in`}
    >
      <div
        className={`max-w-[80%] rounded-xl p-3 ${
          isUser
            ? "bg-primary-500 text-white rounded-tr-none"
            : isAnswer
            ? "bg-yellow-500 text-black"
            : "bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-white rounded-tl-none"
        }`}
      >
        <div className="flex items-start gap-2">
          {!isUser && (
            <div
              className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center text-white shrink-0"
              aria-label="Bot icon"
            >
              <PawPrintIcon size={18} />
            </div>
          )}

          <div className="flex flex-col">
            {imageUrl && isUser && (
              <div className="mb-2 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Uploaded by user"
                  className="max-w-full h-auto"
                />
              </div>
            )}

            <p className="text-sm whitespace-pre-wrap">{content}</p>

            <span
              className={`text-xs mt-1 ${
                isUser || isAnswer
                  ? "text-white text-opacity-70"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {formattedTime}
            </span>
          </div>

          {isUser && (
            <div
              className="w-8 h-8 rounded-full bg-neutral-500 text-white flex items-center justify-center shrink-0"
              aria-label="User icon"
            >
              <User size={18} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
