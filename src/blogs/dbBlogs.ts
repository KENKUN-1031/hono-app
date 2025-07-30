// src/routes/blog.ts
import { Hono } from 'hono'
import type { Env } from '../types/env'
import { getSupabaseClient } from '../lib/supabaseClient'

const app = new Hono<{ Bindings: Env['Bindings'] }>()

app.get('/', async (c) => {
  const supabase = getSupabaseClient(c.env)
  const { data, error } = await supabase.from('blog_posts').select('*')

  if (error) {
    return c.json({ error: error.message }, 500)
  }

  return c.json(data)
})

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

app.post('/', async (c) => {
  const { title, content } = await c.req.json()
  const supabase = getSupabaseClient(c.env)

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

app.put('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const { title, content } = await c.req.json()
  const supabase = getSupabaseClient(c.env)

  const { data, error } = await supabase
    .from('blog_posts')
    .update({ title, content })
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    return c.notFound()
  }

  return c.json(data)
})

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

  return c.json({ message: 'deleted' })
})

export default app
