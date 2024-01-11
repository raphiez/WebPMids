// app.js
import { Application, send } from "https://deno.land/x/oak/mod.ts"; // Use the latest version
import router from "./routes.js";
import db from "./db.js";

const app = new Application();

// Parse the request body as JSON
app.use(async (context, next) => {
  await next();

  if (context.request.hasBody) {
    const body = await context.request.body();
    if (body.type === "json") {
      context.request.body = await body.value;
    }
  }
});

// Serve static files (add this middleware)
app.use(async (context) => {
  // Try to serve static files
  try {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch (error) {
    // If there's an error, it might be a dynamic route handled by the router
    // Pass the context to the next middleware (your router)
    await router.routes()(context);
  }
});

// Use your router
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8000;

console.log(`Server is running on http://localhost:${PORT}`);

await app.listen({ port: PORT });
