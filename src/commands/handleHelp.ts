import Context from '@/models/Context'
import logAnswerTime from '@/helpers/logAnswerTime'

export default async function handleHelp(ctx: Context) {
  await ctx.reply('Not setup, Doing now...', {
    disable_web_page_preview: true,
    parse_mode: 'Markdown',
  })
  logAnswerTime(ctx, '/help')
}
