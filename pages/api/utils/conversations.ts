import { config } from "./config";
import { v4 as uuidv4 } from "uuid";
import { MongoClient } from "mongodb";

export interface TwilioConversationResponse {
  accountSid: string;
  chatServiceSid: string;
  messagingServiceSid: string;
  sid: string;
  friendlyName: string;
  uniqueName: string;
  attributes: string;
  state: string;
  dateCreated: Date;
  dateUpdated: Date;
  timers: {};
  url: string;
  links: {
    participants: string;
    messages: string;
    webhooks: string;
  };
}

const client = require("twilio")(
  config.TWILIO_ACCOUNT_SID,
  config.TIWLIO_AUTH_TOKEN
);

export const createTwilioConversation = async (
  chatTo: string,
  myIdentity: string
) => {
  const uniqueName = uuidv4();

  const conversation = (await client.conversations.conversations.create({
    friendlyName: `Chat created by ${myIdentity}`,
    uniqueName,
  })) as TwilioConversationResponse;

  await client.conversations
    .conversations(conversation.sid)
    .participants.create({ identity: chatTo });

  await client.conversations
    .conversations(conversation.sid)
    .participants.create({ identity: myIdentity });

  return conversation;
};

export const sendMessage = async (
  conversationSid: string,
  author: string,
  body: string
) => {
  return await client.conversations
    .conversations(conversationSid)
    .messages.create({ author, body });
};
