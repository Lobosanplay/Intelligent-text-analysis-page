import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ChatPage from "./pages/chat/ChatPage";
import DashboardLayout from "./pages/dashboard/components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Main from "./pages/main/Main";
import ProtectedRoutes from "./shared/components/ProtedRoutes";

const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "chat",
            children: [
              { path: "new", element: <ChatPage /> },
              { path: ":chatId", element: <ChatPage /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
