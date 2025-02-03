import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import AboutUs from "./pages/AboutUs";
import MainLayout from "./layouts/MainLayout";
import AdminOnly from "./routeProtection/AdminOnly";
import CreateProduct from "./pages/adminPages/CreateProduct";
import Checkout from "./pages/customerPages/Checkout";
import CustomerOnly from "./routeProtection/CustomerOnly";
import CustomerDashboards from "./pages/dashboards/CustomerDashboards";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import AdminProducts from "./pages/adminPages/AdminProducts";
import AllUsers from "./pages/adminPages/AllUsers";
import AllOrders from "./pages/adminPages/AllOrders";
import NotFound from "./routeProtection/NotFound";
import Login from "./pages/Login";
import LoggedOutOnly from "./routeProtection/LoggedOutOnly";
import UpdateProduct from "./pages/adminPages/UpdateProduct";
import UserDetails from "./pages/adminPages/UserDetails";
import SignUp from "./pages/SignUp";
import PaymentSuccessful from "./pages/payments/PaymentSuccessful";
import PaymentFailed from "./pages/payments/PaymentFailed";
import OrderDetails from "./pages/adminPages/OrderDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <Product />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/login",
        element: (
          <LoggedOutOnly>
            <Login />
          </LoggedOutOnly>
        ),
      },
      {
        path: "/register",
        element: (
          <LoggedOutOnly>
            <SignUp />
          </LoggedOutOnly>
        ),
      },
      {
        path: "/create-product",
        element: (
          <AdminOnly>
            <CreateProduct />
          </AdminOnly>
        ),
      },
      {
        path: "/update-product/:productId",
        element: (
          <AdminOnly>
            <UpdateProduct />
          </AdminOnly>
        ),
      },
      {
        path: "/customer-dashboard",
        element: (
          <CustomerOnly>
            <CustomerDashboards />
          </CustomerOnly>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <AdminOnly>
            <AdminDashboard />
          </AdminOnly>
        ),
      },
      {
        path: "/users",
        element: (
          <AdminOnly>
            <AllUsers />
          </AdminOnly>
        ),
      },
      {
        path: "/users/:userId",
        element: (
          <AdminOnly>
            <UserDetails />
          </AdminOnly>
        ),
      },
      {
        path: "/orders",
        element: (
          <AdminOnly>
            <AllOrders />
          </AdminOnly>
        ),
      },
      {
        path: "/orders/:orderId",
        element: (
          <AdminOnly>
            <OrderDetails />
          </AdminOnly>
        ),
      },
      {
        path: "/admin-products",
        element: (
          <AdminOnly>
            <AdminProducts />
          </AdminOnly>
        ),
      },
      {
        path: "/checkout/:productId",
        element: (
          <CustomerOnly>
            <Checkout />
          </CustomerOnly>
        ),
      },
      {
        path: "/successful-payment",
        element: (
          <CustomerOnly>
            <PaymentSuccessful />
          </CustomerOnly>
        ),
      },
      {
        path: "/failed-payment",
        element: (
          <CustomerOnly>
            <PaymentFailed />
          </CustomerOnly>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
