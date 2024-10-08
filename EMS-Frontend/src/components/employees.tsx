import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ConfirmationDialog from "./confirmationDialog"
import { useEmployee } from "../contexts/employee.context"

interface JobTitle {
  ID: number;
  name: string;
}

interface Employee {
  id: number;
  name: string;
  image: File | null;
  email: string;
  salary: string;
  join_date: string;
  visa_expiry_date: string;
  mohre_id: string;
  work_permit_expiry_date: string;
  job_title_id: number;
}

const Employees = () => {

  const {formatDate} = useEmployee();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

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

    axios.get('http://localhost:3000/auth/job-title')
      .then(result => {
        if (result.data.Status) {
          setJobTitles(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleOpenDialog = (id: number) => {
    setEmployeeToDelete(id);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const handleDelete = () => {
    if (employeeToDelete !== null) {
      axios.delete(`http://localhost:3000/auth/delete-employee/${employeeToDelete}`)
        .then(result => {
          if (result.data.Status) {
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== employeeToDelete));
          } else {
            alert(result.data.Error);
          }
          handleCloseDialog();
        })
        .catch(err => console.log(err));
    }
  };

  // Function to get job title name by ID
  const getJobTitleName = (jobId: number) => {
    const job = jobTitles.find(job => job.ID === jobId);
    return job ? job.name : 'Unknown';
  };  
  
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
              <th className="employee-th">Join Date</th>
              <th className="employee-th">Position</th>
              <th className="employee-th">Salary</th>
              <th className="employee-th">Visa Expiry</th>
              <th className="employee-th">MOHRE ID</th>
              <th className="employee-th">Work Permit Expiry</th>
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
                  <td className="employee-td">{formatDate(e.join_date)}</td>
                  <td className="employee-td">{getJobTitleName(e.job_title_id)}</td>
                  <td className="employee-td">{e.salary}</td>
                  <td className="employee-td">{formatDate(e.visa_expiry_date)}</td>
                  <td className="employee-td">{e.mohre_id}</td>
                  <td className="employee-td">{formatDate(e.work_permit_expiry_date)}</td>
                  <td className="employee-td">
                    <Link className="py-1 px-3 bg-[#32a893] rounded-lg mr-2" to={`/dashboard/edit-employee/`+e.id}>Edit</Link>
                    <button className="py-1 px-3 bg-[#edd521] rounded-lg" onClick={() => handleOpenDialog(e.id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <ConfirmationDialog isOpen={isDialogOpen} onClose={handleCloseDialog} onConfirm={handleDelete}/>
    </div>
  )
}

export default Employees;