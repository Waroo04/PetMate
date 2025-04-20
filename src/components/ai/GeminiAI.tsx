import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, Image, X } from "lucide-react";
import ChatMessage, { MessageType } from "./ChatMessage";
import Button from "../common/Button";
import axios from "axios";

function GeminiAI() {
  const [chatHistory, setChatHistory] = useState<MessageType[]>([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: MessageType = {
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
      imageUrl: imagePreviewUrl || undefined,
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setInput("");

    generateAnswer(input.trim());
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const generateAnswer = async (userInput: string) => {
    setGeneratingAnswer(true);

    try {
      const parts: any[] = [];

      if (userInput) {
        parts.push({ text: userInput });
      }

      if (selectedImage) {
        const base64 = await convertFileToBase64(selectedImage);
        const mimeType = selectedImage.type;

        parts.push({
          inlineData: {
            mimeType,
            data: base64.split(",")[1],
          },
        });
      }

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts }],
        },
      });

      type GeminiResponse = {
        candidates?: {
          content?: {
            parts?: {
              text?: string;
            }[];
          };
        }[];
      };

      const extractTextFromGemini = (data: GeminiResponse): string => {
        return (
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response received."
        );
      };

      const data = response.data as GeminiResponse;
      const aiResponse = extractTextFromGemini(data);

      const botMessage: MessageType = {
        type: "answer",
        content: aiResponse,
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "answer",
          content: "Sorry - Something went wrong. Please try again!",
          timestamp: new Date(),
        },
      ]);
    }

    setGeneratingAnswer(false);
    removeImage();
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-180px)] md:max-h-[calc(100vh-140px)]">
      <div className="flex-grow overflow-y-auto p-4" ref={chatContainerRef}>
        <div className="max-w-3xl mx-auto">
          {chatHistory.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-4">
        <div className="max-w-3xl mx-auto">
          {imagePreviewUrl && (
            <div className="relative inline-block mb-2">
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="h-20 w-auto rounded-md object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-neutral-800 dark:bg-neutral-700 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={handleImageClick}
              className="p-2 text-neutral-500 hover:text-primary-500 transition-colors"
            >
              <Image size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              className="flex-grow p-2 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 dark:bg-neutral-700 dark:text-white resize-none"
              rows={1}
              disabled={generatingAnswer}
            />

            <Button
              onClick={handleSend}
              disabled={generatingAnswer || (!input.trim() && !selectedImage)}
              icon={<SendHorizontal size={18} />}
              variant={generatingAnswer ? "outline" : "primary"}
            >
              {generatingAnswer ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeminiAI;
