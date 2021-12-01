import Context from '@/models/Context'
import logAnswerTime from '@/helpers/logAnswerTime'
import BinanceApi from '@/api/BinanceApi'
import coinConfig from '@/helpers/coin'
import Market from '@/helpers/market'
import formatPrice from '@/helpers/formatPrice'
export default async function handlePrice(ctx: Context) {
  const parts = ctx.update.message.text.split(' ')

  if (parts.length > 2) {
    ctx.reply('Format không đúng, hãy gửi format như: /p BTC(no space)')
  }

  let fsym = coinConfig.coinDefault
  if (parts.length > 1) {
    fsym = parts[1].toUpperCase()
  }

  const info = await new Market().getSymbolInfo(fsym)

  await ctx.reply(
    info?.['quote']?.['USD']
      ? `${fsym} : ${formatPrice(info.quote.USD.price)} USD`
      : 'Not valid',
    {
      disable_web_page_preview: true,
      parse_mode: 'Markdown',
      reply_to_message_id: ctx.update.message.message_id
    }
  )
  logAnswerTime(ctx, '/price')
}
