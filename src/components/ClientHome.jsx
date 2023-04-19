import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import NewProjectForm from './NewProjectForm';
import Project from './Project';

const ClientHome = () => {
  const [projects, setProjects] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const token = localStorage.getItem('clientToken');
  useEffect(() =>{

    axios.get(`${import.meta.env.VITE_BASE_URL}/client/projects`, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        
        setProjects(res.data[0])
        
      })
      .catch((err) => {
        if(err.response.data === 'authentication failed'){
            toast.error(`${err.response.data}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/client/login')
        }
      })
  },[open])
  const logout = () => {
    localStorage.removeItem('clientToken')
    navigate('/client/login')
    toast.success(`Logged out successfully`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
  });
  }
  return (
    <div className=''>
        <div className='flex justify-between items-center'>
          <button className='m-10 px-12 py-2 rounded-md border bg-blue-400 text-white hover:bg-slate-500' onClick={() => setOpen(true)}>Add new Project</button>
          <button className='mr-32 text-white border rounded-md bg-red-500 hover:bg-black px-4 py-2' onClick={() => logout()}>Logout</button>
        </div>
        <NewProjectForm open={open} onClose={() => setOpen(false)} />
        <div className='flex justify-between my-6 w-[80%] mx-auto'>
            <p className='ml-32 text-lg font-semibold'>TITLE</p>
            <p className='text-lg font-semibold'>DESCRIPTION</p>
            <p className='mr-32 text-lg font-semibold'>View Applicants</p>            
        </div>
        {
            projects?.projects?.map((project, i) => (
                <Project project={project} key={i} />
            ))
        }
    </div>
  )
}

export default ClientHome