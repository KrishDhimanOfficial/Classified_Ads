import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SellerAccountLayout from './SellerAccountLayout'
import Layout from './Layout'
import {
  LoginSeller, RegisterSeller, Index, BrowseProducts, SingleListing,
  NotFound, SellerProfile
} from './pages/pages'
import {
  Dashboard, UpdateProfile, AddProduct, Setting,
  Listing_container, UpdateProduct, My_Wishlist, Audience,
  PromoteListing,
  Transactions
} from './Admin/admin'


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
      },
      {
        path: '/listing/:listing_slug',
        element: <SingleListing />
      },
      {
        path: '/user/:seller_username',
        element: <SellerProfile />
      },
      {
        path: '/not-found',
        element: <NotFound />
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
        path: '/user/my-wishlist',
        element: <My_Wishlist />
      },
      {
        path: '/user/update/:listing_slug',
        element: <UpdateProduct />
      },
      {
        path: '/user/payments',
        element: <Transactions />
      },
      {
        path: '/user/audience',
        element: <Audience />
      },
      {
        path: '/user/settings',
        element: <Setting />
      }
    ]
  },
  {
    path: '/feature/ad/:listing_slug/:id',
    element: <PromoteListing />
  }
]

const App = () => {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App