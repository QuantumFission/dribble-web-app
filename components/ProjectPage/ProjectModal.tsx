"use client";

import { Dialog, Transition } from "@headlessui/react";
import { motion as m } from "framer-motion";
import { useRouter } from "next/navigation";
import { Fragment, useState, useEffect } from "react";
import ProjectDetails from "./ProjectDetails";
import { ProjectInterface, SessionInterface } from "@/common.types";
import ProjectLoading from "./ProjectLoading";
import { RxCross2 } from "react-icons/rx";
import { ToolTip } from "../ui/tooltip";

type Props = {
  project: ProjectInterface;
  session: SessionInterface;
};

export default function ProjectModal({ project, session }: Props) {
  const isOpen = true;
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={handleClick}>
          <div className='fixed inset-0 bg-black bg-opacity-70' />
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex h-full items-center justify-center pt-10 text-center relative cursor-pointer'>
              <m.div
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className=' w-full h-full flexCenter rounded-t-2xl z-20'
              >
                <Dialog.Panel className='w-full h-full flexCenter rounded-t-2xl overflow-y-scroll relative'>
                  {/* main page details starts from here  */}
                  <div
                    className='flexCenter w-8 h-8 absolute top-4 right-6 lg:left-6 bg-gray-100 rounded-full z-50'
                    onClick={handleClick}
                  >
                    <div className=' relative group'>
                      <RxCross2 size={20} className=' text-c-dark' />
                      <ToolTip
                        tip='close'
                        className=' left-[-10px] bottom-[-30px]'
                      />
                    </div>
                  </div>
                  <ProjectDetails project={project} session={session} />
                </Dialog.Panel>
              </m.div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
