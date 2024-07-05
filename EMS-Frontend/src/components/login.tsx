const Login = () => {
  return (
    <div className="loginPage">
      <div className="loginForm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Form</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2"><strong>Email:</strong></label>
            <input className="inputField focus" type="email" name="email" autoComplete="off" placeholder="Enter Email"></input>
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block font-bold mb-2"><strong>Password:</strong></label>
            <input className="inputField focus" type="password" name="password" placeholder="Enter Password"></input>
          </div>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login;