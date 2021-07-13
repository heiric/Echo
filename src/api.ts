import * as Eris from "eris";

export interface Cmd {
    onHelp(): string;
    onCommand(command: string): boolean;
    onRun(args: string[], msg: Eris.Message, client: Eris.Client): Promise<void>;
}