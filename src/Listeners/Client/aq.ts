import { Listener } from 'discord-akairo';
import type { Message, GuildMember, ImageSize, AllowedImageFormat, TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";
import Client from '../../client/Client';
import * as db from 'quick.db'

export default class aq extends Listener {
    client: Client
    public constructor(client: Client) {
        super("aq", {
            emitter: "client",
            event: "message",
            category: "client"
        });
        this.client = client
    }

    async exec(message: Message) {
    if (message.author.bot) return;
    if (message.guild == null) return;
    let roles = db.get(`${message.guild.id}.aq`)
    let de;
    // console.log(roles)

        var length = roles.length

        // check roles
        for (var i = 0; i < length; i++) { if(message.member.roles.cache.has(roles[i])) de = 1 }

        if(de == 1){
        let splito = message.content.split(' ')
        for( var i = 0; i < splito.length; i++){ 
    
        if ( splito[i].includes('discord.com/channels')) { 
    
            var item = splito.splice(i, 1)
        }}
        
        let thing = (<string[]>item).join()
        let split = thing.split('/')
        
        let channel = split[5]

        if(!channel) return

        let msgid = split[6]

        if(!msgid) return

        let chan = await this.client.channels.fetch(channel).catch(e => message.reply('message not found (channel)'))

        let msg = await (chan as TextChannel).messages.fetch(msgid).catch(e => message.reply('message not found (message)'))


        if (!message.member.guild.me.hasPermission(["MANAGE_WEBHOOKS"])) { return message.channel.send(
        new MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.avatarURL())
                    .setDescription(msg.content)
                    .setFooter("didnt have WebhookPermissions so send a embed instead")
        )
        }
        // magic
        let webhook = await (chan as TextChannel).createWebhook(msg.author.tag).then(webhook => webhook.edit({avatar: msg.author.displayAvatarURL({ size: 2048, format: "png" })}))
        //
        await webhook.send(msg.content).then(msg => webhook.delete()).catch(e => message.reply('Something went wrong'))
        }
    
    }
}