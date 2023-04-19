import React, { useState } from 'react'
import Applicants from './Applicants';

const Project = ({project}) => {
  
  const [open, setOpen] = useState(false);
  return (
    <div className='flex justify-between my-3 w-[80%] mx-auto border-b'>
        <p className='ml-32 text-center'>{project?.title}</p>
        <p className=''>{project?.description}</p>
        <button className='mr-32 px-4 py-2 border rounded-md bg-blue-400 hover:bg-slate-500 text-white ' onClick={() => setOpen(true)}>VIEW</button>
        <Applicants open={open} applicants={project?.applicants} onClose={() => setOpen(false)} />
    </div>
  )
}

export default Project