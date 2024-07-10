import axios from "axios";
import { useEffect, useState } from "react";

type TAdmin = {
  email: string;
}

const Home = () => {

  const [adminTotal, setAdminTotal] = useState<number>(0);
  const [employeeTotal, setEmployeeTotal] = useState<number>(0);
  const [salaryTotal, setSalaryTotal] = useState<number>(0);
  const [admins, setAdmins] = useState<TAdmin[]>([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, [])

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin-count')
    .then(result => {
      if(result.data.Status) {
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee-count')
    .then(result => {
      if(result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee)
      }
    })
  }

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary-count')
    .then(result => {
      if(result.data.Status) {
        setSalaryTotal(result.data.Result[0].salary)
      }
    })
  }

  const adminRecords = () => {
    axios.get('http://localhost:3000/auth/admin-records')
    .then(result => {
      if(result.data.Status) {
        setAdmins(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
  }

  return (
    <>
      <div>
        <div className='p-3 flex justify-around mt-3 border-2 border-dotted border-blue-500'>
          <div className='flex-1 px-3 pt-2 pb-3 border shadow-sm m-1.5'>
            <div className='text-center pb-1'>
              <h4 className="text-lg font-semibold">Admin</h4>
            </div>
            <hr />
            <div className='flex justify-between mt-4'>
              <h5>Total:</h5>
              <h5>{adminTotal}</h5>
            </div>
          </div>

          <div className='flex-1 px-3 pt-2 pb-3 border shadow-sm m-1.5'>
            <div className='text-center pb-1'>
              <h4 className="text-lg font-semibold">Employee</h4>
            </div>
            <hr />
            <div className='flex justify-between mt-4'>
              <h5>Total:</h5>
              <h5>{employeeTotal}</h5>
            </div>
          </div>

          <div className='flex-1 px-3 pt-2 pb-3 border shadow-sm m-1.5'>
            <div className='text-center pb-1'>
              <h4 className="text-lg font-semibold">Salary</h4>
            </div>
            <hr />
            <div className='flex justify-between mt-4'>
              <h5>Total:</h5>
              <h5>${salaryTotal}</h5>
            </div>
          </div>
        </div>

        <div className='mt-4 px-5 pt-3'>
          <h3 className="text-2xl font-semibold mb-4">List of Admins</h3>
          <table className='min-w-full bg-white border border-gray-300'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='py-2 px-4 border-b border-gray-300 text-left'>Email</th>
                <th className='py-2 px-4 border-b border-gray-300 text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className='py-2 px-4 border-b border-gray-300'>{admin.email}</td>
                  <td className='py-2 px-4 border-b border-gray-300'>
                    <button className="py-1 px-3 bg-[#32a893] text-white rounded-lg mr-2 hover:bg-[#27806d]">
                      Edit
                    </button>
                    <button className="py-1 px-3 bg-[#edd521] text-black rounded-lg hover:bg-[#c9b517]">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home;