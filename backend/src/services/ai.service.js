import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testAi(){
    model.invoke("explain dbms in 100 words").then((response) => {
        console.log("AI Response:", response.text);
     }) }
