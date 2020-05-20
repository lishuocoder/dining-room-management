import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import Welcome from '../components/Welcome.vue';
import Users from '../components/user/Users.vue';
import FoodList from '../components/food/FoodList.vue';
import Password from '../components/user/Password.vue';
import OrderList from '../components/order/OrderList.vue';
import Statistics from '../components/statistics/Statistics.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  // 重定向
  {
    path: '/', redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/foodlist', component: FoodList },
      { path: '/password', component: Password },
      { path: '/orderlist', component: OrderList },
      { path: '/statistics', component: Statistics }

    ]
  }
];



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从那个路径来
  //next 是一个函数，表示放行
  //next()放行 next('/login')强制跳转
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router;
