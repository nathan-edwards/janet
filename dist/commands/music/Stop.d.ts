import { Command, Janet, Context } from "../../structures/index.js";
export default class Stop extends Command {
    constructor(client: Janet);
    run(client: Janet, ctx: Context, args: string[]): Promise<void>;
}
