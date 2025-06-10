import type { ResMercadosIntermediarioDoSetorDTO } from './ResMercadosIntermediarioDoSetorDTO.ts'

export type SetoresControllerGetSetorMercadoMethodPathParams = {
  /**
   * @type number
   */
  setorId: number
  /**
   * @type string
   */
  dia: string
}

export type SetoresControllerGetSetorMercadoMethodError = ResMercadosIntermediarioDoSetorDTO[]

export type SetoresControllerGetSetorMercadoMethodQueryResponse = any

export type SetoresControllerGetSetorMercadoMethodQuery = {
  Response: any
  PathParams: SetoresControllerGetSetorMercadoMethodPathParams
  Errors: any
}