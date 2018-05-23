import Login from '../containers/Login'
import Register from '../containers/Register'
import ForceComponent from '../components/force'

export const routes = [
  { path: '/login', component: Login, requireAuth: false },
  { path: '/register', component: Register, requireAuth: false },
  { path: '/', component: ForceComponent, requireAuth: true }
]
