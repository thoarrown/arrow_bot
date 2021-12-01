import Context from '@/models/Context'

export default async function handleGreetings(ctx: Context) {
  for (const member of ctx.update.message.new_chat_members) {
    await ctx.reply(
      `Chào mừng ${
        member.username || member.first_name + ' ' + member.last_name
      } đã đến với Gamefinity, xem hướng dẫn cho người mới [tại đây](https://t.me/gamefinitychannel/181) . `,
      {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        allow_sending_without_reply: false,
      }
    )
  }
}
