import AddCategory from "./components/addCategory";
import AddEmployee from "./components/addEmployee";
import Category from "./components/category";
import Dashboard from "./components/dashboard";
import Employee from "./components/employee";
import Home from "./components/home";
import Login from "./components/login";
import Profile from "./components/profile";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin-login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/add-category" element={<AddCategory />}></Route>          
          <Route path="/dashboard/add-employee" element={<AddEmployee />}></Route>
        </Route>
      </Routes>   
    </>
  )
}

export default App;