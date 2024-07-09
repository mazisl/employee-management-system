import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export interface Category {
  name: string;
}

const Category = () => {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
    .then(result => {
      if (result.data.Status) {
        setCategories(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="px-5 mt-5 border-dotted border-black border-2 pt-2">
      <div className="flex justify-center">
        <h3 className="text-2xl font-semibold">Category List</h3>
      </div>
      <Link to='/dashboard/add-category' className=' bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded'>
        Add Category
      </Link>
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((c, i) => {
              return (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">{c.name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Category;