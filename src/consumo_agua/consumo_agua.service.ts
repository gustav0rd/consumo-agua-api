import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
  constructor(
    @InjectModel(ConsumoAgua.name) private consumoAguaModel: Model<ConsumoAgua>,
  ) {}
  
//registrando consumo

  async registrarConsumo(userId: string, quantidade: number): Promise<ConsumoAgua> {
    const novoConsumo = new this.consumoAguaModel({ userId, quantidade });
    return novoConsumo.save();
  }
// consultando histórico

  async obterHistorico(userId: string, dataInicio: Date, dataFim: Date): Promise<ConsumoAgua[]> {
    return this.consumoAguaModel.find({
      userId,
      data: { $gte: dataInicio, $lte: dataFim },
    }).exec();
  }

// verificando alertas de consumo

  async verificarAlerta(userId: string): Promise<string> {
    const consumos = await this.consumoAguaModel
      .find({ userId })
      .sort({ data: -1 })
      .limit(2)
      .exec();
  
    if (consumos.length < 2) {
      return 'Não há dados suficientes para gerar alerta.';
    }
  
    const [consumoAtual, consumoAnterior] = consumos;
    if (consumoAtual.quantidade > consumoAnterior.quantidade) {
      return `Alerta: Consumo elevado em relação ao mês anterior!`;
    }
    return 'Consumo dentro do normal.';
  }
  



}
