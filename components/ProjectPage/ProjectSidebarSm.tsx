import React from "react";
import { motion as m } from "framer-motion";
import { ToolTip } from "../ui/tooltip";
import { ProjectInterface, SessionInterface } from "@/common.types";

// icons
import { GoFileDirectoryFill } from "react-icons/go";
import { BsPlus } from "react-icons/bs";
import { BiSolidMessageSquare } from "react-icons/bi";
import { HiPencil } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import { AiFillHeart, AiFillInfoCircle } from "react-icons/ai";
import Link from "next/link";


type Props = {
  project: ProjectInterface;
  session: SessionInterface;
};


export default function ProjectSidebarSm({ project, session }: Props) {
  return (
    <m.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=' w-full flex items-center justify-between lg:hidden'
    >
      <div className=' flex items-center gap-4'>
        <div className='project_sidebar-icons relative group'>
          <GoFileDirectoryFill size={20} className=' fill-c-dark' />
          <BsPlus
            size={15}
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[6px] fill-white'
          />
          <ToolTip tip='save shot' className=' left-0' />
        </div>
        <div className='project_sidebar-icons relative group'>
          <AiFillHeart size={18} className=' fill-c-dark' />
          <ToolTip tip='like shot' className=' left-0' />
        </div>
      </div>
      <div className=' flex items-center gap-4'>
        <div className='project_sidebar-icons relative group'>
          <IoIosShareAlt size={18} className=' fill-c-dark' />
          <ToolTip tip='share' className=' left-0' />
        </div>
        <div className='project_sidebar-icons relative group'>
          <BiSolidMessageSquare size={18} className=' fill-c-dark' />
          <ToolTip tip='comment' className=' left-0' />
        </div>
        <div className='project_sidebar-icons relative group'>
          <AiFillInfoCircle size={18} className=' fill-c-dark' />
          <ToolTip tip='shot details' className=' left-[-40px]' />
        </div>
        {session?.user?.email === project?.createdBy?.email && (
          <Link href={`/edit-project/${project?.id}`} className='project_sidebar-icons relative group'>
            <HiPencil size={18} className=' fill-c-dark' />
            <ToolTip tip='edit shot' className=' left-[-20px]' />
          </Link>
        )}
      </div>
    </m.section>
  );
}
