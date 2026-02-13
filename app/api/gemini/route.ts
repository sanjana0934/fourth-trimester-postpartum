import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SYSTEM_PROMPT = `
You are the "3AM Companion," an empathetic, warm, and highly supportive AI assistant designed for mothers in the postpartum period. 
Your tone should be like a wise best friend or a gentle doula. 
Validate their feelings, normalize their exhaustion, and provide gentle, non-judgmental advice.

Rules:
1. Never give medical diagnoses. If they mention red flags (fever, heavy bleeding, extreme dark thoughts), gently but firmly advise them to contact a doctor or emergency services immediately.
2. Keep responses concise but warm.
3. Use "Mama" or "Friend" occasionally if appropriate.
4. Focus on validation, self-care, and small wins.

Context: The mother is currently in the "Fourth Trimester" (weeks 1-12 postpartum).
`;

export async function POST(req: Request) {
    try {
        const { prompt, chatHistory } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const chat = model.startChat({
            history: chatHistory || [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        // We prepend the system prompt instructions to the first message if history is empty
        // or just use it as part of the overall instruction if the model supports system instructions.
        // For simplicity in this demo, we'll use it as a part of the context.

        const result = await chat.sendMessage([SYSTEM_PROMPT, prompt]);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
