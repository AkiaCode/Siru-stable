const fetch = require('node-fetch')
const Discord = require('discord.js')

class Command {
  constructor (client) {
    this.client = client
    this.command = {
      name: 'changelog',
      aliases: ['변경로그', '초뭏디ㅐㅎ'],
      category: 'COMMANDS_GENERAL_INFO',
      require_voice: false,
      hide: false,
      permissions: ['Everyone']
    }
  }

  /**
   * @param {Object} compressed - Compressed Object (In CBOT)
   */
  async run (compressed) {
    const { message } = compressed
    const picker = this.client.utils.localePicker
    const locale = compressed.GuildData.locale
    const gitInfo = require('git-repo-info')()
    const result = await fetch(this.client._options.others.changelog_url + `${gitInfo.abbreviatedSha}.json`).then(res => res.text()).then(res => res)
    if (result === '<html><head></head><body>NOT FOUND</body></html>') {
      message.channel.send(picker.get(locale, 'COMMANDS_CHANGELOG_NO', { COMMITSHA: gitInfo.abbreviatedSha }))
    } else {
      const obj = JSON.parse(result)
      const embed = new Discord.RichEmbed(Object.assign(obj.locales[locale], obj.footer))
      embed.setTitle(`${obj.locales[locale].title} - **${gitInfo.abbreviatedSha}**`)
      embed.setTimestamp(obj.timestamp)
      embed.setColor(obj.color)
      message.channel.send(embed)
    }
  }
}
module.exports = Command