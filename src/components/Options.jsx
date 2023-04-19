import React from 'react'
import { useNavigate } from 'react-router-dom';

const Options = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div>
            <p 
                className='px-16 py-12 rounded-lg hover:bg-slate-900 cursor-pointer bg-green-400 my-10 text-white text-3xl uppercase text-center font-semibold'
                onClick={()=>navigate('/client/login')}
            >Continue as User</p>
            <p 
                className='px-16 py-12 rounded-lg hover:bg-slate-900 cursor-pointer bg-green-400 my-10 text-white text-3xl uppercase text-center font-semibold'
                onClick={()=>navigate('/freelancer/login')}
            >Continue as Freelancer</p>
        </div>
    </div>
  )
}

export default Options