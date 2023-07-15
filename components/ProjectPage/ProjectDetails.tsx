"use client";

import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import React, { useState } from "react";
import { ToolTip } from "../ui/tooltip";
import { ToolTipV2 } from "../ui/tooltipV2";
import Button from "../Button";
import Link from "next/link";
import ProjectActions from "../ProjectActions";


// icons
import { BsDot } from "react-icons/bs";
import { AiFillHeart, AiFillGithub, AiFillInfoCircle } from "react-icons/ai";
import { TbLivePhoto } from "react-icons/tb";
import UserProfile from "../ui/UserProfile";
import ProjectSidebarSm from "./ProjectSidebarSm";
import ProjectSidebarLg from "./ProjectSidebarLg";
import RelatedProjects from "../RelatedProjects";

type Props = {
  project: ProjectInterface;
  session: SessionInterface;
};

export default function ProjectDetails({ project, session }: Props) {

  const newImages = Object.values(project?.images || []);
  const renderLink = () => `/profile/${project?.createdBy?.id}`;
  
  return (
    <div className='px-4 py-16 lg:px-[120px] flex flex-col w-full h-full overflow-y-scroll bg-white gap-12'>
      {/* userDetails  */}
      <section className='flex w-full h-[55px] items-center lg:px-[100px]'>
        <div className='flex gap-4'>
          <div className=' group relative'>
            <Link href={renderLink()} className=' w-12 h-12'>
              <UserProfile
                src={project?.createdBy?.avatarUrl}
                width={48}
                height={48}
              />
            </Link>
            <ToolTip tip={project?.createdBy?.name} />
          </div>
          <div className=' flex flex-col items-start'>
            <h1 className='text-c-dark font-semibold text-left'>
              {project?.title}
            </h1>
            <div className=' flex items-center gap-[2px] mt-1'>
              <span className=' text-sm text-gray-600'>
                {project?.createdBy?.name}
              </span>
              <BsDot size={20} className=' fill-gray-500' />
              <span
                className=' text-sm text-gray-600 hover:text-rose-400 
              transition-all duration-200'
              >
                Follow
              </span>
              <BsDot size={20} className=' fill-gray-500' />
              <span className=' text-sm text-rose-500 group relative'>
                Hire Me
                <ToolTipV2
                  tip='Send a message about a work opportunity'
                  className=' bg-c-dark text-white w-[200px] top-[-55px] left-1/2'
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* sidebar  */}
      <ProjectSidebarSm session={session} project={project} />
      <ProjectSidebarLg session={session} project={project} />


      {/* postImages */}
      {newImages.length === 1 && (
        <section className='w-full relative'>
          <Image
            alt='project-img'
            src={newImages[0]}
            width={1920}
            height={1080}
            priority
            className='object-contain max-h-full z-0 rounded-lg lg:px-[100px] xl:px-[160px]'
          />
        </section>
      )}

      {newImages.length != 1 && (
        <section className='w-full relative'>
          {newImages.slice(0, 1).map((image, index) => (
            <Image
              key={index}
              alt='project-img'
              src={image}
              width={1920}
              height={1080}
              priority
              className='object-contain max-h-full z-0 rounded-lg lg:px-[100px] xl:px-[160px]'
            />
          ))}
        </section>
      )}

      <section className='flexCenter flex-col'>
        <p className='max-w-5xl text-xl font-normal'>{project?.description}</p>
      </section>

      {newImages.length != 1 && (
        <section className='w-full relative flex flex-col gap-8'>
          {newImages.slice(1, newImages.length).map((image, index) => (
            <Image
              key={index}
              alt='project-img'
              src={image}
              width={1920}
              height={1080}
              priority
              className='object-contain max-h-full z-0 rounded-lg lg:px-[100px] xl:px-[160px]'
            />
          ))}
        </section>
      )}

      {session?.user?.email === project?.createdBy?.email ? (
        <section className='flexCenter mt-10'>
          <ProjectActions projectId={project?.id} />
        </section>
      ) : (
        <section className='flexCenter flex-col mt-10'>
          <div className='flex flex-wrap mt-5 gap-5 items-center'>
            <Link
              href={project?.githubUrl}
              target='_blank'
              rel='noreferrer'
              className='flexCenter gap-2 tex-sm font-medium text-primary-purple'
            >
              <Button
                title='GitHub'
                className=' bg-c-dark hover:bg-gray-800 
              text-white flex items-center gap-2 px-4'
                leftIcon={<AiFillGithub size={20} />}
              />
            </Link>
            <BsDot size={20} className=' fill-purple-400' />
            <Link
              href={project?.liveSiteUrl}
              target='_blank'
              rel='noreferrer'
              className='flexCenter gap-2 tex-sm font-medium text-primary-purple'
            >
              <Button
                title='Live site'
                className=' bg-purple-400 hover:bg-purple-500 
              text-white flex items-center gap-2 px-4'
                leftIcon={<TbLivePhoto size={20} />}
              />
            </Link>
          </div>
        </section>
      )}

      <section className='w-full mt-10 flex flex-col'>
        <div className=' flexCenter w-full gap-6 '>
          <span className='w-full h-[1.5px] bg-gray-200' />
          <Link
            href={renderLink()}
            className='min-w-[72px] h-[72px] relative group'
          >
            <UserProfile
              src={project?.createdBy?.avatarUrl}
              width={72}
              height={72}
            />
            <ToolTip tip={project?.createdBy?.name} />
          </Link>
          <span className='w-full h-[1.5px] bg-gray-200' />
        </div>
        <div className=' flexCenter w-full py-4'>
          <p className=' text-xl font-bold text-c-dark'>
            {project?.createdBy?.name}
          </p>
        </div>
      </section>

      <RelatedProjects userId={project?.createdBy?.id} projectId={project?.id} />

    </div>
  );
}