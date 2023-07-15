import { ProjectInterface, UserProfile as UserP } from "@/common.types";
import Image from "next/image";

import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import UserProfile from "./ui/UserProfile";

// icons
import { BsPlus } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";

type Props = {
  user: UserP;
};

const ProfilePage = ({ user }: Props) => {
  const userProjects = user?.projects;

  const recentProjectImages = Object.values(
    userProjects?.edges[0].node?.images || []
  );

  return (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
      <section className='flexBetween max-lg:flex-col gap-10 w-full'>
        <div className='flex items-start flex-col w-full'>
          <UserProfile src={user?.avatarUrl} width={100} height={100} />
          <p className='text-4xl font-bold mt-10'>{user?.name}</p>
          <p className='md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg'>
            I’m Software Engineer at JSM 👋
          </p>

          <div className='flex mt-8 gap-5 w-full flex-wrap'>
            <Button
              title='Follow'
              leftIcon={<BsPlus size={20} className=' fill-white' />}
              className=' bg-purple-500 text-white flex gap-2 
              items-center font-semibold hover:bg-purple-400'
            />
            <Link href={`mailto:${user?.email}`}>
              <Button
                title='Hire Me'
                leftIcon={<IoMdMail size={20} className=' fill-white' />}
                className=' bg-rose-500 text-white flex gap-2
                items-center font-semibold hover:bg-rose-400'
              />
            </Link>
          </div>
        </div>

        {user?.projects?.edges?.length > 0 ? (
          <Image
            src={recentProjectImages[0]}
            alt='project image'
            width={739}
            height={554}
            className='rounded-xl object-contain w-auto h-auto'
          />
        ) : (
          <Image
            src='/profile-post.png'
            width={739}
            height={554}
            alt='project image'
            className='rounded-xl w-auto h-auto'
          />
        )}
      </section>

      <section className='flexStart flex-col lg:mt-28 mt-16 w-full'>
        <p className='w-full text-left text-lg font-semibold'>Recent Work</p>

        <div className='profile_projects'>
          {user?.projects?.edges?.map(
            ({ node }: { node: ProjectInterface }) => {
              const imgArry = Object.values(node?.images || []);
              return (
                <ProjectCard
                  key={`${node?.id}`}
                  id={node?.id}
                  images={imgArry}
                  title={node?.title}
                  name={user.name}
                  avatarUrl={user.avatarUrl}
                  userId={user.id}
                />
              );
            }
          )}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
