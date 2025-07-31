// src/routes/blog.ts
import { Hono } from 'hono'
import type { Env } from '../types/env'
import { getSupabaseClient } from '../lib/supabaseClient'

const app = new Hono<{ Bindings: Env['Bindings'] }>()

// 全件取得
app.get('/', async (c) => {
  const supabase = getSupabaseClient(c.env)
  const { data, error } = await supabase.from('blog_posts').select('*')

  if (error) {
    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

// 単一ID指定で取得
app.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const supabase = getSupabaseClient(c.env)

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return c.notFound()
  }

  return c.json(data)
})

// 新規作成（Create）
app.post('/', async (c) => {
  const supabase = getSupabaseClient(c.env)
  const { title, content } = await c.req.json()

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ title, content }])
    .select()
    .single()

  if (error) {
    return c.json({ error: error.message }, 500)
  }

  return c.json(data, 201)
})

// 削除（Delete）
app.delete('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const supabase = getSupabaseClient(c.env)

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    return c.json({ error: error.message }, 500)
  }

  return c.json({ message: '削除に成功しました' })
})

export default app
