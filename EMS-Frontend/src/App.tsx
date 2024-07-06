import Dashboard from "./components/dashboard";
import Login from "./components/login";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin-login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>   
    </>
  )
}

export default App;
