import * as Eris from "eris";
import { Cmd } from "../api";
import { colors } from "../colors";
const { inspect } = require("util");

export default class evaluate implements Cmd {
    
    private readonly _command = "eval";

    onDesc(): string {
        return "Evaluate JavaScript code";
    }

    onCommand(command: string): boolean {
        return command === this._command;
    }

    async onRun(args: string[], msg: Eris.Message, client: Eris.Client): Promise<void> {

        // Allowed Users [ID's]
        const allowed = ['476156640110968834'];

        //#region Perm / Usage
        if(!allowed.includes(msg.author.id)) {
            msg.channel.createMessage({
                embed: {
                    description: "You do not have permission to use this command",
                    color: colors.blank
                }
            });
            return;
        }
        if(!args[0]) {

            msg.channel.createMessage({
                embed: {
                    description: ".eval <code>",
                    color: colors.blank
                }
            });
            return;
        }
        //#endregion
    
        //#region Evaluate!
        try {
            let onEval = args.join(" ");
            let onEvaluated = inspect(eval(onEval));

            msg.channel.createMessage(`\`\`\`js\n${onEvaluated}\n\`\`\``);
            return;
        } catch(e) {
            msg.channel.createMessage(`\`\`\`\n${e.message}\n\`\`\``);
            return;
        }
        //#endregion
    }
}