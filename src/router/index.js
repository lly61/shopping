import Vue from 'vue'
import VueRouter from 'vue-router'


// 路由懒加载
const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/shopcart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

// 安装
Vue.use(VueRouter)


// 配置路由映射关系
const routes = [
     {
       path:'',
      //  默认重定向home页面
       redirect: '/home'
     },
     {
       path:'/home',
       component:Home,
     },
     {
       path:'/category',
       component:Category
     },
     {
       path:'/cart',
       component:Cart
     },
     {
       path:'/profile',
       component:Profile
     },
     {
       path:'/detail/:iid',
       component:Detail
     }
]

const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 将router对象传入到vue实例中
export default router
