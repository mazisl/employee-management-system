import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useEmployee } from "../contexts/employee.context";

interface TEmployeeDetailsEdit {
  name: string;
  email: string;
  salary: string;
  job_title_id: string;
  join_date: string;
  visa_expiry_date: string;
  mohre_id: string;
  work_permit_expiry_date: string;
}

const EditEmployee = () => {

  const {jobTitle, setJobTitle } = useEmployee();

  const [employeeDetails, setEmployeeDetails] = useState<TEmployeeDetailsEdit>({
    name: "",
    email: "",
    salary: "",
    job_title_id: "",
    join_date: "",
    visa_expiry_date: "",
    mohre_id: "",
    work_permit_expiry_date: ""
  });

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/job-title')
    .then(result => {
      if (result.data.Status) {
        setJobTitle(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))

    axios.get('http://localhost:3000/auth/employee/'+id)
      .then(result => {
        if (result.data.Status) {
          const { name, email, salary, job_title_id, join_date, visa_expiry_date, mohre_id, work_permit_expiry_date } = result.data.Result[0];
          setEmployeeDetails({ name, email, salary, job_title_id, join_date, visa_expiry_date, mohre_id, work_permit_expiry_date });
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Selected value: ${value}`);
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put('http://localhost:3000/auth/edit-employee/'+id, employeeDetails)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/employees')
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="p-8 rounded shadow-md w-full max-w-sm border-4 border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Employee</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name
            </label>
            <input
              className="inputField focus"
              type="text"
              name="name"
              placeholder="Enter Name"
              value={employeeDetails.name}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              className="inputField focus"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={employeeDetails.email}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="block font-bold mb-2">
              Salary
            </label>
            <input
              className="inputField focus"
              type="text"
              name="salary"
              placeholder="Enter Salary"
              value={employeeDetails.salary}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="jobTitle" className="block font-bold mb-2">
              Job Title
            </label>
            <select
              id="jobTitle"
              className="inputField cursor-pointer bg-white border-gray-300 py-2 px-4 pr-8 focus"
              name="job_title_id"
              value={employeeDetails.job_title_id}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Select Job Category</option>
              {jobTitle.map((job) => {
                return (
                  <option key={job.ID} value={job.ID}>
                    {job.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="join_date" className="block font-bold mb-2">
              Join Date
            </label>
            <input
              className="inputField focus"
              type="date"
              name="join_date"
              placeholder="Select Join Date"
              value={employeeDetails.join_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="visa_expiry_date" className="block font-bold mb-2">
              Visa Expiry Date
            </label>
            <input
              className="inputField focus"
              type="date"
              name="visa_expiry_date"
              placeholder="Select Visa Expiry Date"
              value={employeeDetails.visa_expiry_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mohre_id" className="block font-bold mb-2">
              MOHRE ID
            </label>
            <input
              className="inputField focus"
              type="text"
              name="mohre_id"
              placeholder="Enter MOHRE ID number"
              value={employeeDetails.mohre_id}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="mb-4">
            <label htmlFor="work_permit_expiry_date" className="block font-bold mb-2">
              Work Permit Expiry Date
            </label>
            <input
              className="inputField focus"
              type="date"
              name="work_permit_expiry_date"
              placeholder="Select Work Permit Expiry Date"
              value={employeeDetails.work_permit_expiry_date}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn" type="submit">
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee;