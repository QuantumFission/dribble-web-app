import React from "react";
import { motion as m } from "framer-motion";
import { ToolTipV2 } from "../ui/tooltipV2";
import {
  ProjectInterface,
  SessionInterface,
  UserDetails,
} from "@/common.types";

// icons
import { GoFileDirectoryFill } from "react-icons/go";
import { BsPlus } from "react-icons/bs";
import { BiSolidMessageSquare } from "react-icons/bi";
import { HiPencil } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import { AiFillHeart, AiFillInfoCircle } from "react-icons/ai";
import UserProfile from "../ui/UserProfile";
import Link from "next/link";

type Props = {
  id?: string;
  session: SessionInterface | null;
  user: UserDetails | null;
};

export default function ProjectSidebarLg({ id, session, user }: Props) {
  return (
    <section className=" hidden lg:flex flex-col gap-4 absolute top-[70px] right-[40px]">
      {user && <UserProfile src={user?.image} width={40} height={40} />}
      <div className="project_sidebar-icons relative group">
        <ToolTipV2
          tip="Feedback"
          className="bg-c-dark text-white right-[50px] whitespace-nowrap"
        />
        <BiSolidMessageSquare size={18} className=" fill-c-dark" />
      </div>
      <div className="project_sidebar-icons relative group">
        <ToolTipV2
          tip="Share"
          className="bg-c-dark text-white right-[50px] whitespace-nowrap"
        />
        <IoIosShareAlt size={18} className=" fill-c-dark" />
      </div>
      <div className="project_sidebar-icons relative group">
        <ToolTipV2
          tip="Shot details"
          className="bg-c-dark text-white right-[50px] whitespace-nowrap"
        />
        <AiFillInfoCircle size={18} className=" fill-c-dark" />
      </div>
      <div className="project_sidebar-icons relative group">
        <ToolTipV2
          tip="Save shot"
          className="bg-c-dark text-white right-[50px] whitespace-nowrap"
        />
        <GoFileDirectoryFill size={20} className=" fill-c-dark" />
        <BsPlus
          size={15}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[6px] fill-white"
        />
      </div>
      <div className="project_sidebar-icons relative group">
        <ToolTipV2
          tip="Like shot"
          className="bg-c-dark text-white right-[50px] whitespace-nowrap"
        />
        <AiFillHeart size={18} className=" fill-c-dark" />
      </div>
      {session?.user?.id === user?.id && (
        <Link
          href={`/edit-project/${id}`}
          className="project_sidebar-icons relative group"
        >
          <ToolTipV2
            tip="Edit shot"
            className="bg-c-dark text-white right-[50px] whitespace-nowrap"
          />
          <HiPencil size={18} className=" fill-c-dark" />
        </Link>
      )}
    </section>
  );
}
