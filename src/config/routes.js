import Login from '../containers/Login'
import Register from '../containers/Register'
import ForceComponent from '../components/force'

export const routes = [
  { path: '/login', component: Login, meta: { requireAuth: false } },
  { path: '/register', component: Register, meta: { requireAuth: false } },
  { path: '/', component: ForceComponent, meta: { requireAuth: true } }
]
