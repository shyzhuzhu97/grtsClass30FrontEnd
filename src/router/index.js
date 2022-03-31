import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import("../views/login.vue")
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index.vue"),
    children: [
      {
        path: "/index",
        name: "statement.vue",
        component: () => import("../views/statement.vue")
      }
      ,
      {
        path: "/showDishCategory",
        name: "showDishCategory",
        component: () => import("../views/showDishCategory.vue")
      }
      ,
      {
        path: "/addDishCategory",
        name: "addDishCategory",
        component: () => import("../views/addDishCategory.vue")
      }
      ,
      {
        path: "/addDish",
        name: "addDish",
        component: () => import("../views/addDish.vue")
      }
      ,
      {
        path: "/showDish",
        name: "showDish",
        component: () => import("../views/showDish.vue")
      }
    ]
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue")
  },
  {
    path: "/active",
    name: "active",
    component: () => import("../views/active.vue")
  }
]


const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path == "/" || to.path == "/register"||to.path == "/active") {
    next();//一定要让用户访问到登录 注册 激活页面
  } else {
    let nickName = sessionStorage.getItem("nickName");
    if (nickName != null) {
      next();
    } else {
      next("/");
    }
  }
});

export default router
