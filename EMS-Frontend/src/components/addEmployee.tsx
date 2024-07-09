import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface JCategory {
  name: string;
  ID: number;
}

interface TEmployee {
  name: string;
  email: string;
  password: string;
  salary: string;
  category_id: string;
  image: File | null;
}

const AddEmployee = () => {

  const [employee, setEmployee] = useState<TEmployee>({
    name: "",
    email: "",
    password: "",
    salary: "",
    category_id: "",
    image: null
  });

  const [jobCategory, setJobCategory] = useState<JCategory[]>([]);

  const navigate = useNavigate();

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Selected value: ${value}`);
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEmployee({ ...employee, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('salary', employee.salary);
    formData.append('category_id', employee.category_id);
    if (employee.image) {
      formData.append('image', employee.image);
    }
    axios.post('http://localhost:3000/auth/add-employee', formData)
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
              value={employee.category_id}
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
