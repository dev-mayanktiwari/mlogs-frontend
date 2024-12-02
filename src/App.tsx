import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Layout } from "./components/layout/Layout";
import LoginPage from "./pages/Login";
import useUserStore from "./store/userStore";
import Post from "./pages/Post";
import Register from "./pages/Register";

function App() {
  const user = useUserStore((state) => state.user);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Layout>
  );
}

export default App;
