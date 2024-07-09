import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface TEmployeeDetailsEdit {
  name: string;
  email: string;
  salary: string;
  category_id: string;
}

export interface Category {
  ID: number;
  name: string;
}

const EditEmployee = () => {

  const [employeeDetails, setEmployeeDetails] = useState<TEmployeeDetailsEdit>({
    name: "",
    email: "",
    salary: "",
    category_id: ""
  });
  console.log(employeeDetails)

  const [jobCategory, setJobCategory] = useState<Category[]>([]);
  console.log(jobCategory);

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
    .then(result => {
      if (result.data.Status) {
        setJobCategory(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))

    axios.get('http://localhost:3000/auth/employee/'+id)
      .then(result => {
        setEmployeeDetails({
          ...employeeDetails,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id
        })
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
          navigate('/dashboard/employee')
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
            <label htmlFor="jobType" className="block font-bold mb-2">
              Job Category
            </label>
            <select
              id="jobType"
              className="inputField cursor-pointer bg-white border-gray-300 py-2 px-4 pr-8 focus"
              name="category_id" 
              onChange={handleSelectChange}
            >
              <option value="" disabled>Select Job Category</option>
              {jobCategory.map((jobCat) => {
                return (
                  <option key={jobCat.ID} value={jobCat.ID}>
                    {jobCat.name}
                  </option>
                );
              })}
            </select>
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