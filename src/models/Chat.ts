import * as findorcreate from 'mongoose-findorcreate'
import { FindOrCreate } from '@typegoose/typegoose/lib/defaultClasses'
import {
  Severity,
  getModelForClass,
  modelOptions,
  plugin,
  prop,
} from '@typegoose/typegoose'

@plugin(findorcreate)
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class Chat extends FindOrCreate {
  @prop({ required: true, unique: true, index: true })
  id: string
  @prop({ required: true, default: false })
  adminLocked: boolean
  @prop({ required: true, default: false })
  silent: boolean
  @prop({ required: true, default: true })
  filesBanned: boolean
  @prop()
  googleSetupMessageId?: number
  @prop()
  googleKey?: string
  @prop()
  witToken?: string
  @prop({ required: true, default: false })
  timecodesEnabled: boolean
  @prop()
  lastVoiceMessageSentAt?: Date
}

export const ChatModel = getModelForClass(Chat)
