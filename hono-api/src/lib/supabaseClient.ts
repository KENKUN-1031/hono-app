// src/libs/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import type { Env } from '../types/env'

export const getSupabaseClient = (env: Env['Bindings']) => {
  const supabaseUrl = env.SUPABASE_URL
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY

  return createClient(supabaseUrl, supabaseKey)
}
