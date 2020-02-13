const methods = {
  add: '추가',
  remove: '제거',
  삭제: '제거',
  check: '확인',
  chk: '확인',
  추가: '추가',
  제거: '제거',
  확인: '확인'
}
class Command {
  constructor (client) {
    this.client = client
    this.command = {
      name: 'blacklist',
      aliases: ['블랙리스트'],
      category: 'BOT_OWNER',
      require_voice: false,
      hide: false,
      permissions: ['BotOwner']
    }
  }

  /**
   * @param {Object} compressed - Compressed Object (In CBOT)
   */
  async run (compressed) {
    const { message, args } = compressed
    if (args.length === 0) return message.channel.send('> ❎  매개 변수를 정확히 입력해 주세요! ``->blacklist [추가|제거|확인] [유저 ID]``)')
    if (!methods[args[0]]) return message.channel.send('> ❎  올바르지 않은 작업이에요! [추가|제거|확인] 중 하나를 입력해 주세요!')
    const user = this.client.users.get(args[1])
    if (methods[args[0]] && user) return message.channel.send('> ❎  없는 유저 ID인거 같아요! 다시한번 확인해주세요!')
    const userData = this.client.database.getGlobalUserData(user)
    if (!userData) return message.channel.send('> ❎  이 유저는 가입되지 않은 (시루봇을 한번도 사용하지 않은) 유저 인것 같아요!')
    switch (methods[args[0]]) {
      case '추가':
        this.client.database.updateGlobalUserData(user, { $set: { blacklisted: true } })
        message.channel.send(`> ✅  **${user.tag}** 님을 블랙리스트에 추가하였어요!`)
        break
      case '제거':
        this.client.database.updateGlobalUserData(user, { $set: { blacklisted: false } })
        message.channel.send(`> ✅  **${user.tag}** 님을 블랙리스트에서 제거하였어요!`)
        break
      case '확인':
        message.channel.send(`> ✅  **${user.tag}** 님의 블랙리스트 상태: ${userData.blacklisted ? '블랙리스트에 등록되어 있음' : '블랙리스트에 등록되어 있지 않음'}`)
        break
    }
  }
}

module.exports = Command