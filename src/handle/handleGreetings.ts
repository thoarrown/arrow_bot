import Context from '@/models/Context'

export default async function handleGreetings(ctx: Context) {

  function toEscapeMSg(str: string): string {
    return str
      .replace(/_/gi, '\\_')
      .replace(/-/gi, '\\-')
      .replace('~', '\\~')
      .replace(/`/gi, '\\`')
      .replace(/\./g, '\\.')
  }

  for (const member of ctx.update.message.new_chat_members) {
    const name =
      member.username ||
      (member.first_name || '') + ' ' + (member.last_name || '')
    await ctx.reply(
      `Chào mừng ${toEscapeMSg(
        name
      )} đã đến với Gamefinity, xem hướng dẫn cho người mới [tại đây](https://t.me/gamefinitychannel/181).`,
      {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        allow_sending_without_reply: false,
      }
    )
  }
}
