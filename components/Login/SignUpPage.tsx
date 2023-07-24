"use client";

import React, { useEffect, useState, useRef } from "react";
import Button from "../Button";
import { SignUpFormState } from "@/common.types";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { motion as m } from "framer-motion";
import { getSession, signIn } from "next-auth/react";
import Lable from "../Input/Lable";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";

// icons
import { AiOutlineLeft, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

type ShowState = {
  password: boolean;
  cPassword: boolean;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormState>();

  const [isMail, setIsMail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [show, setShow] = useState<ShowState>({
    password: false,
    cPassword: false,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormState> = async (data) => {
    if (checkbox) {
      if (data.password != password) {
        setInvalid(true);
        return;
      } else {
        setInvalid(false);
        try {
          const userRef = doc(db, "userCollection", data.email);
          const querySnapshot = await getDoc(userRef);
          if (querySnapshot.exists()) {
            setUserExists(true);
            return;
          } else {
            setUserExists(false);
            console.log("no user");
            const hashPassword = await hash(data.password, 10);
            const updatedData = {
              ...data,
              id: uuidv4(),
              password: hashPassword,
              image:
                "https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg",
              description: "",
              githubUrl: "",
              linkedInUrl: "",
              provider: "credentials",
            };
            await setDoc(userRef, updatedData);
            router.push("/AuthPage/login");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const signUpWithGoogle = async () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play();
    }
  }, []);

  return (
    <div className="flex items-center justify-between h-screen lg:h-auto lg:items-start">
      <div className=" w-[35%] lg:flex items-center justify-center h-screen sticky top-0 left-0 hidden ">
        <video
          loop
          autoPlay
          className=" w-full h-full object-cover"
          ref={videoRef}
          muted
        >
          <source
            src="https://cdn.dribbble.com/uploads/48292/original/30fd1f7b63806eff4db0d4276eb1ac45.mp4?1689187515"
            type="video/mp4"
          />
        </video>
        <Link href="/" className="absolute top-10 left-10">
          <div className="w-24 h-24">
            <Image
              alt="logo"
              src="/logo-white.svg"
              width={90}
              height={90}
              priority
              className="w-auto h-auto object-contain"
            />
          </div>
        </Link>
        <p className=" font-normal text-white absolute bottom-10 left-10">
          @akash
        </p>
      </div>
      <div className=" w-full lg:w-[65%] px-10 sm:px-[100px] md:px-[200px] lg:px-[100px] xl:px-[200px] flex items-center justify-center py-10 m-auto relative">
        {isMail && (
          <Button
            midIcon={<AiOutlineLeft />}
            className=" absolute top-10 left-[420px] sm:left-10 border-2
               hover:border-gray-300 border-gray-200"
            handleClick={() => setIsMail(false)}
          />
        )}
        <div className="w-full flex flex-col gap-6">
          <h2 className=" text-2xl font-bold text-c-dark">
            Sign up to Dribbble
          </h2>
          {!isMail ? (
            <div className=" overflow-hidden">
              <m.div
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 w-full"
              >
                <Button
                  title="Sign up with Google"
                  leftIcon={<FcGoogle size={20} />}
                  className=" flex items-center gap-3 w-full justify-center 
                        bg-c-dark text-white border-2 border-c-dark
                         hover:bg-gray-700 py-4 font-semibold text-sm"
                  handleClick={() => signUpWithGoogle()}
                />
                <div className=" flex items-center gap-4 w-full">
                  <div className=" w-full h-[0.5px] bg-gray-300" />
                  <p>Or</p>
                  <div className=" w-full h-[0.5px] bg-gray-300" />
                </div>
                <Button
                  title="Continue with email"
                  className=" w-full border-2 border-gray-200 py-4 font-semibold text-sm hover:border-gray-300"
                  handleClick={() => setIsMail(true)}
                />
                <div className=" w-full flex flex-col gap-6 mt-6">
                  <p className=" text-center text-xs">
                    By creating an account you agree with our{" "}
                    <a
                      href="https://dribbble.com/terms"
                      target="_blank"
                      className=" underline"
                    >
                      Terms of Service
                    </a>
                    ,{" "}
                    <a
                      href="https://dribbble.com/privacy"
                      target="_blank"
                      className=" underline"
                    >
                      Privacy Policy
                    </a>
                    , and our default{" "}
                    <a
                      href="https://dribbble.com/notifications"
                      target="_blank"
                      className=" underline"
                    >
                      Notification Settings
                    </a>
                    .
                  </p>
                  <p className=" text-base text-c-dark text-center">
                    Already have an account?{" "}
                    <Link href="/AuthPage/login" className=" underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </m.div>
            </div>
          ) : (
            <>
              <m.form
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className=" w-full flex flex-col gap-6 mt-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className=" flex items-center justify-between gap-4">
                  <div className="flex flex-col items-start w-1/2 gap-2">
                    <Lable id="input_name" lable="Name" />
                    <input
                      id="input_name"
                      aria-invalid={errors.name ? "true" : "false"}
                      {...register("name", { required: true, maxLength: 30 })}
                      className="authform_inputfield"
                    />
                  </div>
                  <div className=" flex flex-col items-start w-1/2 gap-2">
                    <Lable id="input_username" lable="Username" />
                    <input
                      id="input_username"
                      aria-invalid={errors.username ? "true" : "false"}
                      {...register("username", {
                        required: true,
                        maxLength: 30,
                      })}
                      className="authform_inputfield"
                    />
                  </div>
                </div>
                <div className=" flex flex-col items-start w-full gap-2">
                  <Lable id="input_mail" lable="Email" />
                  <input
                    id="input_mail"
                    aria-invalid={errors.email ? "true" : "false"}
                    type="email"
                    {...register("email", { required: true, maxLength: 30 })}
                    className="authform_inputfield"
                  />
                  {userExists && (
                    <p className=" text-sm font-semibold text-rose-500">
                      User Already Exists
                    </p>
                  )}
                </div>
                <div className=" flex flex-col items-start w-full gap-2">
                  <Lable id="input_password" lable="Password" />
                  <div className=" w-full relative">
                    <input
                      id="input_password"
                      aria-invalid={errors.password ? "true" : "false"}
                      type={show.password ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        maxLength: 30,
                      })}
                      className="authform_inputfield_password"
                      placeholder="6 + characters"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {show.password ? (
                        <AiFillEyeInvisible
                          size={20}
                          onClick={() =>
                            setShow((prevShow) => ({
                              ...prevShow,
                              password: false,
                            }))
                          }
                          className=" fill-gray-600"
                        />
                      ) : (
                        <AiFillEye
                          size={20}
                          onClick={() =>
                            setShow((prevShow) => ({
                              ...prevShow,
                              password: true,
                            }))
                          }
                          className=" fill-gray-400"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div className=" flex flex-col items-start w-full gap-2">
                  <Lable id="input_Cpassword" lable="Confirm Password" />
                  <div className=" w-full relative">
                    <input
                      type={show.cPassword ? "text" : "password"}
                      name="CheckInputPass"
                      id="input_Cpassword"
                      className={`${
                        invalid
                          ? "authform_inputfield_invalid"
                          : "authform_inputfield_password"
                      }`}
                      placeholder="Confirm password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      autoSave="off"
                      autoFocus={false}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {show.cPassword ? (
                        <AiFillEyeInvisible
                          size={20}
                          onClick={() =>
                            setShow((prevShow) => ({
                              ...prevShow,
                              cPassword: false,
                            }))
                          }
                          className=" fill-gray-600"
                        />
                      ) : (
                        <AiFillEye
                          size={20}
                          onClick={() =>
                            setShow((prevShow) => ({
                              ...prevShow,
                              cPassword: true,
                            }))
                          }
                          className=" fill-gray-400"
                        />
                      )}
                    </button>
                  </div>
                  {invalid && (
                    <p className=" text-sm font-semibold text-rose-500">
                      Password didn't match !
                    </p>
                  )}
                </div>
                <div className=" flex items-start w-full justify-between">
                  <input
                    type="checkbox"
                    onChange={() => setCheckbox((prev) => !prev)}
                    className=" w-10 h-10 focus:outline-none mr-4"
                  />
                  <p className=" text-sm text-gray-500">
                    Creating an account means you're okay with our
                    <a
                      href="https://dribbble.com/terms"
                      target="_blank"
                      className=" text-blue-500 font-semibold"
                    >
                      {" "}
                      Terms of Service
                    </a>
                    ,
                    <a
                      href="https://dribbble.com/privacy"
                      target="_blank"
                      className=" text-blue-500 font-semibold"
                    >
                      {" "}
                      Privacy Policy
                    </a>
                    , and our default{" "}
                    <a
                      href="https://dribbble.com/notifications"
                      target="_blank"
                      className=" text-blue-500 font-semibold"
                    >
                      {" "}
                      Notification Settings.
                    </a>
                  </p>
                </div>
                <Button
                  type="submit"
                  title="Create Account"
                  className=" bg-c-dark text-white 
                  hover:bg-gray-700 font-semibold w-full py-4"
                />
              </m.form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
    },
  };
}
