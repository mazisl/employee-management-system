import { useEffect } from "react";
import { useEmployee } from "../contexts/employee.context";

const AddEmployee = () => {

  const { employee, setEmployee, jobTitle, handleInputChange, handleSelectChange, handleFileChange, handleSubmit } = useEmployee();

  useEffect(() => {
    setEmployee({
      name: '',
      email: '',
      password: '',
      salary: '',
      job_title_id: '',
      image: null,
      join_date: '',
      visa_expiry_date: '',
      work_permit_expiry_date: ''
    });
  }, [])

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="p-8 rounded shadow-md w-full max-w-sm border-4 border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Employee</h2>
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
              value={employee.name}
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
              value={employee.email}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              className="inputField focus"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={employee.password}
              onChange={handleInputChange}
            ></input>
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
              value={employee.join_date}
              onChange={handleInputChange}
            />
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
              value={employee.salary}
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
              value={employee.job_title_id}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select Job Title
              </option>
              {jobTitle.map((job) => (
                <option key={job.ID} value={job.ID}>
                  {job.name}
                </option>
              ))}
            </select>
          </div><div className="mb-4">
            <label htmlFor="visa_expiry_date" className="block font-bold mb-2">
              Visa Expiry Date
            </label>
            <input
              className="inputField focus"
              type="date"
              name="visa_expiry_date"
              placeholder="Select Visa Expiry Date"
              value={employee.visa_expiry_date}
              onChange={handleInputChange}
            />
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
              value={employee.work_permit_expiry_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imgFile" className="block font-bold mb-2">
              Select Image
            </label>
            <input
              id="imgFile"
              className="inputField focus"
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <button className="btn" type="submit">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;