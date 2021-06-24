import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: "/test",
    name: "Test",
    meta: {
        title: 'test'
    },
    component: () => import (
    "../views/Test.vue")
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import (
        /* webpackChunkName: "login" */
        "../views/Login.vue")
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      meta: {
          title: 'dashboard'
      },
      component: () => import (
      /* webpackChunkName: "login" */
      "../views/Dashboard.vue")
  },
  {
    path: "/activitymanage/list",
    name: "activitymanage_list",
    meta: {
        title: '活动管理'
    },
    component: () => import (
    /* webpackChunkName: "login" */
    "../views/ActivitymanageList.vue")
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | hello-world`;
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
      next('/login');
  } else if (to.meta.permission) {
      // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
      role === 'admin'
          ? next()
          : next('/403');
  } else {
      next();
  }
});

export default router
