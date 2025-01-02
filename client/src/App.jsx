import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginSeller, RegisterSeller, Index } from './pages/pages'
import Layout from './Layout'
import SellerAccountLayout from './SellerAccountLayout'

const routes = [
  {
    path: '/register',
    element: <RegisterSeller />,
  },
  {
    path: '/login',
    element: <LoginSeller />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Index />
      }
    ]
  },
  {
    path: '/user/dashboard',
    element: <SellerAccountLayout />,
  }
]

const App = () => {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App