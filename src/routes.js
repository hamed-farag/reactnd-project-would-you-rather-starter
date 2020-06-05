import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

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

const privatePages = [];

export default {
  publicPages,
  privatePages,
};
