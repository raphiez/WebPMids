// routes.js
import { Router } from "https://deno.land/x/oak/mod.ts";
import render from "./render.js";
import User from "./models.js";

const router = new Router();

router.post("/register", async (ctx) => {
  const body = await ctx.request.body();
  const formData = body.value;

  try {
    const newUser = await User.create({
      username: formData.username,
      email: formData.email,
      password: formData.password, // Note: You should hash the password in a real-world scenario
    });

    ctx.response.body = render(`Registration successful for ${newUser.username}`);
  } catch (error) {
    console.error("Registration error:", error);
    ctx.response.body = render("Registration failed");
  }
});

router.post("/login", async (ctx) => {
  const body = await ctx.request.body();
  const formData = body.value;

  try {
    const user = await User.where("email", formData.email).first();

    if (user && user.password === formData.password) {
      ctx.response.body = render(`Login successful for ${user.username}`);
    } else {
      ctx.response.body = render("Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    ctx.response.body = render("Internal Server Error");
  }
});

export default router;
