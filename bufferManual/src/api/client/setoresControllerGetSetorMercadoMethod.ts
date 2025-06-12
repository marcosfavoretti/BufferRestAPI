import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type {
  SetoresControllerGetSetorMercadoMethodQueryResponse,
  SetoresControllerGetSetorMercadoMethodPathParams,
} from '../models/SetoresControllerGetSetorMercadoMethod.ts'

export function getSetoresControllerGetSetorMercadoMethodUrl(
  setorId: SetoresControllerGetSetorMercadoMethodPathParams['setorId'],
  dia: SetoresControllerGetSetorMercadoMethodPathParams['dia'],
) {
  return `http://mercadosapi.prod.ethos/setores/${setorId}/mercados/${dia}` as const
}

/**
 * {@link /setores/:setorId/mercados/:dia}
 */
export async function setoresControllerGetSetorMercadoMethod(
  setorId: SetoresControllerGetSetorMercadoMethodPathParams['setorId'],
  dia: SetoresControllerGetSetorMercadoMethodPathParams['dia'],
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SetoresControllerGetSetorMercadoMethodQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getSetoresControllerGetSetorMercadoMethodUrl(setorId, dia).toString(),
    ...requestConfig,
  })
  return res.data
}