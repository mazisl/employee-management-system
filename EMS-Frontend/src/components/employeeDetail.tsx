import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployee } from "../contexts/employee.context";

const EmployeeDetail = () => {

  const {employee, setEmployee} = useEmployee();

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail/' + id)
      .then(result => {
        setEmployee(result.data[0])
      })
      .catch(err => console.log(err))
  }, [])

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
    .then(result => {
      if(result.data.Status) {
        localStorage.removeItem("valid")
        navigate('/')
      }
    }).catch(err => console.log(err))
  }

  return (
    <div>
        <div className="text-2xl font-semibold p-2 flex justify-center shadow-md mb-8">
            <h4>Employee Management System</h4>
        </div>
        <div className="flex flex-col items-center mt-3">
            <img src={`http://localhost:3000/Images/` + employee.image} className="w-40 h-40 rounded-full"/>
            <div className="flex flex-col items-center mt-5 text-lg font-semibold">
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Salary: ${employee.salary}</h3>
                <h3>MOHRE ID: ${employee.mohre_id}</h3>
            </div>
            <div className="flex mt-4">
                <button className="btn mr-2">Edit</button>
                <button className="btn bg-red-500 hover:bg-red-700" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
);

}

export default EmployeeDetail;