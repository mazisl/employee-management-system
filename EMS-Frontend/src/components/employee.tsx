import { Link } from "react-router-dom"

const Employee = () => {
  return (
    <div className="px-5 mt-5 border-dotted border-black border-2 pt-2">
      <div className="flex justify-center">
        <h3 className="text-2xl font-semibold">Employee List</h3>
      </div>
      <Link to='/dashboard/add-employee' className=' bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded'>
        Add Employee
      </Link>
      <div className="mt-4"></div>
    </div>
  )
}

export default Employee;