const { ChatGPTAPI } = require("chatgpt");
import dotenv from "dotenv";
import { ChatGPTConversation } from "./store";

dotenv.config();

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAPI_API_KEY as string,
});

export const ChatGpt = async (message: string, options?: ChatGPTConversation | null) => {
  const res = await api.sendMessage(message, options);
  return res;
};
