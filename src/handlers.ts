import Client from "tdl";
import { InputMessageContent$Input, message } from "tdlib-types";
import { ChatGpt } from "./command";
import dotenv from "dotenv";
import { saveSession, updateSessionById } from "./store";

dotenv.config();

export const handleUpdateNewMessage = async (
  client: Client,
  message: message
) => {
  try {
    const prefix = process.env.PREFIX_COMMAND as string;
    const chatId = message.chat_id;
    const messageId = message.id;
    const msgText =
      message.content._ === "messageText" ? message.content.text.text : null;
    const chatInfo = await client.invoke({
      _: "getChat",
      chat_id: chatId,
    });

    // Handle private chat
    if (chatInfo.type._ === "chatTypePrivate") {
      if (msgText) {
        if (message.sender_id._ !== "messageSenderUser") {
          return
        }

        const senderId = message.sender_id.user_id
        const session = saveSession(senderId)

        if (msgText.trim().match(prefix)?.index === 0) {
          const question = msgText.trim().slice(prefix.length).trim();
          const { parentMessageId, conversationId, text } = await ChatGpt(
            question,
            session.chatgpt
          );

          // tracking conversation
          updateSessionById(senderId, {
            parentMessageId,
            conversationId
          })

          const data: InputMessageContent$Input = {
            _: "inputMessageText",
            text: {
              _: "formattedText",
              text: text,
            },
          };

          // send message
          await client.invoke({
            _: "sendMessage",
            chat_id: chatId,
            reply_to_message_id: messageId,
            input_message_content: data,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    client.close();
  }
};

export const handleUpdateMessageSendSucceeded = async (
  client: Client,
  message: message
) => {
  console.log(message);
};
