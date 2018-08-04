import Vue from 'vue'
import Router from 'vue-router'
// Containers
import Full from '@/containers/Full'
// Views
import Dashboard from '@/views/Dashboard'
// Orders
import Orders from '@/views/orders/Index.vue'
// Table Orders
import TableOrders from '@/views/table-orders/Index.vue'
// Today's Orders
import TodayOrders from '@/views/today-orders/Index.vue'
// Tables
import Tables from '@/views/tables/Index.vue'
import CreateTable from '@/views/tables/Create.vue'
import EditTable from '@/views/tables/Edit.vue'
// Recepie Menus
import RecepieMenus from '@/views/recepie-menus/Index.vue'
import CreateRecepieMenu from '@/views/recepie-menus/Create.vue'
import EditRecepieMenu from '@/views/recepie-menus/Edit.vue'
// Addon Menus
import AddonMenus from '@/views/addon-menus/Index.vue'
import CreateAddonMenu from '@/views/addon-menus/Create.vue'
import EditAddonMenu from '@/views/addon-menus/Edit.vue'
// Recepies
import Recepies from '@/views/recepies/Index.vue'
import CreateRecepie from '@/views/recepies/Create.vue'
import EditRecepie from '@/views/recepies/Edit.vue'
// Addons
import Addons from '@/views/addons/Index.vue'
import CreateAddon from '@/views/addons/Create.vue'
import EditAddon from '@/views/addons/Edit.vue'
// Hotels
import Hotels from '@/views/hotels/Index.vue'
import CreateHotel from '@/views/hotels/Create.vue'
import EditHotel from '@/views/hotels/Edit.vue'
// Contacts
import Contacts from '@/views/contacts/Index.vue'
import CreateContact from '@/views/contacts/Create.vue'
import EditContact from '@/views/contacts/Edit.vue'
// Settings
import PrimeSettings from '@/views/settings/PrimeSettings.vue'
// Reports
import OrderReport from '@/views/reports/Orders.vue'
// Auth
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
// Store
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders
        },
        {
          path: 'table-orders',
          name: 'Table Orders',
          component: TableOrders
        },
        {
          path: 'today-orders',
          name: "Today's Orders",
          component: TodayOrders
        },
        {
          path: 'tables',
          name: 'Tables',
          component: Tables
        },
        {
          path: 'tables/create',
          name: 'Create Table',
          component: CreateTable
        },
        {
          path: 'tables/:tableId/edit',
          name: 'Edit Table',
          component: EditTable
        },
        {
          path: 'recepie-menus',
          name: 'Menu Recepie Items',
          component: RecepieMenus
        },
        {
          path: 'recepie-menus/create',
          name: 'Create Menu Recepie Item',
          component: CreateRecepieMenu
        },
        {
          path: 'recepie-menus/:recepieMenuId/edit',
          name: 'Edit Menu Recepie Item',
          component: EditRecepieMenu
        },
        {
          path: 'addon-menus',
          name: 'Menu Addon Items',
          component: AddonMenus
        },
        {
          path: 'addon-menus/create',
          name: 'Create Menu Addon Item',
          component: CreateAddonMenu
        },
        {
          path: 'addon-menus/:recepieAddonId/edit',
          name: 'Edit Menu Addon Item',
          component: EditAddonMenu
        },
        {
          path: 'recepies',
          name: 'Recepies',
          component: Recepies
        },
        {
          path: 'recepies/create',
          name: 'Create Recepies',
          component: CreateRecepie
        },
        {
          path: 'recepies/:recepieId/edit',
          name: 'Edit Recepies',
          component: EditRecepie
        },
        {
          path: 'addons',
          name: 'Addons',
          component: Addons
        },
        {
          path: 'addons/create',
          name: 'Create Addons',
          component: CreateAddon
        },
        {
          path: 'addons/:addonId/edit',
          name: 'Edit Addons',
          component: EditAddon
        },
        {
          path: 'outlets',
          name: 'Outlets',
          component: Hotels
        },
        {
          path: 'outlets/create',
          name: 'Create Outlet',
          component: CreateHotel
        },
        {
          path: 'outlets/:outletId/edit',
          name: 'Edit Outlet',
          component: EditHotel
        },
        {
          path: 'contacts',
          name: 'Contacts',
          component: Contacts
        },
        {
          path: 'contacts/create',
          name: 'Create Contact',
          component: CreateContact
        },
        {
          path: 'contacts/:contactId/edit',
          name: 'Edit Contact',
          component: EditContact
        },
        {
          path: 'prime-settings',
          name: 'Prime Settings',
          component: PrimeSettings
        },
        {
          path: 'order-report',
          name: 'Order Report',
          component: OrderReport
        }
      ]
    },
    {
      path: '/',
      name: 'Auth',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})

// This is to force the user to select a company
router.afterEach((to, from) => {
  if (isNaN(store.getters.outlet.id) && store.getters.user.id) {
    if (!to.path.includes('/outlets')) router.push('/prime-settings')
  }
})

export default router
