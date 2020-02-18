import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../components/Login.vue")
  },
  {
    path:"/home",
    name:"home",
    component:()=>import("../components/Home.vue"),
    redirect: "/welcome",
    children:[
      {
        path:"/welcome",
        name:"welcome",
        component:_=>import("../components/Welcome.vue")
      },
      {
        path:"/users",
        name:"users",
        component:_=>import("../components/user/User.vue")
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if(to.path==="/login"){
    return next();
  }
  const tokenStr=window.sessionStorage.getItem("token");
  if(!tokenStr){
    return next("/login")
  }
  next();
})

export default router
