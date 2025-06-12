import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { ItemQtdSemanaControllerListItensQueryResponse } from '../models/ItemQtdSemanaControllerListItens.ts'

export function getItemQtdSemanaControllerListItensUrl() {
  return `http://192.168.99.129:9192/item` as const
}

/**
 * {@link /item}
 */
export async function itemQtdSemanaControllerListItens(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ItemQtdSemanaControllerListItensQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getItemQtdSemanaControllerListItensUrl().toString(),
    ...requestConfig,
  })
  return res.data
}