import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const NewProjectForm = ({open, onClose}) => {
  const inputStyles =
    "w-[80%] mx-auto my-4 text-sm pl-2 border py-2 rounded-lg";
  const errMsg = "text-red-700";
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem('clientToken');
  const onSubmit = async (data, e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
      return;
    } else {
      try {
        axios.post(`${import.meta.env.VITE_BASE_URL}/client/project`, data, {
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            }
          })
            .then((res) => {
                
                toast.success("Project added Successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                onClose();
            })
            .catch((err) => {               
                if(err.response.status === 409) {
                    return toast.error(`${err.response.data}`, {
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
            });
        
      } catch (error) {
        toast.error("Failed Complete the process !!!", {
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
    }
  };

  if(!open) return null;
  return (
    <>
        <div style={overlay_style} onClick={onClose} />
        <div style={body_style}>
        <form
        className=" bg-slate-200 text-center items-center rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="py-8 uppercase text-2xl font-bold">New Project</p>
        <input
          className={inputStyles}
          type="text"
          placeholder="TITLE"
          {...register("title", {
            required: true,
            maxLength: 30,
          })}
        />
        {errors.title && (
          <p className={errMsg}>
            {errors.title.type === "required" && "This field is required."}
            {errors.title.type === "maxLength" && "Max length is 30 char."}
          </p>
        )}

        <input
          className={inputStyles}
          type="text"
          placeholder="DESCRIPTION"
          {...register("description", {
            required: "This field is required.",
            maxLength: 100,
          })}
        />
        {errors.description && 
        <p className={errMsg}>
            {errors.description.type === "required" && "This field is required."}
            {errors.description.type === "maxLength" && "Max length is 100 char."}
        </p>}

        <br />
        <button
          type="submit"
          className="py-2 px-5 bg-gray-800 text-white mb-4 mt-2 rounded-lg hover:bg-green-500"
        >
          ADD PROJECT
        </button>
      </form>
    </div>
    </>
  )
}

export default NewProjectForm