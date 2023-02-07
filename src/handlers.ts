import Client from "tdl";
import { InputMessageContent$Input, message } from "tdlib-types";
import { ChatGpt } from "./command";

export const handleUpdateNewMessage = async (
  client: Client,
  message: message
) => {
  try {
    const regex = new RegExp("^\\!yui", "gm");
    const chatId = message.chat_id;
    const messageId = message.id;
    const messageContent =
      message.content._ === "messageText" ? message.content.text.text : null;
    const chatInfo = await client.invoke({
      _: "getChat",
      chat_id: chatId,
    });

    // Handle private chat
    if (chatInfo.type._ === "chatTypePrivate") {
      if (messageContent) {
        if (messageContent.trim().match(regex)) {
          const question = messageContent.trim().slice(4).trim();
          const resChatGpt = await ChatGpt(question)

          const data: InputMessageContent$Input = {
            _: "inputMessageText",
            text: {
              _: "formattedText",
              text: resChatGpt.text,
            },
          };

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
  console.log(message)
};
