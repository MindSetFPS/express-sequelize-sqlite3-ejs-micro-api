import { createRouter, createWebHashHistory } from 'vue-router'

import Accounts from '../views/Accounts.vue'
import Calendar from '../views/Calendar.vue'
import CalendarList from '../views/CalendarList.vue'
import Details from '../views/Details.vue'
import Edit from '../views/Edit.vue'
import FoodList from '../views/FoodList.vue'
import Food from '../views/Food.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Pedidos from '../views/Pedidos.vue'
import Register from '../views/Register.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  },{
    path: '/food',
    name: 'Food',
    component: Food
  },
  {
    path: '/food/list',
    name: 'FoodList',
    component: FoodList
  },
  {
    path: '/calendar/create-menu',
    name: 'Calendar',
    component: Calendar
  },{
    path: '/calendar/list',
    name: 'Calendar List',
    component: CalendarList
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/edit/pedido/:id',
    name: 'Edit',
    component: Edit,
    props: { editType: 'pedido'}
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Details
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router


/*

,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
//    component: () => import('../views/About.vue')
//  }

*/
