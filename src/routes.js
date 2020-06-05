import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import AddQuestionPage from "./pages/AddQuestion";

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
  {
    id: "98d7f6g7fd8sikd",
    component: AddQuestionPage,
    path: "/questions/add",
  },
];

export default {
  publicPages,
  privatePages,
};
