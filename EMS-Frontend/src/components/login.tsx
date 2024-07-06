import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginFormDetails {
  email: string;
  password: string;
}

const Login = () => {

  const [loginDetails, setLoginDetails] = useState<LoginFormDetails>({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({...loginDetails, email: e.target.value})
  }

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, password: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/admin-login', loginDetails)
      .then((result) => {
        if (result.data.loginStatus) {
          navigate('/dashboard')
        } else {
          setError(result.data.Error)
        }        
      })
      .catch((err) => console.log(err))
  };

  return (
    <div className="loginPage">
      <div className="loginForm">
        <div className="font-bold text-red-500">{error && error}</div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2"><strong>Email:</strong></label>
            <input className="inputField focus" type="email" name="email" autoComplete="off" placeholder="Enter Email" onChange={handleEmailInputChange}></input>
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block font-bold mb-2"><strong>Password:</strong></label>
            <input className="inputField focus" type="password" name="password" placeholder="Enter Password" onChange={handlePasswordInputChange}></input>
          </div>
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;