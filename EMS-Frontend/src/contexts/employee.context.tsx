import { ReactNode, createContext, useContext, useState, useEffect, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface JTitle {
  name: string;
  ID: number;
}

export interface TEmployee {
  name: string;
  email: string;
  password: string;
  salary: string;
  job_title_id: string;
  image: File | null;
  join_date: string;
  visa_expiry_date: string;
  mohre_id: string;
  work_permit_expiry_date: string;
}

interface EmployeeContextProps {
  employee: TEmployee;
  setEmployee: (value: TEmployee) => void;
  jobTitle: JTitle[];
  setJobTitle: Dispatch<SetStateAction<JTitle[]>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formatDate: (dateString: string) => string;
}

const EmployeeContext = createContext<EmployeeContextProps>({} as EmployeeContextProps);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employee, setEmployee] = useState<TEmployee>({
    name: '',
    email: '',
    password: '',
    salary: '',
    job_title_id: '',
    image: null,
    join_date: '',
    visa_expiry_date: '',
    mohre_id: '',
    work_permit_expiry_date: ''
  });

  const [jobTitle, setJobTitle] = useState<JTitle[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/job-title')
      .then((result) => {
        if (result.data.Status) {
          setJobTitle(result.data.Result);
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
    formData.append('job_title_id', employee.job_title_id);
    formData.append('join_date', employee.join_date);
    formData.append('visa_expiry_date', employee.visa_expiry_date);
    formData.append('mohre_id', employee.mohre_id);
    formData.append('work_permit_expiry_date', employee.work_permit_expiry_date);
    if (employee.image) {
      formData.append('image', employee.image);
    }
    axios.post('http://localhost:3000/auth/add-employee', formData)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/employees');
          setEmployee({
            name: '',
            email: '',
            password: '',
            salary: '',
            job_title_id: '',
            image: null,
            join_date: '',
            visa_expiry_date: '',
            mohre_id: '',
            work_permit_expiry_date: ''
          });
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const formatDate = (dateString: string) => {
    // Parse the date string
    const date = new Date(dateString);
    // Adjust to local timezone if necessary
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const value = {
    employee,
    setEmployee,
    jobTitle,
    setJobTitle,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    handleSubmit,
    formatDate
  }

  return (
    <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
