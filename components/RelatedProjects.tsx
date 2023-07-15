import Link from "next/link";

import { getUserProjects } from "@/lib/actions";
import { ProjectInterface, UserProfile } from "@/common.types";
import Image from "next/image";
import { GoFileDirectoryFill } from "react-icons/go";
import { BsPlus } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FormattedString, preventBubbling } from "@/utils/utils";
import { motion as m } from "framer-motion";

type Props = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: Props) => {
  const result = (await getUserProjects(userId)) as { user?: UserProfile };

  const filteredProjects = result?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node?.id !== projectId
  );

  function handleLikeClick(e: React.MouseEvent<HTMLDivElement>) {
    preventBubbling()(e);
  }

  if (filteredProjects?.length === 0) return null;

  return (
    <section className='flex flex-col w-full'>
      <div className='flexBetween'>
        <p className='text-base font-bold'>More by {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className='text-primary-purple text-base'
        >
          View All
        </Link>
      </div>

      <div className='related_projects-grid'>
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => {
          const newImages = Object.values(node?.images || []);

          return (
            <m.div
              key={node?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className=" rounded-lg"
            >
              <Link
                href={`/project/${node?.id}`}
                className='flexCenter group relative w-full h-full'
              >
                <Image
                  src={newImages[0]}
                  width={414}
                  height={314}
                  className='w-full h-full object-cover rounded-lg'
                  alt='project image'
                />
                <m.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className='project_card-title-parent'
                >
                  <div className='project_card-title'>
                    <p>{FormattedString(node?.title)}</p>
                    <div className='flex items-center gap-3'>
                      <div className='project_card-title-icon'>
                        <GoFileDirectoryFill
                          size={20}
                          className=' fill-gray-500'
                        />
                        <BsPlus
                          size={15}
                          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[6px]'
                        />
                      </div>
                      <div
                        className='project_card-title-icon'
                        onClick={handleLikeClick}
                      >
                        <AiFillHeart size={18} className=' fill-gray-500' />
                      </div>
                    </div>
                  </div>
                </m.div>
              </Link>
            </m.div>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProjects;
