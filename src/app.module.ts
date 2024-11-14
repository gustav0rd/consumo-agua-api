import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumoAguaModule } from './consumo_agua/consumo_agua.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://usuario1:12345@cluster0.ajqn0.mongodb.net/banco?retryWrites=true&w=majority&appName=cluster0'),
    ConsumoAguaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


