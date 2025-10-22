
import { GoogleGenAI, Type } from "@google/genai";
import { AdviceResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const adviceSchema = {
  type: Type.OBJECT,
  properties: {
    project_overview: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        summary: { type: Type.STRING },
        bullet_points: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['title', 'summary', 'bullet_points'],
    },
    frontend_analysis: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        summary: { type: Type.STRING },
        bullet_points: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['title', 'summary', 'bullet_points'],
    },
    backend_analysis: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        summary: { type: Type.STRING },
        bullet_points: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['title', 'summary', 'bullet_points'],
    },
    ai_use_cases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          implementation_idea: { type: Type.STRING },
        },
        required: ['name', 'description', 'implementation_idea'],
      },
    },
  },
  required: ['project_overview', 'frontend_analysis', 'backend_analysis', 'ai_use_cases'],
};

export const getTechAdvice = async (projectDescription: string): Promise<AdviceResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: projectDescription,
      config: {
        systemInstruction: `You are an expert tech consultant and startup advisor for a company that builds mobile apps.
A user will describe their app idea and desired tech stack. Your goal is to provide structured, actionable advice on how to proceed.
Analyze their stack (Frontend, Backend), suggest relevant and innovative AI-powered business use cases, and outline a high-level project plan.
Format your response strictly as JSON based on the provided schema.
The tone should be professional, encouraging, and highly informative.`,
        responseMimeType: "application/json",
        responseSchema: adviceSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    return parsedResponse as AdviceResponse;
  } catch (error) {
    console.error("Error getting tech advice from Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get advice from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching AI advice.");
  }
};
