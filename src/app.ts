import 'reflect-metadata'
// Setup @/ aliases for modules
import 'module-alias/register'
// Config dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })

import { run } from '@grammyjs/runner'

import startMongo from './helpers/startMongo'
import Cluster from './helpers/Cluster'
import bot from './helpers/bot'
import recordTimeReceived from './middlewares/recordTimeReceived'
import countMessage from './middlewares/countMessage'
import checkAdminLock from './middlewares/adminLock'
import attachChat from './middlewares/attachChat'
import handleHelp from './commands/handleHelp'
import handlePrice from './commands/handlePrice'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo started')
  // Middlewares
  bot.use(recordTimeReceived)
  bot.use(countMessage)
  bot.use(attachChat)

  // Commands
  bot.command('help', checkAdminLock, handleHelp)
  bot.command('price', checkAdminLock, handlePrice)
  bot.command('p', checkAdminLock, handlePrice)

  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

if (Cluster.isMaster) {
  void runApp()
}
