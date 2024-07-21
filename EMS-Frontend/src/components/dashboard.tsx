import {Link, Outlet, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faUsers, faLayerGroup, faCircleUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Dashboard = () => {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem('valid')
          navigate('/')
        }
      })
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="h-full w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 mt-5">
              <Link to='/dashboard' className='text-2xl font-bold'>EMS - Yarmouk</Link>
            </div>
            <ul className="flex flex-col space-y-2 p-4 flex-grow">
              <li className="rounded-lg hover:bg-gray-700">
                <Link to='/dashboard' className='flex items-center space-x-2 p-2'>
                  <FontAwesomeIcon icon={faTableColumns} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="rounded-lg hover:bg-gray-700">
                <Link to='/dashboard/employee' className='flex items-center space-x-2 p-2'>
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Manage Employees</span>
                </Link>
              </li>
              <li className="rounded-lg hover:bg-gray-700">
                <Link to='/dashboard/job-title' className='flex items-center space-x-2 p-2'>
                  <FontAwesomeIcon icon={faLayerGroup} />
                  <span>Job Title</span>
                </Link>
              </li>
              <li className="rounded-lg hover:bg-gray-700">
                <Link to='/dashboard/profile' className='flex items-center space-x-2 p-2'>
                  <FontAwesomeIcon icon={faCircleUser} />
                  <span>Profile</span>
                </Link>
              </li>
              <li className="rounded-lg hover:bg-gray-700" onClick={handleLogout}>
                <Link to='' className='flex items-center space-x-2 p-2'>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
        </div> {/*sidebar nav-links div*/}

        <div className='flex-1 flex flex-col overflow-auto'>
          <div className="flex justify-center py-4 shadow-md">
            <h4 className="text-2xl font-semibold">Employee Management System</h4>
          </div>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>    
  )
}

export default Dashboard;