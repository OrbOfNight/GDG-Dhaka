
import { GoogleGenAI, Type } from "@google/genai";
import type { EmailData, FilterResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    classification: {
      type: Type.STRING,
      description: "The category of the email. Must be 'Spam', 'Not Spam', or 'Important'.",
      enum: ['Spam', 'Not Spam', 'Important'],
    },
    reason: {
      type: Type.STRING,
      description: "A brief, one-sentence explanation for the classification."
    }
  },
  required: ['classification', 'reason'],
};

export async function filterEmail(email: EmailData): Promise<FilterResult> {
  const model = "gemini-3-flash-preview";
  const systemInstruction = "You are an advanced AI email filtering agent. Your task is to analyze an email and classify it into one of the following categories: 'Spam', 'Not Spam', or 'Important'. You must also provide a brief, clear reason for your classification in a single sentence. Base your classification on common spam indicators like urgency, suspicious links, generic greetings, or unsolicited offers. For 'Important', look for personal details, expected replies, or high-priority keywords. For 'Not Spam', identify legitimate communications like newsletters, notifications, or personal messages.";
  
  const prompt = `
    Please analyze the following email and provide a classification and reason.

    From: ${email.from}
    Subject: ${email.subject}
    Body:
    ${email.body}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    if (!response.text) {
        throw new Error("Received an empty response from the API.");
    }
    
    // Trim potential markdown fences for JSON
    const jsonText = response.text.replace(/```json\n?|\n?```/g, '').trim();
    const result = JSON.parse(jsonText);

    // Validate the parsed result
    if (
      !result.classification ||
      !['Spam', 'Not Spam', 'Important'].includes(result.classification) ||
      typeof result.reason !== 'string'
    ) {
      throw new Error('Invalid response structure from API.');
    }
    
    return result as FilterResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}
