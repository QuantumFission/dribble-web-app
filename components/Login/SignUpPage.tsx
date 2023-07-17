"use client";

import React, { useEffect, useState, useRef } from "react";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AuthFormState } from "@/common.types";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormState>();
  const [password, setPassword] = useState<string>("");
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [userExists, setUserExists] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<AuthFormState> = async (data) => {
    if (checkbox) {
      if (data.password != password) {
        setInvalid(true);
        return;
      } else {
        setInvalid(false);
        try {
          const userRef = collection(db, 'userCollection')
          const querySnapshot = await getDocs(query(userRef, where("email", "==", data?.email)));
          if(!querySnapshot.empty) {
            setUserExists(true)
            return;
          } else {
            setUserExists(false);
            console.log("no user");
            const updatedData = {
              ...data,
              id: "",
              image: "https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg",
              description: "",
              githubUrl: "",
              linkedInUrl: "",
            };
            await addDoc(userRef, updatedData);
            router.push("/AuthPage/login")
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play();
    }
  }, []);

  return (
    <div className='flex items-start justify-between'>
      <div className=' w-[40%] flex items-center justify-center h-screen sticky top-0 left-0'>
        <video
          loop
          autoPlay
          className=' w-full h-full object-cover'
          ref={videoRef}
          muted
        >
          <source
            src='https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949'
            type='video/mp4'
          />
        </video>
        <Link href='/' className='absolute top-10 left-10'>
          <div className='w-24 h-24'>
            <Image
              alt='logo'
              src='/logo-white.svg'
              width={90}
              height={90}
              priority
              className='w-auto h-auto object-contain'
            />
          </div>
        </Link>
        <p className=' font-normal text-white absolute bottom-10 left-10'>
          @akash
        </p>
      </div>
      <div className=' w-[60%] px-[100px] lg:px-[200px] flex items-center justify-center py-10 m-auto'>
        <div className='w-full flex flex-col gap-6'>
          <h2 className=' text-2xl font-semibold text-c-dark'>
            Sign up to Dribbble
          </h2>
          <Button
            title='Sign up with Google'
            leftIcon={<FcGoogle size={20} />}
            className=' flex items-center gap-3 w-full justify-center 
            border-2 border-gray-200 py-4 font-semibold text-sm hover:border-gray-300'
          />
          <div className=' flex items-center gap-4 w-full'>
            <div className=' w-full h-[1px] bg-gray-300' />
            <p>Or</p>
            <div className=' w-full h-[1px] bg-gray-300' />
          </div>
          <form
            className=' w-full flex flex-col gap-6 mt-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=' flex items-center justify-between gap-4'>
              <div className=' flex flex-col items-start w-1/2 gap-2'>
                <label className='font-bold text-c-dark text-sm flex flex-col gap-2'>
                  Name
                  <input
                    id='name'
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name", { required: true, maxLength: 30 })}
                    className='authform_inputfield'
                  />
                </label>
              </div>
              <div className=' flex flex-col items-start w-1/2 gap-2'>
                <label className='font-bold text-c-dark text-sm flex flex-col gap-2'>
                  Username
                  <input
                    id='username'
                    aria-invalid={errors.username ? "true" : "false"}
                    {...register("username", { required: true, maxLength: 30 })}
                    className='authform_inputfield'
                  />
                </label>
              </div>
            </div>
            <div className=' flex flex-col items-start w-full gap-2'>
              <label className='font-bold text-c-dark text-sm flex flex-col gap-2 w-full'>
                Email
                <input
                  id='email'
                  aria-invalid={errors.email ? "true" : "false"}
                  type='email'
                  {...register("email", { required: true, maxLength: 30 })}
                  className='authform_inputfield'
                />
              </label>
              {userExists && (
                <p className=' text-sm font-semibold text-rose-500'>User Already Exists</p>
              )}
            </div>
            <div className=' flex flex-col items-start w-full gap-2'>
              <label className='font-bold text-c-dark text-sm flex flex-col gap-2 w-full'>
                Password
                <input
                  id='password'
                  aria-invalid={errors.password ? "true" : "false"}
                  type='password'
                  {...register("password", { required: true, maxLength: 30 })}
                  className='authform_inputfield'
                  required
                  placeholder='6 + characters'
                />
              </label>
            </div>
            <div className=' flex flex-col items-start w-full gap-2'>
              <label className='font-bold text-c-dark text-sm flex flex-col gap-2 w-full'>
                Confirm Password
                <input
                  type='password'
                  name='CheckInputPass'
                  id='CheckPassword'
                  className={`${
                    invalid
                      ? "authform_inputfield_invalid"
                      : "authform_inputfield"
                  }`}
                  placeholder='Confirm password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='off'
                  autoSave='off'
                  autoFocus={false}
                />
              </label>
              {invalid && (
                <p className=' text-sm font-semibold text-rose-500'>
                  Password didn't match !
                </p>
              )}
            </div>
            <div className=' flex items-start w-full justify-between'>
              <input
                type='checkbox'
                onChange={() => setCheckbox((prev) => !prev)}
                className=' w-10 h-10 focus:outline-none mr-4'
              />
              <p className=' text-sm text-gray-500'>
                Creating an account means you're okay with our
                <a
                  href='https://dribbble.com/terms'
                  target='_blank'
                  className=' text-blue-500 font-semibold'
                >
                  {" "}
                  Terms of Service
                </a>
                ,
                <a
                  href='https://dribbble.com/privacy'
                  target='_blank'
                  className=' text-blue-500 font-semibold'
                >
                  {" "}
                  Privacy Policy
                </a>
                , and our default{" "}
                <a
                  href='https://dribbble.com/notifications'
                  target='_blank'
                  className=' text-blue-500 font-semibold'
                >
                  {" "}
                  Notification Settings.
                </a>
              </p>
            </div>
            <Button
              type='submit'
              title='Create Account'
              // handleClick={() => handleFormSubmit()}
              className=' bg-c-dark text-white font-semibold w-full py-4'
            />
          </form>
          <p className=' text-normal text-c-dark'>
            Already a member?{" "}
            <Link href='/AuthPage/login' className=' text-blue-600'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
