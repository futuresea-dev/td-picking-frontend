import {
  LayoutAuth,
  LayoutDefault,
  LayoutChat,
  LayoutMedia,
  RouteWrapper,
} from "@/components/layouts";

export const publicRoute = [
  {
    path: "*",
    component: () => import("@/views/error/NotFound.vue"),
  },
  {
    path: "/auth",
    component: LayoutAuth,
    meta: {
      title: "Login",
    },
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: {
          title: "Login",
        },
        component: () => import("@/views/auth/Login.vue"),
      },
    ],
  },

  {
    path: "/404",
    name: "404",
    meta: {
      title: "Not Found",
    },
    component: () => import("@/views/error/NotFound.vue"),
  },

  {
    path: "/500",
    name: "500",
    meta: {
      title: "Server Error",
    },
    component: () => import("@/views/error/Error.vue"),
  },
];

export const protectedRoute = [
  {
    path: "/",
    component: LayoutDefault,
    meta: {
      title: "home",
      icon: "",
    },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "dashboard",
          icon: "mdi-view-dashboard",
        },
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/opo",
        name: "OPO",
        meta: {
          title: "Order List",
          icon: "mdi-format-list-bulleted",
        },
        component: () => import("@/views/opo/OPO.vue"),
      },
      {
        path: "/automation",
        name: "automation",
        meta: {
          title: "automation",
          icon: "mdi-ticket",
        },
        component: () => import("@/views/automation/automation.vue"),
      },
      {
        path: "/orderlist",
        name: "orderlist",
        meta: {
          title: "Picking Order List",
          icon: "mdi-widgets",
        },
        component: () => import("@/views/list/OrderList.vue"),
      },
      {
        path: "/403",
        name: "Forbidden",
        meta: {
          title: "access_denied",
          hidden: true,
        },
        component: () => import("@/views/error/Deny.vue"),
      },
    ],
  },
];
