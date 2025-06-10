export type ResSetorDTO = {
  /**
   * @description ID único do setor (gerado automaticamente)
   * @type number
   */
  readonly idSetor: number
  /**
   * @description Nome do setor
   * @type string
   */
  setor: string
  /**
   * @description Operação associada ao setor
   * @maxLength 5
   * @type string
   */
  operacao: string
}