const fetch = require('node-fetch')
const Discord = require('discord.js')

class Command {
  constructor (client) {
    this.client = client
    this.name = 'docs'
    this.aliases = ['앷ㄴ', 'djsdocs', 'djs']
    this.category = 'GENERAL_INFO'
    this.requirements = {
      audioNodes: false,
      playingStatus: false,
      voiceStatus: {
        listenStatus: false,
        sameChannel: false,
        voiceIn: false
      }
    }
    this.hide = false
    this.permissions = ['Everyone']
  }

  /**
   * @param {Object} compressed - Compressed Object
   */
  async run (compressed) {
    const locale = compressed.guildData.locale
    const picker = this.client.utils.localePicker
    const { message, args } = compressed
    if (args.length === 0) return message.reply(picker.get(locale, 'GENERAL_INPUT_QUERY'))
    const result = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=https://raw.githubusercontent.com/discordjs/discord.js/docs/master.json&q=${args.join()}`).then(res => res.json())
    if (!result) return message.channel.send(message.author + '\n' + picker.get(locale, 'GENERAL_NO_RESULT'))
    const embed = new Discord.MessageEmbed(result)
    embed.setFooter(message.author.tag, message.author.displayAvatarURL({ format: 'png', size: 512 }))
    message.channel.send(embed)
  }
}

module.exports = Command