import AddJobTitle from "./components/addCategory";
import AddEmployee from "./components/addEmployee";
import JobTitle from "./components/category";
import Dashboard from "./components/dashboard";
import EditEmployee from "./components/editEmployee";
import Employee from "./components/employee";
import Home from "./components/home";
import Login from "./components/login";
import Profile from "./components/profile";
import { Routes, Route } from "react-router-dom";
import Start from "./components/start";
import EmployeeLogin from "./components/employeeLogin";
import EmployeeDetail from "./components/employeeDetail";
import PrivateRoute from "./components/privateRoute";

const App = () => {  

  return (
    <>
      <Routes>
        <Route path="/" element={<Start/>}></Route>
        <Route path="/admin-login" element={<Login/>}></Route>
        <Route path="/employee-login" element={<EmployeeLogin/>}></Route>
        <Route path="/employee-detail/:id" element={<PrivateRoute><EmployeeDetail /></PrivateRoute>}></Route>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute> }>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/job-title" element={<JobTitle />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/add-job-title" element={<AddJobTitle />}></Route>
          <Route path="/dashboard/add-employee" element={<AddEmployee />}></Route>
          <Route path="/dashboard/edit-employee/:id" element={<EditEmployee />}></Route>
        </Route>
      </Routes>   
    </>
  )
}

export default App;