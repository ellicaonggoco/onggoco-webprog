import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout.jsx";
import DashboardLayout from "./layouts/DashLayout.jsx";

import HomePage from "./pages/LandingPages/HomePage";
import AboutPage from "./pages/LandingPages/AboutPage";
import ArticleListPage from "./pages/LandingPages/ArticleListPage";
import ArticlePage from "./pages/LandingPages/ArticlePage";

import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage";

import NotFoundPage from "./pages/NotFoundPage";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("type");

  console.log("ProtectedRoute check:", {
    token: !!token,
    userType,
    allowedRoles,
  });

  if (!token) {
    console.log("No token, redirect to signin");
    return <Navigate to="/auth/signin" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.some((role) => role.toLowerCase() === userType?.toLowerCase())
  ) {
    console.log(`Role ${userType} not allowed, redirect to dashboard`);
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "articles", element: <ArticleListPage /> },
      { path: "articles/:name", element: <ArticlePage /> },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "reports", element: <ReportsPage /> },
      {
        path: "users",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "articles",
        element: (
          <ProtectedRoute allowedRoles={["admin", "editor"]}>
            <DashArticleListPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
