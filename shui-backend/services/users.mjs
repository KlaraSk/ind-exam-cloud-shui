import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { hashPassword } from "../utils/bcrypt.mjs";
import { client } from "./client.mjs";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { generateDate } from "../utils/generateDate.mjs";

export const createUser = async (user) => {
  const command = new PutItemCommand({
    TableName: "shui-db",
    Item: {
      PK: { S: `USER#${user.username}` },
      SK: { S: "PROFILE" },
      attributes: {
        M: {
          username: { S: user.username },
          password: { S: await hashPassword(user.password) },
          email: { S: user.email },
          role: { S: user.role },
          createdAt: { S: generateDate() },
        },
      },
    },
    // Kollar om användarnamnet redan finns
    ConditionExpression: "attribute_not_exists(PK)",
  });

  try {
    await client.send(command);
    return 201;
  } catch (error) {
    console.error("ERROR in db: ", error.message);
    if (error.message === "The conditional request failed") return 409;
    else return 404;
  }
};

export const getUser = async (username) => {
  const command = new GetItemCommand({
    TableName: "shui-db",
    Key: {
      PK: { S: `USER#${username}` },
      SK: { S: "PROFILE" },
    },
  });

  try {
    const { Item } = await client.send(command);

    if (!Item) return false;
    const user = unmarshall(Item);

    return user;
  } catch (error) {
    console.error("ERROR in db: ", error.message);
    return false;
  }
};
