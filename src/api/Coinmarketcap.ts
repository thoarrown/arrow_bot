import request from './request'

export default class CoinMarketcapApi {
  private BASE_URL = 'https://web-api.coinmarketcap.com/v1/'
  private PATH_CRYPTOINFO = 'cryptocurrency/quotes/latest'

  public async getInfo(symbol: string) {
    let query_params = { symbol }
    let url = this.BASE_URL + this.PATH_CRYPTOINFO

    try {
      return request('GET', url, query_params)
    } catch (error) {
      console.error(error)
    }
  }
}
