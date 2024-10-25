import { createRouter, createWebHistory } from "vue-router";
import { useAdminStore } from "@/stores/admin/admin";
import { ElMessage } from "element-plus";
import TimeUtil from "@/utils/time/timeutil";
import Localstorage from "@/utils/localstorage/Localstorage";
// createRouter方法,用于创建路由器实例，可以管理多个路由

// 1.路由基础配置
const routes = [
  {
    path: "/",
    redirect: "/admin",
    components: {
      default: () => import("@/views/index.vue"), // 默认视图
    },
  },

  // 登录
  {
    path: "/login",
    components: {
      default: () => import("@/views/admin/login.vue"),
    },
  },

  // 后台首页
  {
    path: "/admin",
    meta: { requiresAuth: true }, // 设置身份验证
    components: {
      default: () => import("@/views/admin/home.vue"),
    },

    children: [
      /*        使用命名路由
{
        path: "administrator",
        components: {
          add: () => import("@/views/admin/adminstrator/add.vue"),
          list: () => import("@/views/admin/adminstrator/list.vue"),
        },
      }, 
*/
      {
        path: "administrator/add",
        components: {
          default: () => import("@/views/admin/adminstrator/add.vue"),
        },
      },
      {
        path: "administrator/list",
        component: () => import("@/views/admin/adminstrator/list.vue"),
      },
      {
        path: "category/list",
        component: () => import("@/views/admin/category/list.vue"),
      },
      {
        path: "administrator/edit",
        components: {
          default: () => import("@/views/admin/adminstrator/edit.vue"),
        },
      },
      {
        path: "article/list",
        components: {
          default: () => import("@/views/admin/article/list.vue"),
        },
      },
      {
        path: "article/add",
        components: {
          default: () => import("@/views/admin/article/add.vue"),
        },
      },
      {
        path: "article/edit",
        components: {
          default: () => import("@/views/admin/article/edit.vue"),
        },
      },
      {
        path: "nav/list",
        components: {
          default: () => import("@/views/admin/nav/list.vue"),
        },
      },
    ],
  },

  // demo下是学习routes使用的
  {
    path: "/content", // 使用查询字符串传递参数 http://localhost:5173/content?id=100&title=阿文编程
    component: () => import("@/views/demo/content.vue"),
    children: [
      {
        path: "query2/:id/name/:name?", // name?是可选参数 http://localhost:5173/query2/007/name/阿文
        component: () => import("@/views/demo/query2.vue"),
        meta: "query2",
      },
    ],
  },
  {
    path: "/query1/:id/name/:name", // 使用路径传递参数 http://localhost:5173/query1/007/name/阿文
    alias: ["/q1/:id/name/:name", "/q1q/:id/name/:name"], // 路由别名，注意配置成一样的
    name: "query1Name", // 命名路由
    component: () => import("@/views/demo/query1.vue"),
    meta: {
      //   title: "query1",
    },
  },

  // 嵌套路由
  {
    path: "/vip",
    component: () => import("@/views/vip.vue"),
    children: [
      // 子路由
      {
        path: "", // 默认页 http://localhost:5173/vip
        component: () => import("@/views/vip/default.vue"),
      },
      {
        path: "order", // 会员订单 http://localhost:5173/vip/order
        component: () => import("@/views/vip/order.vue"),
      },
      {
        path: "info", // 会员资料 http://localhost:5173/vip/info
        component: () => import("@/views/vip/info.vue"),
      },
    ],
  },

  //socket测试
  // {
  //   path: "/socket",
  //   components: {
  //     default: () => import("@/socket/socket.vue"),
  //   },
  // },

  // grid布局
  {
    path: "/grid",
    components: {
      default: () => import("@/interview/grid.vue"),
    },
  },

  // axios、mock接口
  {
    path: "/axmo",
    components: {
      default: () => import("@/interview/axios_mock.vue"),
    },
  },
  // 测试div缩放
  {
    path: "/scale",
    components: {
      default: () => import("@/interview/scale.vue"),
    },
  },
  // 测试懒加载
  {
    path: "/lazy",
    components: {
      default: () => import("@/interview/lazy.vue"),
    },
  },
  {
    path: "/:pathMatch(.*)*", // 路由重定向，防止跳转到不存在的路由
    redirect: "/",
  },
];

// 2.依据配置创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // console.log("to", to, "from", from);
  // console.log(to.meta.requiresAuth);  查看是否要验证

  // 身份验证(token、有效时间)
  if (to.meta.requiresAuth) {
    // console.log(to.fullPath, "需要身份验证");

    // 判断有效时间是否过期
    const adminStore = useAdminStore();
    if (adminStore.data.token === "") {
      // 正常是请求后端判断是否存在token
      // console.log("请登录");
      ElMessage.error("现在是未登录");
      router.push("/login");
    }

    // 已登录状态，判断有效时间
    let startTime = TimeUtil.now();
    let endTime = adminStore.data.expireDate;
    let timeGap = TimeUtil.timeSub(startTime, endTime);
    // console.log(timeGap);
    if (timeGap.expire) {
      ElMessage.error("登录已过期，重新登录");
      Localstorage.remove("admin");
      router.push("/login");
    }

    ElMessage({
      message: `目标路由是${to.fullPath}`,
      type: "info",
      plain: true,
    });
    next();
  } else {
    console.log(from.fullPath, "不需要身份验证");
    next();
  }
});

/*
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // 模拟登录状态
  const userRole = localStorage.getItem("role"); // 从 localStorage 获取用户角色

  if (to.name !== "Login" && !isAuthenticated) {
    // 如果用户未登录并试图访问受保护的页面，则跳转到登录页
    next({ name: "Login" });
  } else if (isAuthenticated && userRole) {
    // 动态生成路由并根据用户角色加载路由
    if (userRole === "admin" && !router.hasRoute("Admin")) {
      router.addRoute({
        path: "/admin",
        name: "Admin",
        component: Admin,
      });
    } else if (userRole === "user" && !router.hasRoute("User")) {
      router.addRoute({
        path: "/user",
        name: "User",
        component: User,
      });
    }
    next();
  } else {
    next();
  }
});
*/

// 3.向全局暴露
export default router;
