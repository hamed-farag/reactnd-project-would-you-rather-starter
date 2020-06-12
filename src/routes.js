import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import AddQuestionPage from "./pages/AddQuestion";
import QuestionDetails from "./pages/QuestionDetails";
import LeaderBoard from "./pages/LeaderBoard";

import NotFound from "./pages/404";

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
  {
    id: "65dsf465df46g",
    component: QuestionDetails,
    path: "/questions/:id",
  },
  {
    id: "dsf545s1s2a5f4dg5d",
    component: LeaderBoard,
    path: "/leaderboard",
  },
  {
    id: "s6e5f4w94f16w5fe2",
    component: NotFound,
    path: "*",
  },
];

export default {
  publicPages,
  privatePages,
};
