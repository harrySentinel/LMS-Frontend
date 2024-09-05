"use client";
import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useRegisterMutation} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};



const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, {data,error,isSuccess}] = useRegisterMutation();

  useEffect(() => {
    if(isSuccess){
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.Data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({name, email, password }) => {
      const data = {
        name, email , password
      };
  await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-transparent w-full max-w-md p-6">
        <h1 className={`${styles.title} text-center mb-6`}>
          Join ELearning
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`${styles.label}`} htmlFor="name">
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`${
                errors.name && touched.name && "border-red-500"
              } ${styles.input} w-full p-2 text-sm`}
            />
            {errors.name && touched.name && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.name}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className={`${styles.label}`} htmlFor="email">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Loginmail@gmail.com"
              className={`${
                errors.email && touched.email && "border-red-500"
              } ${styles.input} w-full p-2 text-sm`}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.email}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <label className={`${styles.label}`} htmlFor="password">
              Enter Your Password
            </label>
            <input
              type={!show ? "password" : "text"}
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="password!@%"
              className={`${
                errors.password && touched.password && "border-red-500"
              } ${styles.input} w-full p-2 text-sm`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-2 right-2 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-2 right-2 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
            {errors.password && touched.password && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.password}
              </span>
            )}
          </div>
          <div className="mb-6">
            <input
              type="submit"
              value="Sign Up"
              className={`${styles.button} w-full p-2 text-sm`}
            />
          </div>
          <h5 className="text-center text-sm text-black dark:text-white mb-4">
            or Join With
          </h5>
          <div className="flex items-center justify-center mb-4">
            <FcGoogle size={30} className="cursor-pointer mr-2" />
            <AiFillGithub size={30} className="cursor-pointer ml-2" />
          </div>
          <h5 className="text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-[#2190ff] cursor-pointer"
              onClick={() => setRoute("Login")}
            >
              Sign in
            </span>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Signup;
