import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginSeller, RegisterSeller, Index, BrowseProducts } from './pages/pages'
import { Dashboard, UpdateProfile } from './Admin/admin'
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
      },
      {
        path: '/browse-products',
        element: <BrowseProducts />
      }
    ]
  },
  {
    path: '/user/dashboard',
    element: <SellerAccountLayout />,
    children: [
      {
        path: '/user/dashboard',
        element: <Dashboard />
      },
      {
        path: '/user/dashboard/profile',
        element: <UpdateProfile />
      }
    ]
  }
]

const App = () => {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App