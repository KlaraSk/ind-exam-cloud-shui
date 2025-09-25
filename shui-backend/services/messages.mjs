import { client } from "./client.mjs";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { generateDate } from "../utils/generateDate.mjs";
import { generateId } from "../utils/generateId.mjs";
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

export const addMessage = async (username, message) => {
  const messageId = generateId(5);
  const date = generateDate();
  console.log("date: ", date);
  console.log("messageId: ", messageId);

  const command = new PutItemCommand({
    TableName: "shui-db",
    Item: marshall({
      PK: `USER#${username}`,
      SK: `MESSAGE#${messageId}`,
      GSI1PK: "MESSAGE",
      GSI1SK: messageId,
      attributes: {
        createdAt: date,
        message: message,
        user: username,
      },
    }),
  });

  try {
    await client.send(command);

    return { messageId: messageId, username: username, message: message };
  } catch (error) {
    console.error("ERROR in db:", error.message);
    return false;
  }
};
