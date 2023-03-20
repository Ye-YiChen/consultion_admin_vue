import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registered",
    name: "Registered",
    component: () => import("../views/Registered/Registered.vue"),
    children: [
      {
        path: "add",
        name: "RegisteredAdd",
        component: () => import("../views/Registered/Add.vue"),
      },
      {
        path: "show",
        name: "RegisteredShow",
        component: () => import("../views/Registered/Show.vue"),
      },
      {
        path: "teacher",
        name: "TeacherExamine",
        component: () => import("../views/Examined/Teacher.vue"),
      },
      {
        path: "passage",
        name: "PassageExamine",
        component: () => import("../views/Examined/Passage.vue"),
      }
    ],
  },
];



const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  if(to.path == "/login"){
    next();
  }
  
  // 如果地址有token 则保存
  if (to.query.token) {
    window.localStorage.setItem("token", to.query.token);
  }


  if(!window.localStorage.getItem("token")){
    // window.location.href = "http://localhost:8080/oauth/request";
    // window.location.href = "http://localhost:8080/login";
    next("/login");
  }
  next();
})
export default router;
