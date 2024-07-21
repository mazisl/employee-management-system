import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface Employee {
  id: number;
  name: string;
  image: File | null;
  email: string;
  salary: string;
}

const Employee = () => {

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
    .then(result => {
      if (result.data.Status) {
        setEmployees(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }, [])

  const handleDelete = (id: number) => {
    axios.delete('http://localhost:3000/auth/delete-employee/'+id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload()
        } else {
          alert(result.data.Error)
        }
      })
  }
  
  return (
    <div className="px-5 mt-5 border-dotted border-black border-2 pt-2">
      <div className="flex justify-center">
        <h3 className="text-2xl font-semibold">Employee List</h3>
      </div>
      <Link to='/dashboard/add-employee' className=' bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded'>
        Add Employee
      </Link>
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="employee-th">Name</th>
              <th className="employee-th">Image</th>
              <th className="employee-th">Email</th>
              <th className="employee-th">Salary</th>
              <th className="employee-th">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((e, i) => {
              return (
                <tr key={i}>
                  <td className="employee-td">{e.name}</td>
                  <td className="employee-td">
                    <img className="w-10 h-10 rounded-full" src={`http://localhost:3000/images/`+ e.image} alt="" />
                  </td>
                  <td className="employee-td">{e.email}</td>
                  <td className="employee-td">{e.salary}</td>
                  <td className="employee-td">
                    <Link className="py-1 px-3 bg-[#32a893] rounded-lg mr-2" to={`/dashboard/edit-employee/`+e.id}>Edit</Link>
                    <button className="py-1 px-3 bg-[#edd521] rounded-lg" onClick={() => handleDelete(e.id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee;