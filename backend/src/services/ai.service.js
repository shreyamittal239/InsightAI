import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage , SystemMessage , AIMessage} from "langchain";
import { ChatMistralAI} from "@langchain/mistralai";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {
   
  const response = await geminiModel.invoke(messages.map(msg => {
    if(msg.role=='user') 
    {
      return new HumanMessage(msg.content);
    }
    else if(msg.role=='ai'){
      return new AIMessage(msg.content);
    }
  }))

  return response.text;
}


export async function generateChatTitle(message) {
    
  const response = await mistralModel.invoke([
    new SystemMessage("You are a helpful assistant that generates concise and descriptive titles for chat conversations.  User will provide a message and you will generate a title for the chat based on the content of the message. The title should be short, clear, and relevant to the message provided."),
    new HumanMessage(`
      Generate a title for the following first message: "${message}"`)
  ]);
  return response.text;
}