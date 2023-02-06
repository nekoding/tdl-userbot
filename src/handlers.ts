import Client from "tdl";
import { InputMessageContent$Input, message } from "tdlib-types";

export const handleUpdateMessage = async (client: Client, message: message) => {
  try {
    const chatId = message.chat_id;
    const messageId = message.id;
    const chatInfo = await client.invoke({
      _: "getChat",
      chat_id: chatId,
    });

    // Handle private chat
    if (chatInfo.type._ === "chatTypePrivate") {
      if (chatInfo.type.user_id == 325795657) {
        const messageContent: InputMessageContent$Input = {
          _: "inputMessageText",
          text: {
            _: "formattedText",
            text: "Hello",
          },
        };

        const res = await client.invoke({
          _: "sendMessage",
          chat_id: chatId,
          reply_to_message_id: messageId,
          input_message_content: messageContent,
        });

        console.log("chatInfo", chatInfo);
        console.log("invokeMessage", res);
      } else {
        console.log(chatInfo);
      }
    }
  } catch (error) {
    console.error(error);
    client.close();
  }
};
