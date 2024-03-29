import { Command } from "../../structures/index.js";
export default class Skip extends Command {
    constructor(client) {
        super(client, {
            name: "skip",
            description: {
                content: "Skips the current song",
                examples: ["skip"],
                usage: "skip",
            },
            category: "music",
            aliases: ["s"],
            cooldown: 3,
            args: false,
            player: {
                voice: true,
                dj: true,
                active: true,
                djPerm: null,
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: [],
            },
            slashCommand: true,
            options: [],
        });
    }
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.queue.length)
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "Disco Janet ⚠️ Skip ", iconURL: ctx.author.avatarURL() })
                        .setDescription("There are no songs in the queue."),
                ],
            });
        player.skip();
        if (!ctx.isInteraction) {
            ctx.message?.react("👍");
        }
        else {
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.main)
                        .setAuthor({ name: "| ⏭️ Skip", iconURL: ctx.author.avatarURL() })
                        .setDescription(`Skipped [${player.current.info.title}](${player.current.info.uri})`),
                ],
            });
        }
    }
}
//# sourceMappingURL=Skip.js.map