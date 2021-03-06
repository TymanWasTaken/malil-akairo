import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";
import { fixword } from "../../lib/Utils";
export default class ClapCommand extends Command {
	public constructor() {
		super("clap", {
			aliases: ["clap"],
			category: "Fun",
			quoted: true,
			args: [
				{
					id: "args",
					type: "array",
					match: "rest",
					default: "Me When No Arguments",
				},
			],
			description: {
				content: "πClapπonπtheπtext.π",
				usage: "clap",
				example: ["clap"],
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message: Message, { args }) {
		message.channel.send("π" + (await fixword(args.replace("/s+/g", "π").replace(/@/g, "@β").split(" ").join("π"))) + "π");
	}
}
