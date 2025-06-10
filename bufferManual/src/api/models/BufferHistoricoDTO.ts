import type { ItemDto } from './ItemDto.ts'

export type BufferHistoricoDTO = {
  /**
   * @description ID do histórico de buffer (gerado automaticamente)
   * @type number | undefined
   */
  id?: number
  /**
   * @description Data/Hora do registro (formato ISO 8601, ex: \"2025-06-09T10:30:00.000Z\" ou \"2025-06-09\")
   * @type string, date-time
   */
  serverTime: string
  /**
   * @description Dados do item associado ao histórico de buffer
   */
  item: ItemDto
  /**
   * @description Valor do buffer
   * @type number
   */
  buffer: number
}