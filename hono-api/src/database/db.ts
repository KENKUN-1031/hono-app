import postgres from 'postgres'
import type { Env } from '../types/env'

export const getSql = (bindings: Env['Bindings']) => {
  return postgres(bindings.DATABASE_URL, { ssl: 'require' })
}
