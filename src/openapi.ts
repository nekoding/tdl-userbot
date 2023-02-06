const { ChatGPTAPI } = require("chatgpt")
import dotenv from "dotenv"

dotenv.config()

// const api = new ChatGPTAPI({
//     apiKey: process.env.OPENAPI_API_KEY as string
// });

// export const getAiResponse = async (message: string) => {
//     const res = await api.sendMessage(message)
//     return res
// }


// console.log(await getAiResponse("berapa jumlah 8 + 12"))

console.log(ChatGPTAPI);