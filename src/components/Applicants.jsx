import React from 'react'

const body_style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    width:'40rem',
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    padding: "5rem",
    zIndex: 1000,
  };
  
  const overlay_style = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb( 0, 0, 0, .7 )",
    zIndex: 1000,
  };

const Applicants = ({open, onClose, applicants}) => {
  
  if(!open) return null;
  return (
    <>
        <div style={overlay_style} onClick={onClose} />
        <div style={body_style}>
            {applicants.map((item, i) => (
              <div className='flex border-b' key={i}>
                <p className='mr-8'>{item.name}</p>
                <p>{item.email}</p>
              </div>
            ))}
        </div>
    </>
  )
}

export default Applicants