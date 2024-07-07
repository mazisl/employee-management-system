import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface JCategory {
  name: string;
  id: number;
}

interface TEmployee {
  name: string;
  email: string;
  password: string;
  salary: string;
  jobType: string;
  image: string;
}

const AddEmployee = () => {
  const [employee, setEmployee] = useState<TEmployee>({
    name: "",
    email: "",
    password: "",
    salary: "",
    jobType: "",
    image: "",
  });

  const [jobCategory, setJobCategory] = useState<JCategory[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setJobCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="p-8 rounded shadow-md w-full max-w-sm border-4 border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Employee</h2>

        <form >
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name
            </label>
            <input
              className="inputField focus"
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmployee({ ...employee, name: e.target.value })
              }
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmployee({ ...employee, email: e.target.value })
              }
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmployee({ ...employee, password: e.target.value })
              }
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            ></input>
          </div>

          <div className="mb-4">
            <label htmlFor="employee" className="block font-bold mb-2">
              Job Category
            </label>
            <select
              id="employee"
              className="inputField focus"
              name="employee"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setEmployee({ ...employee, jobType: e.target.value })
              }
            >
              {jobCategory.map((jobCat) => {
                return (
                  <option key={jobCat.id} value={jobCat.id}>
                    {jobCat.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="imgFile" className="block font-bold mb-2">
              Select Image
            </label>
            <input
              id="imgFile"
              className="inputField focus"
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmployee({ ...employee, image: e.target.value })
              }
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
