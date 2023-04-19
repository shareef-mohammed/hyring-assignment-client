import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const FreelancerSignup = () => {
    const navigate = useNavigate()
    
    const inputStyles =
      "w-[80%] mx-auto my-4 text-sm pl-2 border py-2 rounded-lg";
    const errMsg = "text-red-700";
    const {
      register,
      handleSubmit,
      trigger,
      formState: { errors },
    } = useForm();
  
    const onSubmit = async (data, e) => {
      const isValid = await trigger();
      if (!isValid) {
        e.preventDefault();
        return;
      } else {
        try {
            axios.post(`${import.meta.env.VITE_BASE_URL}/freelancer/signup`, data)
            .then((res) => {
                localStorage.setItem('freelancerToken', res.data);
                toast.success("Successfully Logged in", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/freelancer/home');
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
    return (
      <div className="w-full mt-12 flex justify-center">
        <form
          className="w-[40%] bg-slate-200 text-center items-center rounded-lg shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="my-8 uppercase text-2xl font-bold">Signup</p>
          <input
            className={inputStyles}
            type="text"
            placeholder="NAME"
            {...register("name", {
              required: true,
              maxLength: 25,
            })}
          />
          {errors.name && (
            <p className={errMsg}>
              {errors.name.type === "required" && "This field is required."}
              {errors.name.type === "maxLength" && "Max length is 25 char."}
            </p>
          )}
          <input
            className={inputStyles}
            type="text"
            placeholder="EMAIL"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors.email && (
            <p className={errMsg}>
              {errors.email.type === "required" && "This field is required."}
              {errors.email.type === "pattern" && "Invalid Email address"}
            </p>
          )}
  
          <input
            className={inputStyles}
            type="password"
            placeholder="PASSWORD"
            {...register("password", {
              required: "This field is required.",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                message:
                  "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
              },
            })}
          />
          {errors.password && <p className={errMsg}>{errors.password.message}</p>}
          <br />
          <button
            type="submit"
            className="py-2 px-5 bg-gray-800 text-white mb-4 mt-2 rounded-lg hover:bg-green-500"
          >
            SUBMIT
          </button>
          <p className="hover:underline text-red-600 cursor-pointer pb-4" onClick={() => navigate('/freelancer/login')}>Login</p>
        </form>
      </div>
    );
}

export default FreelancerSignup