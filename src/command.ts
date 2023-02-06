const { ChatGPTAPI } = require("chatgpt");
import dotenv from "dotenv";

dotenv.config();

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAPI_API_KEY as string,
});

export const ChatGpt = async (message: string) => {
  const res = await api.sendMessage(message);
  return res;
};
