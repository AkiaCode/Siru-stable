
class Command {
  constructor (client) {
    this.client = client
    this.command = {
      name: 'related',
      aliases: ['추천', '추천영상', 'ㄱ딤ㅅㄷㅇ'],
      category: 'MUSIC_DJ',
      require_nodes: false,
      require_voice: false,
      hide: false,
      permissions: ['DJ', 'Administrator']
    }
  }

  /**
   * @param {Object} compressed - Compressed Object (In CBOT)
   */
  async run (compressed) {
    const { message } = compressed
    const locale = compressed.guildData.locale
    const picker = this.client.utils.localePicker

    switch (compressed.guildData.audioPlayrelated) {
      case true:
        message.channel.send(picker.get(locale, 'COMMANDS_AUDIO_RELATED_OFF'))
        this.client.database.updateGuild(message.guild.id, { $set: { audioPlayrelated: false } })
        break
      case false:
        message.channel.send(picker.get(locale, 'COMMANDS_AUDIO_RELATED_ON'))
        this.client.database.updateGuild(message.guild.id, { $set: { audioPlayrelated: true } })
        break
    }
  }
}

module.exports = Command