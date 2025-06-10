

import { Inject, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { BufferHistoricoBuilder } from "src/modules/buffer/@core/builder/BufferHistorico.builder";
import { ItemQtdSemana } from "src/modules/buffer/@core/entities/ItemQtdSemana.entity";
import { CONSULTA } from "src/modules/buffer/enum/CONSULTA.enum";
import { ConsutlarItensAtivosService } from "src/modules/buffer/infra/service/ConsultarItensAtivos.service";
import { ConsultaMercadoService } from "src/modules/buffer/infra/service/ConsultarMercado.service";
import { GerenciaBuffersService } from "src/modules/buffer/infra/service/GerenciaBuffers.service";

const jobName = 'Iniciando novo dia de produção';

export class IniciaNovoDiaJob {
  private readonly logger = new Logger(IniciaNovoDiaJob.name); 

  constructor(
    @Inject(ConsutlarItensAtivosService) private consultaService: ConsutlarItensAtivosService,
    @Inject(ConsultaMercadoService) private consultaMercadoService: ConsultaMercadoService,
    @Inject(GerenciaBuffersService) private gerenciaBufferService: GerenciaBuffersService,
  ) {}

  @Cron('45 50 07 * * *', {
    name: jobName,
  })
  async job(): Promise<void> {
    this.logger.log(`Iniciando ${jobName}`, 'CRON JOB'); 

    try {
      const mercadosDisponiveis = await this.consultaMercadoService.consultarMercadosExistentes();
      const todosItensParaSalvar = []; 

      for (const mercado of mercadosDisponiveis) {
        try { 
          let itens: ItemQtdSemana[] = [];

          if (mercado.consulta === CONSULTA._000) {
            itens = await this.consultaService.itensAtivos000();
          } else if (mercado.consulta === CONSULTA._110) {
            itens = await this.consultaService.itensAtivos110();
          } else {
            this.logger.warn(`Tipo de consulta desconhecido para o mercado ${mercado.nome}: ${mercado.consulta}`);
            continue; 
          }
          const itensDoMercadoParaSalvar = itens.map(i => {
            return new BufferHistoricoBuilder()
              .capturaData()
              .comItem(i)
              .noMercado(mercado)
              .comQtdBuffer(0) 
              .build();
          });
          todosItensParaSalvar.push(...itensDoMercadoParaSalvar); 
          this.logger.debug(`Processado ${itensDoMercadoParaSalvar.length} itens para o mercado: ${mercado.nome}`);

        } catch (errorMercado) {
          this.logger.error(
            `Erro ao processar mercado ${mercado.nome}: ${errorMercado.message}`,
            errorMercado.stack, 
          );
          
        }
      }

      if (todosItensParaSalvar.length > 0) {
        await this.gerenciaBufferService.salva(...todosItensParaSalvar);
        this.logger.log(`Salvos ${todosItensParaSalvar.length} registros de BufferHistorico.`);
      } else {
        this.logger.warn('Nenhum item encontrado para salvar após processar todos os mercados.');
      }

    } catch (mainError) {
      this.logger.error(
        `Falha crítica no job ${jobName}: ${mainError.message}`,
        mainError.stack, 
      );
      throw mainError;
    } finally {
      this.logger.log(`Finalizado ${jobName}`);
    }
  }
}