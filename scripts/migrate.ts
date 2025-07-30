// scripts/migrate.ts
import { readFile } from 'fs/promises'
import path from 'path'
import pg from 'pg'
import dotenv from 'dotenv'

// .env または .dev.vars を読み込み
dotenv.config()

const run = async () => {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL が未設定です。`.env` または `.dev.vars` を確認してください。')
    process.exit(1)
  }

  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes('supabase.co') ? { rejectUnauthorized: false } : undefined,
  })

  const migrations = [
    '001_create_blog.sql',
    // 追加するなら '002_add_users.sql' など
  ]

  try {
    await client.connect()
    for (const file of migrations) {
      const filePath = path.resolve('db/migrations', file)
      const content = await readFile(filePath, 'utf-8')
      console.log(`📥 Running migration: ${file}`)
      await client.query(content)
    }
    console.log('✅ All migrations applied successfully.')
  } catch (err) {
    console.error('❌ Migration failed:', err)
  } finally {
    await client.end()
  }
}

run()
