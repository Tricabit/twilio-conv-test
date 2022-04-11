// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../utils/config";
import { createTwilioConversation } from "../../utils/conversations";
import { tokenGenerator } from "../../utils/tokenGenerator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return getOrCreateConvo(req, res);
    default:
      return sendError(res);
  }
};

const getOrCreateConvo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { to } = req.query;
  const { from } = req.body;

  const twilioToken = tokenGenerator(from);

  //connessione DB
  const client = await MongoClient.connect(config.URI, {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  //@ts-ignore
  const db = client.db(config.USERS_DATABASE);

  const existingConversation = await db
    .collection(config.CONVERSATIONS_COLLECTION)
    .findOne({
      $and: [
        {
          participants: {
            $all: [to, from],
          },
        },
        { participants: { $size: 2 } },
      ],
    });

  if (_.isEmpty(existingConversation)) {
    const conversationResponse = await createTwilioConversation(
      to as string,
      from
    );

    await db.collection(config.CONVERSATIONS_COLLECTION).insertOne({
      participants: [to, from],
      created_at: new Date(),
      created_by: from,
      conv_unique_name: conversationResponse.uniqueName,
    });

    //@ts-ignore
    await client.close();
    return res
      .status(200)
      .json({ twilioToken, room: conversationResponse.uniqueName });
  }

  res
    .status(200)
    .json({ twilioToken, room: existingConversation.conv_unique_name });
};

const sendError = (res: NextApiResponse) => {
  return res.status(405).json({ message: "Wrong method" });
};

export default handler;
