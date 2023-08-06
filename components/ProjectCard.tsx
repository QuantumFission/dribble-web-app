"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion as m } from "framer-motion";
import { AiFillHeart, AiFillEye } from "react-icons/ai";
import { GoFileDirectoryFill } from "react-icons/go";
import { BsPlus } from "react-icons/bs";
import { ToolTip } from "./ui/tooltip";
import {
  FormattedString,
  FormatNumber,
  FormattedTag,
  preventBubbling,
} from "@/utils/utils";
import UserProfile from "./ui/UserProfile";
import { getUserDetails } from "@/firebase/actions";
import { SessionInterface } from "@/common.types";

type Props = {
  id: string;
  title: string;
  images: string[];
  mail: string;
  session: SessionInterface | null;
};

export default function ProjectCard({
  id,
  title,
  images,
  mail,
  session,
}: Props) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUserData = async () => {
      const user = await getUserDetails(mail);
      setUser(user);
    };
    getUserData();
  }, [mail]);

  function handleLikeClick(e: React.MouseEvent<HTMLDivElement>) {
    preventBubbling()(e);
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flexCenter flex-col rounded-2xl drop-shadow-card transition-all duration-300 gap-2"
    >
      <Link
        href={`${session ? `/project/${id}` : "/AuthPage/login"}`}
        className="w-full h-full flexCenter transition-all duration-300"
      >
        {images ? (
          <div className="min-w-[443px] min-h-[332px]  sm:min-w-[270px] sm:min-h-[200px] relative overflow-hidden">
            <Image
              alt="Project Image"
              src={images[0]}
              width={600}
              height={400}
              priority
              className="rounded-lg object-cover w-full h-full"
            />
            <m.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="project_card-title-parent"
            >
              <div className="project_card-title">
                <p className=" w-full">{FormattedString(title)}</p>
                <div className="flex items-center gap-3">
                  <div className="project_card-title-icon">
                    <GoFileDirectoryFill size={20} className=" fill-gray-500" />
                    <BsPlus
                      size={15}
                      className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%]"
                    />
                  </div>
                  <div
                    className="project_card-title-icon"
                    onClick={handleLikeClick}
                  >
                    <AiFillHeart size={18} className=" fill-gray-500" />
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        ) : (
          <div className=" w-[293px] h-[220px] bg-gray-200 animate-pulse rounded-lg" />
        )}
      </Link>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          {user ? (
            <Link href={`/profile/${user.email}`}>
              <div className=" w-full h-[24px] cursor-pointer group relative">
                <UserProfile src={user.image} width={24} height={24} />
                <ToolTip tip={user.name} />
              </div>
            </Link>
          ) : (
            <div className=" w-[24px] h-[24px] bg-gray-200 animate-pulse rounded-full" />
          )}
          {user && (
            <Link href={`/profile/${user.email}`}>
              <span className=" text-sm font-bold text-c-dark">
                {FormattedTag(user.name)}
              </span>
            </Link>
          )}
        </div>
        <div className=" flex items-center gap-2">
          <div className=" flex items-center gap-1">
            <div className=" group relative">
              <AiFillHeart
                size={16}
                className=" fill-gray-500 hover:fill-rose-500 cursor-pointer transition-all duration-200"
              />
              <ToolTip tip="like shot" />
            </div>
            <span className=" text-c-dark text-xs">{FormatNumber(28414)}</span>
          </div>
          <div className=" flex items-center gap-1">
            <AiFillEye
              size={16}
              className=" fill-gray-500 hover:fill-rose-500 cursor-pointer transition-all duration-200"
            />
            <span className=" text-c-dark text-xs">{FormatNumber(20414)}</span>
          </div>
        </div>
      </div>
    </m.div>
  );
}
