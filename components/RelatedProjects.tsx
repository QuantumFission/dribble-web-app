"use client";

import Link from "next/link";
import Image from "next/image";
import { GoFileDirectoryFill } from "react-icons/go";
import { BsPlus } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FormattedString, preventBubbling } from "@/utils/utils";
import { motion as m } from "framer-motion";
import { getLastProject } from "@/firebase/actions";
import { ProjectInterface } from "@/common.types";
import { useEffect, useState } from "react";

type Props = {
  userId: string;
  projectId: string;
  userName: string;
};

const RelatedProjects = ({ userId, projectId, userName }: Props) => {
  const [projects, setProjects] = useState<any>(null);

  // console.log(projects);

  useEffect(() => {
    const getProjects = async (userId: string) => {
      const projects = await getLastProject(userId);
      const filteredProjects = projects?.filter(
        (project: ProjectInterface) => project.id != projectId
      );
      // console.log(filteredProjects);
      setProjects(filteredProjects);
    };
    if (userId) {
      getProjects(userId);
    }
  }, []);

  function handleLikeClick(e: React.MouseEvent<HTMLDivElement>) {
    preventBubbling()(e);
  }

  if (projects?.length === 0) return null;

  return (
    <section className="flex flex-col w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {userName}</p>
        <Link
          href={`/profile/${userId}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {projects &&
          projects?.map((project: ProjectInterface) => {
            return project ? (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                className="w-full h-full flexCenter transition-all duration-300"
              >
                {project.images ? (
                  <div className="min-w-[443px] min-h-[332px]  sm:min-w-[270px] sm:min-h-[200px] relative overflow-hidden">
                    <Image
                      alt="Project Image"
                      src={project.images[0]}
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
                        <p className=" w-full">
                          {FormattedString(project.title)}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="project_card-title-icon">
                            <GoFileDirectoryFill
                              size={20}
                              className=" fill-gray-500"
                            />
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
            ) : (
              <div>hi</div>
            );
          })}
      </div>
    </section>
  );
};

export default RelatedProjects;
