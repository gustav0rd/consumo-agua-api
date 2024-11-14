import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumoAgua, ConsumoAguaSchema } from './consumo_agua.model';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAguaController } from './consumo_agua.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ConsumoAgua.name, schema: ConsumoAguaSchema }])],
  controllers: [ConsumoAguaController],
  providers: [ConsumoAguaService],
})
export class ConsumoAguaModule {}
