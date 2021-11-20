import BinanceApi from '@/api/BinanceApi'
import CoinMarketcapApi from '@/api/Coinmarketcap'

export default class Market {
  private binanceApi: BinanceApi
  private coinmarketcapApi: CoinMarketcapApi
  private TSYMS = ['BTC', 'USDT', 'BNB', 'ETH', 'EUR']

  constructor() {
    this.binanceApi = new BinanceApi()
    this.coinmarketcapApi = new CoinMarketcapApi()
  }

  public async getSymbolInfo(symbol: string) {
    let info = await this.coinmarketcapApi.getInfo(symbol)

    return info?.data?.[symbol] || null
  }

  public async get_symbols() {
    let symbols = await this.binanceApi.getSymbols()
    return symbols
  }

  public async isPricePairValid(fsym, tsym) {
    const symbols = await this.get_symbols()

    const result = symbols.some((item) => (fsym + tsym).toUpperCase() === item)
    return result
  }
}
