import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginSeller, RegisterSeller, Index, BrowseProducts } from './pages/pages'
import { Dashboard, UpdateProfile, AddProduct, Setting, User_wallet, Listing_container, UpdateProduct } from './Admin/admin'
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
    path: '/user',
    element: <SellerAccountLayout />,
    children: [
      {
        path: '/user/dashboard',
        element: <Dashboard />
      },
      {
        path: '/user/profile',
        element: <UpdateProfile />
      },
      {
        path: '/user/add-product',
        element: <AddProduct />
      },
      {
        path: '/user/my-listing',
        element: <Listing_container />
      },
      {
        path: '/user/update/:listing_slug',
        element: <UpdateProduct />
      },
      {
        path: '/user/my-wallet',
        element: <User_wallet />
      },
      {
        path: '/user/settings',
        element: <Setting />
      }
    ]
  }
]

const App = () => {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App