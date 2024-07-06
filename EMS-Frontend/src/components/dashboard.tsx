import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faUsers, faLayerGroup, faCircleUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="flex flex-col h-full">
        <div className="p-4 mt-5">
          <Link to='/dashboard' className='text-2xl font-bold'>EMS - Yarmouk</Link>
        </div>
        <ul className="flex flex-col space-y-2 p-4">
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
            <Link to='/dashboard/category' className='flex items-center space-x-2 p-2'>
              <FontAwesomeIcon icon={faLayerGroup} />
              <span>Category</span>
            </Link>
          </li>
          <li className="rounded-lg hover:bg-gray-700">
            <Link to='/dashboard/profile' className='flex items-center space-x-2 p-2'>
              <FontAwesomeIcon icon={faCircleUser} />
              <span>Profile</span>
            </Link>
          </li>
          <li className="rounded-lg hover:bg-gray-700">
            <Link to='' className='flex items-center space-x-2 p-2'>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard;