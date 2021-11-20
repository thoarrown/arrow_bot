import request from './request'

export default class BinanceApi {
  private BASE_URL = 'https://api.binance.com/'
  private PATH_CANDLESTICK_DATA = 'api/v1/klines'
  private PATH_EXCHANGEINFO = 'api/v1/exchangeInfo'
  private PATH_PRICE = 'api/v3/ticker/price'

  public async getCandles(symbol, interval, limit = 500) {
    let query_params = {}
    query_params['symbol'] = symbol
    query_params['interval'] = interval.value
    query_params['limit'] = limit

    const url = this.BASE_URL + this.PATH_CANDLESTICK_DATA
    const res = await request('GET', url, query_params)

    return res
  }

  public async getSymbols() {
    let info = await this.getExchangeinfo()

    let symbols = []
    for (const s of info['symbols']) {
      if (Object.prototype.hasOwnProperty.call(s, 'symbol')) {
        symbols.push(s['symbol'])
      }
    }
    return symbols
  }

  public async getExchangeinfo() {
    let url = this.BASE_URL + this.PATH_EXCHANGEINFO
    try {
      return request('GET', url)
    } catch (error) {
      console.log(error)
    }
  }
}
