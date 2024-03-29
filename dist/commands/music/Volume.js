import { Command } from "../../structures/index.js";
export default class Volume extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            description: {
                content: "Sets the volume of the player",
                examples: ["volume 100"],
                usage: "volume <number>",
            },
            category: "music",
            aliases: ["vol"],
            cooldown: 3,
            args: true,
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
            options: [
                {
                    name: "number",
                    description: "The volume you want to set between 0 and 100",
                    type: 4,
                    required: true,
                    minLength: 0,
                    maxLength: 100,
                },
            ],
        });
    }
    async run(client, ctx, args) {
        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        const number = Number(args[0]);
        if (isNaN(number))
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "| ⚠️ Volume ", iconURL: ctx.author.avatarURL() })
                        .setDescription("Please provide a valid number."),
                ],
            });
        if (number > 200)
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "| ⚠️ Volume ", iconURL: ctx.author.avatarURL() })
                        .setDescription("The volume can't be higher than 200."),
                ],
            });
        if (number < 0)
            return ctx.sendMessage({
                embeds: [
                    embed
                        .setColor(this.client.color.red)
                        .setAuthor({ name: "| ⚠️ Volume ", iconURL: ctx.author.avatarURL() })
                        .setDescription("The volume can't be lower than 0."),
                ],
            });
        player.player.setVolume(number / 100);
        return ctx.sendMessage({
            embeds: [
                embed
                    .setColor(this.client.color.main)
                    .setAuthor({ name: "| 🔊 Volume ", iconURL: ctx.author.avatarURL() })
                    .setDescription(`Set the volume to ${(player.volume * 100).toFixed()}`),
            ],
        });
    }
}
//# sourceMappingURL=Volume.js.map