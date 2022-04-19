import { Client, State } from "@twilio/conversations";
import toast from "react-hot-toast";
import { handleNotifications } from "./messaging_get_token";

const sendMessageToConversation = async (
  token: string,
  room: string,
  message: string
) => {
  const client = new Client(token);
  client.on("stateChanged", async (state: State) => {
    if (state === "initialized") {
      try {
        const conversation = await client.getConversationByUniqueName(room);
        if (message && String(message).trim()) {
          await conversation.sendMessage(message);
        }

        await handleNotifications(client);
      } catch (error) {
        toast.error("Unable to create conversation, please reload this page");
      }
    }
  });
};

const services = { sendMessage: sendMessageToConversation };
export default services;
