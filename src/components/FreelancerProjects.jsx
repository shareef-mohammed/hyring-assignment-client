import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const FreelancerProjects = ({project}) => {
    const token = localStorage.getItem('freelancerToken');
    const apply = (id) => {
        axios.post(`${import.meta.env.VITE_BASE_URL}/freelancer/apply`,{id}, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            toast.success(`Applied Successfully`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
        .catch((err) => {
            if(err.response.status === 409) {
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
            }
        })
    }
  return (
    project?.map((proj, i) => (
        <div className='flex justify-between w-[80%] mx-auto border-b mt-6' key={i}>
            <p className='ml-32'>{proj?.title}</p>
            <p>{proj?.description}</p>
            <button className='mr-32 px-4 py-2 border rounded-md bg-blue-400 hover:bg-slate-500 text-white' onClick={() => apply(proj?._id)}>Apply</button>
        
        </div>
    )
  )
  )
}

export default FreelancerProjects