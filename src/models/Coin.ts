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
export class Coin extends FindOrCreate {
  @prop({ required: true, unique: true, index: true })
  id: string
  @prop({ required: true, default: false })
  symbol?: string

  @prop({ required: true, default: false })
  btc?: number
}
