import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === 'admin') {
            navigate('/dashboard')            
          } else navigate('/employee-detail/'+result.data.id)
        } else {
          navigate('/start')
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <div className="loginPage">
      <div className="loginMain">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Welcome to the Employee Management System of 
          <span className="block w-full text-center">Al Yarmouk Steel!</span>
        </h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Login As:</h2>
        <div className="flex justify-around mt-2 mb-1">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" type="button" onClick={() => {navigate('/admin-login')}}>Admin</button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none" type="button" onClick={() => {navigate('/employee-login')}}>Employee</button>
        </div>
        
      </div>
    </div>
  )
}

export default Start;