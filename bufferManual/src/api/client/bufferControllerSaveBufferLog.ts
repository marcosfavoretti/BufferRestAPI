import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { BufferControllerSaveBufferLogMutationRequest, BufferControllerSaveBufferLogMutationResponse } from '../models/BufferControllerSaveBufferLog.ts'

export function getBufferControllerSaveBufferLogUrl() {
  return `http://mercadosapi.prod.ethos/buffer` as const
}

/**
 * {@link /buffer}
 */
export async function bufferControllerSaveBufferLog(
  data: BufferControllerSaveBufferLogMutationRequest,
  config: Partial<RequestConfig<BufferControllerSaveBufferLogMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<BufferControllerSaveBufferLogMutationResponse, ResponseErrorConfig<Error>, BufferControllerSaveBufferLogMutationRequest>({
    method: 'POST',
    url: getBufferControllerSaveBufferLogUrl().toString(),
    data,
    ...requestConfig,
  })
  return res.data
}