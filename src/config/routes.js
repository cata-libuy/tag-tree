import Login from '../containers/Login'
import Register from '../containers/Register'
import ForceComponent from '../components/force'
import Home from '../containers/Home'

export const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { requireAuth: false } },
  { path: '/register', name: 'Register', component: Register, meta: { requireAuth: false } },
  { path: '/', name: 'Home', component: Home, meta: { requireAuth: true } },
  { path: '/board/:boardId', name: 'Board', component: ForceComponent, meta: { requireAuth: true } }
]
