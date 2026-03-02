import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Main from "./pages/main/Main";

const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default routes;
