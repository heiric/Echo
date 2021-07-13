import * as Eris from "eris";
import { config } from "./config";
import { Cmd } from "./api";

const client: Eris.Client = new Eris.Client(config.token, config.eris);
var commands: Cmd[] = [];
commandLoader(`${__dirname}/commands`);

//#region Events
client.on("message", async (msg: Eris.Message) => {

  if (msg.author.bot) return;
  if (msg.channel.type !== 0) return;
  if (!msg.content.startsWith(config.prefix)) return;

  commandHandler(msg);
});

client.on("ready", () => {
  console.clear()
  console.log(`[${client.user.username}] > Successfully connected to Discord gateway`);
})
//#endregion

//#region Command Handler
async function commandHandler(msg: Eris.Message) {

    let command = msg.content.split(" ")[0].replace(".", "").toLowerCase();
    let args = msg.content.slice(config.prefix.length).trim().split(/[^\S\n]+/g);

    for (const commandClass of commands) {
      try {
        if (!commandClass.onCommand(command)) {
          continue;
        }
        await commandClass.onRun(args, msg, client);
      } catch (exception) {
        console.log(exception);
      }
    }
  }
//#endregion

//#region Command Loader
function commandLoader(commandsPath: string) {
    
    if(!config.commands || (config.commands as string[]).length === 0) {
        return;
    }

    for(const commandName of config.commands as string[]) {
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass() as Cmd;
        commands.push(command);
    }
}
//#endregion

client.connect();