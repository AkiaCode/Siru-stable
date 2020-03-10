class Command {
  constructor (client) {
    this.client = client
    this.command = {
      name: 'repeat',
      aliases: ['반복', 'flvlt', 'qksqhr', 'loop', 'ㅣㅐㅐㅔ', '루프'],
      category: 'MUSIC_DJ',
      require_nodes: false,
      require_voice: false,
      hide: false,
      permissions: ['DJ', 'Administrator']
    }
  }

  /**
     * @param {Object} compressed - Compressed Object (In CBOT)
     * @param {Boolean} silent - if Send Message
     */
  async run (compressed) {
    const { message } = compressed
    const locale = compressed.guildData.locale
    const picker = this.client.utils.localePicker
    switch (compressed.guildData.repeat) {
      case 0:
        message.channel.send(picker.get(locale, 'COMMANDS_REPEAT_ALL'))
        this.client.database.updateGuild(message.guild.id, { $set: { repeat: 1 } })
        break
      case 1:
        message.channel.send(picker.get(locale, 'COMMANDS_REPEAT_SINGLE'))
        this.client.database.updateGuild(message.guild.id, { $set: { repeat: 2 } })
        break
      case 2:
        message.channel.send(picker.get(locale, 'COMMANDS_REPEAT_NONE'))
        this.client.database.updateGuild(message.guild.id, { $set: { repeat: 0 } })
        break
    }
  }
}

module.exports = Command