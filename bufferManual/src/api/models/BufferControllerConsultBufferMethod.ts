export type BufferControllerConsultBufferMethodQueryParams = {
  /**
   * @description Data inicial (obrigatória)
   * @type string
   */
  startDate: string
  /**
   * @description Data final (opcional)
   * @type string | undefined
   */
  endDate?: string
}

export type BufferControllerConsultBufferMethod200 = any

export type BufferControllerConsultBufferMethodQueryResponse = BufferControllerConsultBufferMethod200

export type BufferControllerConsultBufferMethodQuery = {
  Response: BufferControllerConsultBufferMethod200
  QueryParams: BufferControllerConsultBufferMethodQueryParams
  Errors: any
}