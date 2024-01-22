import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/CleanLayout.vue'),
    children: [
      { path: '/login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: '/cadastro', name: 'register', component: () => import('pages/RegisterPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '/usuarios', name: 'users', component: () => import('pages/UsersPage.vue') },
      { path: '/marcas', name: 'brands', component: () => import('pages/BrandsPage.vue') },
      { path: '/cidades', name: 'cities', component: () => import('pages/CitiesPage.vue') },
      { path: '/produtos', name: 'products', component: () => import('pages/ProductsPage.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
