import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import posts from './blogs/dbBlogs'
import auth from './auth/auth'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

// JSON整形表示 ?pretty で使用可能
app.use('*', prettyJSON())

// /auth/* に basic 認証
app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'helloHono',
  })
)

// ルーティング
app.route('/posts', posts)
app.route('/auth', auth)

// テスト用エンドポイント
app.get('/', (c) => {
  return c.text('Hello! Saryu')
})

export default app
