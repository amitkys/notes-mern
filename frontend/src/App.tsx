import { Route, Routes } from "react-router-dom";

import SignUpUI from "./pages/signUp/signUp";
import Page from "./pages/test";

import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import Protected from "./components/Protected";

export default function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignUpUI />} path="/signup" />
      <Route element={<Protected Component={IndexPage} />} path="/" />
      <Route element={<Protected Component={Page} />} path="/test" />
    </Routes>
  );
}
