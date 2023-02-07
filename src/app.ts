import { Client } from "tdl";
import { TDLib } from "tdl-tdlib-addon";
import { getTdjson } from "prebuilt-tdlib";
import dotenv from "dotenv";
import { handleUpdateMessageSendSucceeded, handleUpdateNewMessage } from "./handlers";
// import { ChatGpt } from "./command";

dotenv.config();

const tdlib = new TDLib(getTdjson());
const client = new Client(tdlib, {
  apiId: process.env.APP_ID as unknown as number,
  apiHash: process.env.APP_HASH,
  verbosityLevel: 2,
});

client.login();

client.on("update", (update) => {
  switch (update["_"]) {
    case "updateNewMessage":
      handleUpdateNewMessage(client, update.message);
      break;

    case "updateMessageSendSucceeded":
      handleUpdateMessageSendSucceeded(client, update.message);
      break;

    default:
      break;
  }
});

process.on("SIGINT", function () {
  client.close();
  process.exit();
});
