import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginSeller, RegisterSeller } from './pages/pages'

const routes = [
  {
    path: '/register',
    element: <RegisterSeller />,
  },
  {
    path: '/login',
    element: <LoginSeller />,
  }
]

const App = () => {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App