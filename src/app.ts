import { Client } from "tdl";
import { TDLib } from "tdl-tdlib-addon";
import { getTdjson } from "prebuilt-tdlib";
import { Update } from "tdlib-types";
import dotenv from "dotenv";
import { getAiResponse } from "./openapi.js";

dotenv.config();

const tdlib = new TDLib(getTdjson());
const client = new Client(tdlib, {
  apiId: process.env.APP_ID as unknown as number,
  apiHash: process.env.APP_HASH,
  verbosityLevel: 2,
});

// listen event
client.on("update", async (update: Update) => {
  if (update["_"] === "updateNewMessage") {
    const getChat = await client.invoke({
      _: "getChat",
      chat_id: update.message.chat_id,
    });

    if (getChat.type._ === "chatTypePrivate") {
      if (update.message.content._ === "messageText") {
        const message = update.message.content.text.text;
        const res = await getAiResponse(message);

        // const command = {
        //   _: "sendMessage",
        //   chat_id: update.message.chat_id,
        //   input_message_content: {
        //     _: "inputMessageText",
        //     text: {
        //       _: "formattedText",
        //       text: res,
        //     },
        //   },
        // }

        console.log(res)

        // await client.invoke({});
      }
    }
  }
});

async function main() {
  await client.login(() => ({
    getPhoneNumber: (retry) =>
      retry
        ? Promise.reject("Invalid phone number")
        : Promise.resolve(process.env.PHONE_NUMBER as string),
  }));
}

main();
