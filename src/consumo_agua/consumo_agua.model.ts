import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ConsumoAgua extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: Number })
  quantidade: number;

  @Prop({ default: Date.now })
  data: Date;
}

export const ConsumoAguaSchema = SchemaFactory.createForClass(ConsumoAgua);
