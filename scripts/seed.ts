// scripts/seed.ts
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ SUPABASE_URL または SUPABASE_SERVICE_ROLE_KEY が未設定です。')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

const run = async () => {
  try {
    const { error } = await supabase.from('blog_posts').insert([
      { title: 'わああい', content: 'こんにちわcontext' },
      // { title: '新幹線の安全技術', content: '最新の自動運転支援技術の導入' },
      // { title: 'リニア開発の進捗', content: '次世代交通への第一歩' }
    ])

    if (error) throw error

    console.log('✅ Seed executed successfully.')
  } catch (err) {
    console.error('❌ Seeding failed:', err)
  }
}

run()
