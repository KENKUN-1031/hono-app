import { Hono } from 'hono'
import { renderer } from './renderer'
import { prettyJSON } from 'hono/pretty-json';
// import posts from "./blogs/blogs";
import posts from "./blogs/dbBlogs";
import auth from "./auth/auth";
import { basicAuth } from "hono/basic-auth";

const app = new Hono()


app.use("*", prettyJSON()); //← jsonを見やすく出力するmiddleware(endpointの後ろに ?pretty をつけると使える　例：/posts?pretty)
app.use(
  "/auth/*",
  basicAuth({
    username: "hono",
    password: "helloHono",
  })
);

app.route("/posts", posts); //ここでblog.tsから受け取ってる
app.route("/auth", auth); //basic認証を有効にしてる

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello! Saryu</h1>)
})


export default app
