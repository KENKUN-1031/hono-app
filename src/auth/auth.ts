import { Hono } from "hono";

const app = new Hono();


app.get("/page", (c) => {
  return c.text("you are authorized");
});

export default app;
