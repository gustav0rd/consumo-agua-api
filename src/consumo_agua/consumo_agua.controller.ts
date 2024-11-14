import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';

@Controller('consumo-agua')
export class ConsumoAguaController {
  constructor(private readonly consumoAguaService: ConsumoAguaService) {}

  @Post('registrar')
  registrarConsumo(@Body() body: { userId: string, quantidade: number }) {
    return this.consumoAguaService.registrarConsumo(body.userId, body.quantidade);
  }

  @Get('historico')
  async consultarHistorico(
    @Query('userId') userId: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ) {
    // Converte as datas de string para Date
    const dataInicioConvertida = new Date(dataInicio);
    const dataFimConvertida = new Date(dataFim);
  
    // Verifica se a conversão das datas foi bem-sucedida
    if (isNaN(dataInicioConvertida.getTime()) || isNaN(dataFimConvertida.getTime())) {
      throw new Error('Formato de data inválido');
    }
  
    return this.consumoAguaService.obterHistorico(userId, dataInicioConvertida, dataFimConvertida);
  }

  @Get('alerta')
  verificarAlerta(@Query('userId') userId: string) {
    return this.consumoAguaService.verificarAlerta(userId);
  }
}
