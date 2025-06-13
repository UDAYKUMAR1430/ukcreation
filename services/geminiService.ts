
import { GoogleGenAI } from "@google/genai";
import { GeminiServiceResponse } from '../types';

// API_KEY is expected to be set in the environment (e.g., process.env.API_KEY)
// For browser-only environments with import maps, process.env might not be available or populated.
// The application must handle this gracefully.
// @ts-ignore
const API_KEY = typeof process !== 'undefined' && process.env && process.env.API_KEY ? process.env.API_KEY : undefined;


export const fetchGeminiInsights = async (
  prompt: string,
  expectedPoints: number = 5
): Promise<GeminiServiceResponse> => {
  if (!API_KEY) {
    return { error: "API Key is not configured. Please contact the administrator." };
  }

  if (typeof GoogleGenAI === 'undefined') {
    console.error("GoogleGenAI class is not available. Check import from @google/genai.");
    return { error: "Gemini API client is not available. Please contact support." };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      // No thinkingConfig, defaults to enabled for higher quality.
    });

    const textResponse = result.text;

    if (typeof textResponse !== 'string') {
      console.error("Unexpected response format from Gemini API:", result);
      return { error: "Received an unexpected response format from the AI. Please try again." };
    }

    const bulletPoints = textResponse.split(/\r?\n/).map(bp => bp.trim()).filter(bp => bp.length > 0);

    if (bulletPoints.length > 0) {
      return { data: bulletPoints.slice(0, expectedPoints) };
    } else {
      return { error: "Could not generate insights. The response was empty or in an unexpected format." };
    }
  } catch (err: any) {
    console.error("Error fetching insights from Gemini:", err);
    let errorMessage = "Failed to generate insights. Please try again or contact support if the issue persists.";
    if (err instanceof Error) {
      errorMessage = `Failed to generate insights: ${err.message}. Please try again or contact support.`;
    }
    return { error: errorMessage };
  }
};