import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { SetoresControllerGetSetoresMethodQueryResponse } from '../models/SetoresControllerGetSetoresMethod.ts'

export function getSetoresControllerGetSetoresMethodUrl() {
  return `http://mercadosapi.prod.ethos/setores` as const
}

/**
 * {@link /setores}
 */
export async function setoresControllerGetSetoresMethod(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<SetoresControllerGetSetoresMethodQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getSetoresControllerGetSetoresMethodUrl().toString(),
    ...requestConfig,
  })
  return res.data
}