//File path: src/router/index.tsx
import { lazy } from "react";

const routers = [
  {
    path: "/",
    component: lazy(() => import("@/pages/home")),
  },
  {
    path: "/auth",
    component: lazy(() => import("@/pages/auth")),
  },
  {
    path: "/dashboard",
    component: lazy(() => import("@/pages/dashboard")), // 使用懒加载
  },
  {
    path: "/question/bank",
    component: lazy(() => import("@/pages/question-bank")), // 使用懒加载
  },
  {
    path: "/question/new",
    component: lazy(() => import("@/pages/question-new")), // 使用懒加载
  },
  {
    path: "/testpaper/new",
    component: lazy(() => import("@/pages/testpaper-new")), // 使用懒加载
  },
  {
    path: "/testpaper/detail",
    component: lazy(() => import("@/pages/testpaper-detail")), // 使用懒加载
  },
  {
    path: "/student-new",
    component: lazy(() => import("@/pages/student-new")), // 新增 student-new 页面路由
  },
];

export default routers;
