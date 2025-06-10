import type { BufferHistoricoDTO } from './BufferHistoricoDTO.ts'

export const resMercadosIntermediarioDoSetorDTOConsultaEnum = {
  '110': '110',
  '000': '000',
  TODOS: 'TODOS',
} as const

export type ResMercadosIntermediarioDoSetorDTOConsultaEnum =
  (typeof resMercadosIntermediarioDoSetorDTOConsultaEnum)[keyof typeof resMercadosIntermediarioDoSetorDTOConsultaEnum]

export type ResMercadosIntermediarioDoSetorDTO = {
  /**
   * @description ID único do mercado intermediário (gerado automaticamente)
   * @type number
   */
  readonly idMercadosIntermediario: number
  /**
   * @description Tipo de consulta associado ao mercado
   * @type string
   */
  consulta: ResMercadosIntermediarioDoSetorDTOConsultaEnum
  /**
   * @description Nome do mercado intermediário
   * @maxLength 255
   * @type string
   */
  nome: string
  /**
   * @description Histórico de buffers associado a este mercado.
   * @type array
   */
  histBuffer: BufferHistoricoDTO[]
}