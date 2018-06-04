import Login from '../containers/Login'
import Register from '../containers/Register'
import BoardView from '../containers/BoardView'
import Home from '../containers/Home'

export const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { requireAuth: false } },
  { path: '/register', name: 'Register', component: Register, meta: { requireAuth: false } },
  { path: '/', name: 'Home', component: Home, meta: { requireAuth: true } },
  { path: '/board/:boardId', name: 'Board', component: BoardView, meta: { requireAuth: true } }
]
