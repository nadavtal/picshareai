import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";
// console.log(index("routes/signup.tsx"))
export default [
    index("routes/home.tsx"),
    route("signup", "routes/signup.tsx"),
    route("signin", "routes/signin.tsx"),
    route("users/:id", "routes/user.tsx", [
    ]),
    route("users/:id/admin", "routes/admin.tsx"),
    
    // layout("./auth/layout.tsx", [
    //   route("login", "./auth/login.tsx"),
    //   route("register", "./auth/register.tsx"),
    // ]),
  ] satisfies RouteConfig;
