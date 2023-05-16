import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
import fs from "fs";

const confiqData = fs.readFileSync("./confiq.json");
const confiq = JSON.parse(confiqData);
const apiKey = confiq.apiKey;
const organisationID = confiq.organisationID;

const configuraiton = new Configuration({
  organization: organisationID,
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuraiton);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    .then((res) => {
      console.log(res.data.choices[0].message.content);
      userInterface.prompt();
    })
    .catch((e) => {
      console.log(e);
    });
});
