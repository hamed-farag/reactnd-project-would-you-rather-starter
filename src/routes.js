import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";

const publicPages = [
  {
    id: "a9sd8fusndf",
    component: RegisterPage,
    path: "/register",
  },
  {
    id: "s98df7s97dfj",
    component: LoginPage,
    path: "/login",
  },
];

const privatePages = [
  {
    id: "duyvtsdc877ddss",
    component: HomePage,
    path: "/",
  },
];

export default {
  publicPages,
  privatePages,
};
