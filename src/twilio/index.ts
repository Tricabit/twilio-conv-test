import { Client, State } from "@twilio/conversations";
import toast from "react-hot-toast";

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
        await conversation.join();
        if (message && String(message).trim()) {
          await conversation.sendMessage(message);
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Unable to create conversation, please reload this page");
      }
    }
  });
};

const services = { sendMessage: sendMessageToConversation };
export default services;
