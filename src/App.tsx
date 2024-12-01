import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello, world!</h1>} />
    </Routes>
  );
}

export default App;
