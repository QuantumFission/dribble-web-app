"use client";

import React, { useEffect, useState, useRef } from "react";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AuthFormState } from "@/common.types";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion as m } from "framer-motion";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormState>();

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    const onSubmit: SubmitHandler<AuthFormState> = async (data) => {
        const status = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: "/",
        });

        if (!status) return;

        if (!status.error) {
            router.prefetch("/");
            router.push("/");
        } else {
            toast.error(status.error);
        }
    };

    const signInWithGoogle = async () => {
        signIn("google", { callbackUrl: "http://localhost:3000" });
    };

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.play();
        }
    }, []);

    return (
        <div className="flex items-start justify-between">
            <Toaster />
            <div className=" w-[40%] lg:flex items-center justify-center h-screen sticky top-0 left-0 hidden ">
                <video
                    loop
                    autoPlay
                    className=" w-full h-full object-cover"
                    ref={videoRef}
                    muted
                >
                    <source
                        src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"
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
            <div className=" w-full lg:w-[60%] px-10 sm:px-[100px] md:px-[200px] lg:px-[100px] xl:px-[200px] flex items-center justify-center py-10 m-auto">
                <m.div
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex flex-col gap-6"
                >
                    <h2 className=" text-2xl font-bold text-c-dark">
                        Sign in to Dribbble
                    </h2>
                    <Button
                        title="Sign in with Google"
                        leftIcon={<FcGoogle size={20} />}
                        className=" flex items-center gap-3 w-full justify-center 
            border-2 border-gray-200 py-4 font-semibold text-sm hover:border-gray-300"
                        handleClick={() => signInWithGoogle()}
                    />
                    <div className=" flex items-center gap-4 w-full">
                        <div className=" w-full h-[1px] bg-gray-300" />
                        <p className=" whitespace-nowrap text-sm text-gray-600">
                            or sign in with email
                        </p>
                        <div className=" w-full h-[1px] bg-gray-300" />
                    </div>
                    <form
                        className=" w-full flex flex-col gap-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className=" flex flex-col items-start w-full gap-2">
                            <label className="font-bold text-c-dark text-sm flex flex-col gap-2 w-full">
                                Email
                                <input
                                    id="email"
                                    aria-invalid={
                                        errors.email ? "true" : "false"
                                    }
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                        maxLength: 30,
                                    })}
                                    className="authform_inputfield"
                                />
                            </label>
                        </div>
                        <div className=" flex flex-col items-start w-full gap-2">
                            <label className="font-bold text-c-dark text-sm flex flex-col gap-2 w-full">
                                Password
                                <input
                                    id="password"
                                    aria-invalid={
                                        errors.password ? "true" : "false"
                                    }
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        maxLength: 30,
                                    })}
                                    className="authform_inputfield"
                                />
                            </label>
                        </div>
                        <Button
                            type="submit"
                            title="Sign in"
                            className=" bg-c-dark text-white font-semibold
               hover:bg-gray-700 w-full py-4"
                        />
                    </form>
                    <p className=" text-base text-c-dark text-center">
                        Don't have an account?{" "}
                        <Link href="/AuthPage/signUp" className=" underline">
                            Sign up
                        </Link>
                    </p>
                </m.div>
            </div>
        </div>
    );
}
