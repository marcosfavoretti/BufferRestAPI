import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type {
  BufferControllerConsultBufferMethodQueryResponse,
  BufferControllerConsultBufferMethodQueryParams,
} from '../models/BufferControllerConsultBufferMethod.ts'

export function getBufferControllerConsultBufferMethodUrl() {
  return `http://mercadosapi.prod.ethos/buffer` as const
}

/**
 * {@link /buffer}
 */
export async function bufferControllerConsultBufferMethod(
  params: BufferControllerConsultBufferMethodQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<BufferControllerConsultBufferMethodQueryResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getBufferControllerConsultBufferMethodUrl().toString(),
    params,
    ...requestConfig,
  })
  return res.data
}