import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing from .env.local");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function scoreWriting(prompt: string, response: string) {
  console.log("Calling Gemini for writing score...");
  const instruction = `You are a certified CELPIP examiner. Score this writing response across 4 dimensions (1-12 each): Content/Coherence, Vocabulary, Readability, Task Fulfillment. For each give: score, one-sentence explanation, one improvement tip. Also give overall band score (avg rounded to 0.5), 2-sentence strength summary, 2-sentence improvement summary, 3 before/after language suggestions.

Task prompt: ${prompt}
Student response: ${response}

Return ONLY valid JSON, no markdown, no extra text:
{"dimensions":{"content":{"score":0,"explanation":"","tip":""},"vocabulary":{"score":0,"explanation":"","tip":""},"readability":{"score":0,"explanation":"","tip":""},"taskFulfillment":{"score":0,"explanation":"","tip":""}},"overallScore":0,"strength":"","improvement":"","languageSuggestions":[{"original":"","improved":"","reason":""}]}`;

  try {
    const result = await model.generateContent(instruction);
    const text = result.response.text();
    console.log("Gemini raw response preview:", text.substring(0, 150));
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Gemini writing error:", err);
    return null;
  }
}

export async function scoreSpeaking(prompt: string, audioUrl: string) {
  console.log("Calling Gemini for speaking score...");
  const instruction = `You are a certified CELPIP speaking examiner. Score this spoken response across 4 dimensions (1-12 each): Coherence, Vocabulary, Listenability, Task Fulfillment. For each: score, one-sentence explanation, one improvement tip. Also give overall band score (avg rounded to 0.5), 2-sentence strength summary, 2-sentence improvement summary.

Task: ${prompt}
Audio: ${audioUrl}

Return ONLY valid JSON, no markdown, no extra text:
{"dimensions":{"coherence":{"score":0,"explanation":"","tip":""},"vocabulary":{"score":0,"explanation":"","tip":""},"listenability":{"score":0,"explanation":"","tip":""},"taskFulfillment":{"score":0,"explanation":"","tip":""}},"overallScore":0,"strength":"","improvement":""}`;

  try {
    const result = await model.generateContent(instruction);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini speaking error:", err);
    return null;
  }
}

export async function generateStudyPlan(scoresJson: string) {
  console.log("Calling Gemini for study plan...");
  const instruction = `Based on these CELPIP test scores: ${scoresJson}, generate a 2-week study plan. Return ONLY valid JSON, no markdown:
{"weeks":[{"week":1,"days":[{"day":1,"focus":"","tasks":[""]}]}]}`;

  try {
    const result = await model.generateContent(instruction);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini study plan error:", err);
    return null;
  }
}
