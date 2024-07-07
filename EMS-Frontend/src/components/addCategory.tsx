import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {

  const [category, setCategory] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add-category', {category})
      .then((result) => {
        if (result.data.Status) {
          navigate('/dashboard/category')
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="p-8 rounded shadow-md w-full max-w-sm border-4 border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category" className="block font-bold mb-2"><strong>Category:</strong></label>
            <input className="inputField focus" type="text" name="category" placeholder="Enter Category" onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}></input>
          </div>
          <button className="btn" type="submit">Add Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory;