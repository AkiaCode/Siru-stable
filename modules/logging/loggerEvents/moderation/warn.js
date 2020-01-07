class CustomEvent {
  constructor (client) {
    this.client = client
    this.event = {
      name: 'warn'
    }
  }

  /**
     * @param compressed - compressed Object
     */
  async run (compressed) {
    const { guild, args, eventData } = compressed
    guild.channels.get(eventData.value).send(`> **경고**\n> 경고를 받은 유저: ${args[0]}\n> 경고 횟수: 0/0\n> 경고 사유: ${args[1]}`)
  }
}
module.exports = CustomEvent