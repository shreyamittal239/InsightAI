import { generateResponse , generateChatTitle } from "../services/ai.service.js"     
import chatModel from "../models/chat.model.js"  
import Message from "../models/message.model.js";       

export async function sendMessage(req,res) {

    const { message , chat: chatId } = req.body;

    

    let title = null , chat = null;

    if(!chatId){
    const title = await generateChatTitle(message);

    const chat = new chatModel({
        user: req.user._id,
        title
    })
    }

     const userMessage = await Message.create({
        chat: chatId ||chat._id,
        role:"user",
        content:message
    })

    const messages = await Message.find({chat : chatId})

    const result = await generateResponse(messages);
    
   

    console.log(messages)

   

    const aiMessage = await Message.create({
        chat: chatId ||chat._id,
        role: "ai",
        content: result
    });

    res.status(201).json ( {
        title,
        chat,
        aiMessage,
        userMessage
    })
}