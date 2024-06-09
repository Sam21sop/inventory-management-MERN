import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage/SubCategoryPage";
import LayoutComponent from "./component/layout/LayoutComponent";
import PrivateRoutes from "./component/private/PrivateRoutes";
import Login from "./component/userComponents/Login";
import Register from "./component/userComponents/Register";
import ForgotPassword from "./component/userComponents/ForgotPassword";
import LogoutModal from "./component/userComponents/LogoutModal";

function App() {

  const router = createBrowserRouter([
    {
      path: '/inventory-management',
      element: <LandingPage />,
      children: [
        {
          path: '/inventory-management',
          element: <Login />
        },
        {
          path: '/inventory-management/register',
          element: <Register />
        },
        {
          path: '/inventory-management/forgot-password',
          element: <ForgotPassword />
        }
      ]
    },
    {
      path: '/inventory-management/admin',
      element: (
        <PrivateRoutes>
          <LayoutComponent />
        </PrivateRoutes>
      ),
      children: [
        {
          path: '/inventory-management/admin',
          element: <HomePage />
        },
        {
          path: '/inventory-management/admin/product',
          element: <ProductPage />
        },
        {
          path: '/inventory-management/admin/category',
          element: <CategoryPage />
        },
        {
          path: '/inventory-management/admin/subcategory',
          element: <SubCategoryPage />
        },
        {
          path:'/inventory-management/admin/logout',
          element: <LogoutModal/>
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
