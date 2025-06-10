import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { ExcelControllerCompactBuffer2ExcelMethodMutationResponse } from '../models/ExcelControllerCompactBuffer2ExcelMethod.ts'

export function getExcelControllerCompactBuffer2ExcelMethodUrl() {
  return `http://mercadosapi.prod.ethos/excel` as const
}

/**
 * {@link /excel}
 */
export async function excelControllerCompactBuffer2ExcelMethod(config: Partial<RequestConfig> & { client?: typeof client } = {}) {
  const { client: request = client, ...requestConfig } = config

  const res = await request<ExcelControllerCompactBuffer2ExcelMethodMutationResponse, ResponseErrorConfig<Error>, unknown>({
    method: 'POST',
    url: getExcelControllerCompactBuffer2ExcelMethodUrl().toString(),
    ...requestConfig,
  })
  return res.data
}