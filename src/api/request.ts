import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Method } from 'axios'
const { URL } = require('url')

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'GET',
}

const instance = axios.create()

instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response
  },

  function (error: AxiosError) {
    return Promise.reject(error)
  }
)

export default async function request(
  method: Method = 'GET',
  path: any,
  data?: any,
  headers?: any
): Promise<any> {
  try {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    let res: AxiosResponse

    switch (method) {
      case 'GET' || RequestMethod.GET:
        if (data) {
          path = instance.defaults.baseURL
            ? new URL(instance.defaults.baseURL + path)
            : new URL(path)
          Object.entries(data).forEach(([name, value]) => {
            if (!value) return
            path.searchParams.append(name, value)
          })
          path = path.toString()
        }
        console.log('instance.defaults.baseURL', path)

        res = await instance.get(path, { headers })
        break
      case 'POST':
        res = await instance.post(path, data, { headers })

        break
      default:
        break
    }

    return res.data
  } catch (error) {
    console.log(error)

    throw new Error(error)
  }
}
