import React from "react";
import GeminiAI from "../components/ai/GeminiAI";

const AIPage: React.FC = () => {
  return (
    <div className="h-full max-h-[calc(100vh-180px)] md:max-h-[calc(100vh-140px)]">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-nunito font-bold text-neutral-800 dark:text-white">
          PetMate AI Assistant
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 font-open-sans">
          Ask me anything about pet care and health
        </p>
      </div>

      <GeminiAI />
    </div>
  );
};

export default AIPage;
