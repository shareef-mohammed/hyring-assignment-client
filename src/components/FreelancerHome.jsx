import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import FreelancerProjects from './FreelancerProjects';
import { useNavigate } from 'react-router-dom';

const FreelancerHome = () => {
    const [projects, setProjects] = useState([]);
    const token = localStorage.getItem('freelancerToken');
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/freelancer/projects`, {
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
                setProjects(res.data)    
                
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
            } else {
                console.log(err)
            }
          })
    },[])
    const logout = () => {
      localStorage.removeItem('freelancerToken')
      navigate('/freelancer/login');
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
    <div>
      <button className='text-white border rounded-md bg-red-500 hover:bg-black px-4 py-2 ml-[90%] my-8' onClick={() => logout()}>Logout</button>
        <div className='flex justify-between w-[80%] mx-auto'>
            <p className='ml-32 text-lg font-semibold'>TITLE</p>
            <p className='text-lg font-semibold'>DESCRIPTION</p>
            <p className='mr-32 text-lg font-semibold'>View Applicants</p>            
        </div>
        {
            projects?.map((project, i) => (
                <FreelancerProjects project={project.projects} key={i} />
            ))
        }
    </div>
  )
}

export default FreelancerHome